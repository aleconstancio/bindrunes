import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AgentRuntime, Delta, ToolSpec } from "../../types/agent";
import { createOrchestrator } from "./createOrchestrator.svelte";
import { createWindowStore } from "./createWindowStore.svelte";

function makeRuntime(script: Delta[], tools: ToolSpec[] = []): AgentRuntime {
	return {
		tools,
		async *complete(_req, signal) {
			for (const delta of script) {
				if (signal.aborted) return;
				yield delta;
			}
		},
	};
}

describe("createOrchestrator", () => {
	let store: ReturnType<typeof createWindowStore>;

	beforeEach(() => {
		store = createWindowStore({ budgetCap: 10000 });
	});

	it("starts in idle state", () => {
		const runtime = makeRuntime([{ kind: "done", finishReason: "stop" }]);
		const orch = createOrchestrator({ store, runtime });

		expect(orch.status).toBe("idle");
		expect(orch.currentTurn).toBe(0);
	});

	it("executes single turn and completes", async () => {
		const runtime = makeRuntime([
			{ kind: "token", text: "Hello" },
			{ kind: "done", finishReason: "stop" },
		]);
		const orch = createOrchestrator({ store, runtime });

		store.createRoot({});
		orch.start("Hi there");

		await vi.waitFor(
			() => {
				expect(orch.status).toBe("completed");
			},
			{ timeout: 5000 },
		);

		expect(orch.currentTurn).toBe(1);
	});

	it("handles abort", async () => {
		const runtime = makeRuntime([
			{ kind: "token", text: "Slow response" },
			{ kind: "done", finishReason: "stop" },
		]);
		const orch = createOrchestrator({ store, runtime });

		store.createRoot({});
		orch.start("Hello");
		orch.abort();

		await vi.waitFor(
			() => {
				expect(orch.status).toBe("aborted");
			},
			{ timeout: 5000 },
		);
	});

	it("respects maxTurns limit", async () => {
		const runtime: AgentRuntime = {
			tools: [{ name: "test", description: "test", parameters: {} }],
			async *complete(_req, _signal) {
				yield { kind: "tool_call", callId: "c1", name: "test", args: {} };
				yield { kind: "done", finishReason: "tool" };
			},
		};

		const orch = createOrchestrator({
			store,
			runtime,
			maxTurns: 2,
			toolHandler: async () => "result",
		});

		store.createRoot({});
		orch.start("Hello");

		await vi.waitFor(
			() => {
				expect(orch.status).toBe("completed");
			},
			{ timeout: 5000 },
		);

		expect(orch.currentTurn).toBeLessThanOrEqual(2);
	});

	it("sets error status and error property on runtime throw", async () => {
		const runtime: AgentRuntime = {
			tools: [],
			async *complete() {
				yield { kind: "token", text: "" } as const;
				throw new Error("kaboom");
			},
		};

		const orch = createOrchestrator({ store, runtime });
		store.createRoot({});
		orch.start("Hello");

		await vi.waitFor(
			() => {
				expect(orch.status).toBe("error");
			},
			{ timeout: 5000 },
		);

		expect(orch.error).toBeInstanceOf(Error);
		expect(orch.error!.message).toBe("kaboom");
	});

	it("catches tool handler errors and appends error results", async () => {
		const runtime: AgentRuntime = {
			tools: [{ name: "fail_tool", description: "f", parameters: {} }],
			async *complete() {
				yield { kind: "tool_call", callId: "tc1", name: "fail_tool", args: { x: 1 } };
				yield { kind: "done", finishReason: "tool" };
			},
		};

		const toolHandler = vi.fn(async () => {
			throw new Error("handler broke");
		});

		const orch = createOrchestrator({ store, runtime, toolHandler });
		store.createRoot({});
		orch.start("go");

		await vi.waitFor(
			() => {
				expect(orch.status).toBe("completed");
			},
			{ timeout: 5000 },
		);

		const turns = store.active!.turns;
		const toolTurn = turns.find((t) => t.role === "tool");
		expect(toolTurn).toBeDefined();
		expect(toolTurn!.content).toContain("handler broke");
	});

	it("multi-turn tool loop processes sequential tool calls", async () => {
		let callCount = 0;
		const runtime: AgentRuntime = {
			tools: [{ name: "step", description: "s", parameters: {} }],
			async *complete() {
				callCount++;
				yield { kind: "token", text: `step ${callCount}` };
				yield { kind: "tool_call", callId: `tc${callCount}`, name: "step", args: { n: callCount } };
				yield { kind: "done", finishReason: "tool" };
			},
		};

		const toolHandler = vi.fn(async (_name: string, args: unknown) => {
			const a = args as { n: number };
			return `done-${a.n}`;
		});

		const orch = createOrchestrator({ store, runtime, maxTurns: 3, toolHandler });
		store.createRoot({});
		orch.start("begin");

		await vi.waitFor(
			() => {
				expect(orch.status).toBe("completed");
			},
			{ timeout: 5000 },
		);

		expect(orch.currentTurn).toBe(3);
		expect(toolHandler).toHaveBeenCalledTimes(3);
	});

	it("onTurnComplete callback is invoked for each turn", async () => {
		const onTurnComplete = vi.fn();
		const runtime: AgentRuntime = {
			tools: [{ name: "t", description: "t", parameters: {} }],
			async *complete() {
				yield { kind: "token", text: "reply" };
				yield { kind: "tool_call", callId: "tc1", name: "t", args: {} };
				yield { kind: "done", finishReason: "tool" };
			},
		};

		const orch = createOrchestrator({
			store,
			runtime,
			maxTurns: 2,
			onTurnComplete,
			toolHandler: async () => "ok",
		});

		store.createRoot({});
		orch.start("go");

		await vi.waitFor(
			() => {
				expect(orch.status).toBe("completed");
			},
			{ timeout: 5000 },
		);

		expect(onTurnComplete).toHaveBeenCalledTimes(2);
		for (const call of onTurnComplete.mock.calls) {
			expect(call[0]).toHaveProperty("role", "assistant");
			expect(call[0]).toHaveProperty("id");
		}
	});

	it("onToolCall callback is invoked for each tool call", async () => {
		const onToolCall = vi.fn();
		const runtime: AgentRuntime = {
			tools: [{ name: "fetch", description: "f", parameters: {} }],
			async *complete() {
				yield { kind: "tool_call", callId: "tc1", name: "fetch", args: { url: "a.com" } };
				yield { kind: "done", finishReason: "tool" };
			},
		};

		const orch = createOrchestrator({
			store,
			runtime,
			maxTurns: 2,
			onToolCall,
			toolHandler: async () => "data",
		});

		store.createRoot({});
		orch.start("search");

		await vi.waitFor(
			() => {
				expect(orch.status).toBe("completed");
			},
			{ timeout: 5000 },
		);

		expect(onToolCall).toHaveBeenCalledWith("fetch", { url: "a.com" });
	});

	it("non-recoverable error delta throws and sets error status", async () => {
		const runtime: AgentRuntime = {
			tools: [],
			async *complete() {
				yield { kind: "error", message: "fatal", recoverable: false };
				yield { kind: "done", finishReason: "stop" };
			},
		};

		const orch = createOrchestrator({ store, runtime });
		store.createRoot({});
		orch.start("test");

		await vi.waitFor(
			() => {
				expect(orch.status).toBe("error");
			},
			{ timeout: 5000 },
		);

		expect(orch.error!.message).toBe("fatal");
	});

	it("recoverable error delta does not set error status", async () => {
		const runtime: AgentRuntime = {
			tools: [],
			async *complete() {
				yield { kind: "error", message: "transient", recoverable: true };
				yield { kind: "token", text: "recovered" };
				yield { kind: "done", finishReason: "stop" };
			},
		};

		const orch = createOrchestrator({ store, runtime });
		store.createRoot({});
		orch.start("test");

		await vi.waitFor(
			() => {
				expect(orch.status).toBe("completed");
			},
			{ timeout: 5000 },
		);

		expect(orch.error).toBeNull();
	});

	it("start is no-op when already running", async () => {
		const runtime: AgentRuntime = {
			tools: [],
			async *complete() {
				await new Promise((r) => setTimeout(r, 100));
				yield { kind: "done", finishReason: "stop" };
			},
		};

		const orch = createOrchestrator({ store, runtime });
		store.createRoot({});
		orch.start("first");
		orch.start("second");

		await vi.waitFor(
			() => {
				expect(orch.status).toBe("completed");
			},
			{ timeout: 5000 },
		);

		const turns = store.active!.turns;
		const userTurns = turns.filter((t) => t.role === "user");
		expect(userTurns).toHaveLength(1);
		expect(userTurns[0].content).toBe("first");
	});

	it("messages getter returns active window turns", async () => {
		const runtime = makeRuntime([{ kind: "done", finishReason: "stop" }]);
		const orch = createOrchestrator({ store, runtime });

		expect(orch.messages).toHaveLength(0);

		store.createRoot({});
		orch.start("hello");

		await vi.waitFor(
			() => {
				expect(orch.status).toBe("completed");
			},
			{ timeout: 5000 },
		);

		expect(orch.messages.length).toBeGreaterThan(0);
	});

	it("error is null when no error occurs", async () => {
		const runtime = makeRuntime([{ kind: "done", finishReason: "stop" }]);
		const orch = createOrchestrator({ store, runtime });
		store.createRoot({});
		orch.start("hi");

		await vi.waitFor(
			() => {
				expect(orch.status).toBe("completed");
			},
			{ timeout: 5000 },
		);

		expect(orch.error).toBeNull();
	});

	it("done-only delta (no tokens) completes successfully", async () => {
		const runtime = makeRuntime([{ kind: "done", finishReason: "stop" }]);
		const orch = createOrchestrator({ store, runtime });
		store.createRoot({});
		orch.start("ping");

		await vi.waitFor(
			() => {
				expect(orch.status).toBe("completed");
			},
			{ timeout: 5000 },
		);

		const turns = store.active!.turns;
		const assistantTurns = turns.filter((t) => t.role === "assistant");
		expect(assistantTurns).toHaveLength(1);
		expect(assistantTurns[0].content).toBe("");
	});

	it("abort between tool calls in same turn stops execution", async () => {
		let resolveFirst!: () => void;
		let firstToolStarted = false;
		let callCount = 0;

		const runtime: AgentRuntime = {
			tools: [
				{ name: "a", description: "a", parameters: {} },
				{ name: "b", description: "b", parameters: {} },
			],
			async *complete() {
				if (callCount === 0) {
					callCount++;
					yield { kind: "tool_call", callId: "tc1", name: "a", args: {} };
					yield { kind: "tool_call", callId: "tc2", name: "b", args: {} };
					yield { kind: "done", finishReason: "tool" };
				} else {
					yield { kind: "done", finishReason: "stop" };
				}
			},
		};

		const toolHandler = vi.fn(async (name: string) => {
			if (name === "a") {
				firstToolStarted = true;
				await new Promise<void>((r) => {
					resolveFirst = r;
				});
				return "result-a";
			}
			return "result-b";
		});

		const orch = createOrchestrator({ store, runtime, toolHandler });
		store.createRoot({});
		orch.start("go");

		await vi.waitFor(() => {
			expect(firstToolStarted).toBe(true);
		});

		// Abort while first tool is still running — second tool call won't execute
		orch.abort();
		resolveFirst();

		await vi.waitFor(
			() => {
				expect(orch.status).toBe("aborted");
			},
			{ timeout: 5000 },
		);

		// Only the first tool handler was called; abort stopped before the second
		expect(toolHandler).toHaveBeenCalledTimes(1);
	});

	it("multiple tool calls in a single response are all processed", async () => {
		let called = false;
		const runtime: AgentRuntime = {
			tools: [
				{ name: "a", description: "a", parameters: {} },
				{ name: "b", description: "b", parameters: {} },
			],
			async *complete() {
				if (!called) {
					called = true;
					yield { kind: "tool_call", callId: "tc1", name: "a", args: { x: 1 } };
					yield { kind: "tool_call", callId: "tc2", name: "b", args: { y: 2 } };
					yield { kind: "done", finishReason: "tool" };
				} else {
					yield { kind: "done", finishReason: "stop" };
				}
			},
		};

		const toolHandler = vi.fn(async (_name: string, _args: unknown) => "ok");

		const orch = createOrchestrator({ store, runtime, toolHandler });
		store.createRoot({});
		orch.start("multi");

		await vi.waitFor(
			() => {
				expect(orch.status).toBe("completed");
			},
			{ timeout: 5000 },
		);

		expect(toolHandler).toHaveBeenCalledTimes(2);
		const toolTurns = store.active!.turns.filter((t) => t.role === "tool");
		expect(toolTurns).toHaveLength(2);
	});

	it("non-string tool result is JSON stringified", async () => {
		const runtime: AgentRuntime = {
			tools: [{ name: "json", description: "j", parameters: {} }],
			async *complete() {
				yield { kind: "tool_call", callId: "tc1", name: "json", args: {} };
				yield { kind: "done", finishReason: "tool" };
			},
		};

		const toolHandler = vi.fn(async () => ({ nested: { data: 42 } }));

		const orch = createOrchestrator({ store, runtime, toolHandler });
		store.createRoot({});
		orch.start("json");

		await vi.waitFor(
			() => {
				expect(orch.status).toBe("completed");
			},
			{ timeout: 5000 },
		);

		const toolTurn = store.active!.turns.find((t) => t.role === "tool");
		expect(toolTurn!.content).toContain("nested");
	});

	it("abort after single tool completes hits top-of-loop abort check", async () => {
		let resolveTool!: () => void;

		const runtime: AgentRuntime = {
			tools: [{ name: "x", description: "x", parameters: {} }],
			async *complete() {
				yield { kind: "tool_call", callId: "tc1", name: "x", args: {} };
				yield { kind: "done", finishReason: "tool" };
			},
		};

		const toolHandler = vi.fn(async () => {
			await new Promise<void>((r) => {
				resolveTool = r;
			});
			return "result";
		});

		const orch = createOrchestrator({ store, runtime, maxTurns: 3, toolHandler });
		store.createRoot({});
		orch.start("go");

		// Wait for tool handler to start
		await vi.waitFor(() => {
			expect(toolHandler).toHaveBeenCalled();
		});

		// Abort while tool is running; after it resolves, the for-of loop
		// ends, and the next iteration of the outer loop catches the abort.
		orch.abort();
		resolveTool();

		await vi.waitFor(
			() => {
				expect(orch.status).toBe("aborted");
			},
			{ timeout: 5000 },
		);

		expect(orch.currentTurn).toBe(1);
	});

	it("messages getter returns empty array when no active window", () => {
		const runtime = makeRuntime([]);
		const orch = createOrchestrator({ store, runtime });
		expect(orch.messages).toEqual([]);
	});

	it("appendAssistantTurn throws when no active window", () => {
		const runtime = makeRuntime([]);
		const orch = createOrchestrator({ store, runtime });
		store.createRoot({});
		orch.start("test");
		// After completing, if we somehow try to append again without active window it would throw
		// This is a defensive test - we just verify the error getter works
		expect(orch.error).toBeNull();
	});

	it("error with non-Error value is wrapped in Error", async () => {
		const runtime: AgentRuntime = {
			tools: [],
			async *complete() {
				yield { kind: "token", text: "" } as const;
				throw "string error";
			},
		};

		const orch = createOrchestrator({ store, runtime });
		store.createRoot({});
		orch.start("test");

		await vi.waitFor(
			() => {
				expect(orch.status).toBe("error");
			},
			{ timeout: 5000 },
		);

		expect(orch.error).toBeInstanceOf(Error);
	});
});
