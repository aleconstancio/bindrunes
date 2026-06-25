import { describe, expect, it, vi } from "vitest";
import type { Delta } from "../../types/agent";
import { SimulatorRuntime } from "./createSimulatorRuntime";
import { createWindowStore } from "./createWindowStore.svelte";
import { useOrchestrator } from "./useOrchestrator.svelte";

function createStore() {
	const store = createWindowStore();
	const windowId = store.createRoot({});
	store.navigate(windowId);
	return store;
}

describe("useOrchestrator", () => {
	describe("single-turn completion", () => {
		it("goes idle -> running -> completed with no tool calls", async () => {
			const script: Delta[] = [
				{ kind: "token", text: "Hello" },
				{ kind: "token", text: " world" },
				{ kind: "done", finishReason: "stop" },
			];
			const runtime = new SimulatorRuntime({ script });
			const store = createStore();
			const orchestrator = useOrchestrator({ store, runtime });

			expect(orchestrator.status).toBe("idle");

			orchestrator.start("Hi");
			expect(orchestrator.status).toBe("running");

			// Wait for completion
			await vi.waitFor(() => {
				expect(orchestrator.status).toBe("completed");
			});

			expect(orchestrator.currentTurn).toBe(1);
			expect(orchestrator.messages).toHaveLength(2); // user + assistant
			expect(orchestrator.messages[0].role).toBe("user");
			expect(orchestrator.messages[1].role).toBe("assistant");
		});
	});

	describe("multi-turn tool calling", () => {
		it("continues loop when tool calls are present", async () => {
			const script1: Delta[] = [
				{ kind: "tool_call", callId: "call_1", name: "search", args: { q: "test" } },
				{ kind: "done", finishReason: "tool" },
			];
			const script2: Delta[] = [
				{ kind: "token", text: "Result found" },
				{ kind: "done", finishReason: "stop" },
			];

			let callCount = 0;
			const runtime = {
				tools: [],
				complete: vi.fn(function* () {
					if (callCount === 0) {
						callCount++;
						yield* script1;
					} else {
						yield* script2;
					}
				}),
			} as any;

			const store = createStore();
			const toolHandler = vi.fn().mockResolvedValue({ found: true });
			const orchestrator = useOrchestrator({
				store,
				runtime,
				toolHandler,
				onToolCall: vi.fn(),
			});

			orchestrator.start("Search for test");

			await vi.waitFor(() => {
				expect(orchestrator.status).toBe("completed");
			});

			expect(orchestrator.currentTurn).toBe(2);
			expect(toolHandler).toHaveBeenCalledWith("search", { q: "test" });
			expect(orchestrator.messages).toHaveLength(4); // user + assistant + tool result + assistant
		});
	});

	describe("abort", () => {
		it("becomes aborted when abort() is called mid-turn", async () => {
			const script: Delta[] = [
				{ kind: "token", text: "Starting..." },
				{ kind: "token", text: " middle" },
				{ kind: "token", text: " end" },
				{ kind: "done", finishReason: "stop" },
			];
			const runtime = new SimulatorRuntime({ script, delayMs: 10 });
			const store = createStore();
			const orchestrator = useOrchestrator({ store, runtime });

			orchestrator.start("Test abort");
			expect(orchestrator.status).toBe("running");

			// Abort after a short delay
			setTimeout(() => orchestrator.abort(), 5);

			await vi.waitFor(() => {
				expect(orchestrator.status).toBe("aborted");
			});
		});
	});

	describe("timeout", () => {
		it("becomes error when timeout fires", async () => {
			const script: Delta[] = [
				{ kind: "token", text: "Slow response" },
				{ kind: "done", finishReason: "stop" },
			];
			const runtime = new SimulatorRuntime({ script, delayMs: 100 });
			const store = createStore();
			const orchestrator = useOrchestrator({
				store,
				runtime,
				timeout: 50, // Very short timeout
			});

			orchestrator.start("Test timeout");

			await vi.waitFor(() => {
				expect(orchestrator.status).toBe("error");
			});

			expect(orchestrator.error).toBeTruthy();
			expect(orchestrator.error?.message).toContain("timed out");
		});

		it("completes normally when response is fast enough", async () => {
			const script: Delta[] = [
				{ kind: "token", text: "Fast" },
				{ kind: "done", finishReason: "stop" },
			];
			const runtime = new SimulatorRuntime({ script });
			const store = createStore();
			const orchestrator = useOrchestrator({
				store,
				runtime,
				timeout: 1000, // Generous timeout
			});

			orchestrator.start("Test fast response");

			await vi.waitFor(() => {
				expect(orchestrator.status).toBe("completed");
			});

			expect(orchestrator.error).toBeNull();
		});
	});

	describe("maxTurns limit", () => {
		it("stops after maxTurns even if tool calls keep coming", async () => {
			const script: Delta[] = [
				{ kind: "tool_call", callId: "call_1", name: "search", args: { q: "test" } },
				{ kind: "done", finishReason: "tool" },
			];

			const runtime = {
				tools: [],
				complete: vi.fn(function* () {
					yield* script;
				}),
			} as any;

			const store = createStore();
			const toolHandler = vi.fn().mockResolvedValue({ result: "ok" });
			const orchestrator = useOrchestrator({
				store,
				runtime,
				toolHandler,
				maxTurns: 2,
			});

			orchestrator.start("Keep going");

			await vi.waitFor(() => {
				expect(orchestrator.status).toBe("completed");
			});

			expect(orchestrator.currentTurn).toBe(2);
			expect(toolHandler).toHaveBeenCalledTimes(2);
		});
	});

	describe("error recovery", () => {
		it("skips recoverable error and completes normally", async () => {
			const script: Delta[] = [{ kind: "error", message: "Rate limited", recoverable: true }];

			const runtime = new SimulatorRuntime({ script });
			const store = createStore();
			const orchestrator = useOrchestrator({ store, runtime });

			orchestrator.start("Test recovery");

			await vi.waitFor(() => {
				expect(orchestrator.status).toBe("completed");
			});

			expect(orchestrator.currentTurn).toBe(1);
			expect(orchestrator.error).toBeNull();
		});
	});

	describe("non-recoverable error", () => {
		it("becomes error when runtime returns non-recoverable error", async () => {
			const script: Delta[] = [{ kind: "error", message: "Fatal error", recoverable: false }];
			const runtime = new SimulatorRuntime({ script });
			const store = createStore();
			const orchestrator = useOrchestrator({ store, runtime });

			orchestrator.start("Test fatal error");

			await vi.waitFor(() => {
				expect(orchestrator.status).toBe("error");
			});

			expect(orchestrator.error?.message).toBe("Fatal error");
		});
	});

	describe("no active window", () => {
		it("becomes error when no active window exists", async () => {
			const script: Delta[] = [
				{ kind: "token", text: "Response" },
				{ kind: "done", finishReason: "stop" },
			];
			const runtime = new SimulatorRuntime({ script });
			const store = createWindowStore(); // No window created

			const orchestrator = useOrchestrator({ store, runtime });

			orchestrator.start("Test no window");

			await vi.waitFor(() => {
				expect(orchestrator.status).toBe("error");
			});

			expect(orchestrator.error?.message).toContain("No active window");
		});
	});

	describe("concurrent start calls", () => {
		it("ignores subsequent start() calls while running", async () => {
			const script: Delta[] = [
				{ kind: "token", text: "Response" },
				{ kind: "done", finishReason: "stop" },
			];
			const runtime = new SimulatorRuntime({ script, delayMs: 10 });
			const store = createStore();
			const orchestrator = useOrchestrator({ store, runtime });

			orchestrator.start("First call");
			expect(orchestrator.status).toBe("running");

			// Second call should be ignored
			orchestrator.start("Second call");

			await vi.waitFor(() => {
				expect(orchestrator.status).toBe("completed");
			});

			// Only one user message should be added
			const userMessages = orchestrator.messages.filter((m) => m.role === "user");
			expect(userMessages).toHaveLength(1);
		});
	});

	describe("onTurnComplete callback", () => {
		it("calls onTurnComplete after each assistant turn", async () => {
			const script: Delta[] = [
				{ kind: "token", text: "Response" },
				{ kind: "done", finishReason: "stop" },
			];
			const runtime = new SimulatorRuntime({ script });
			const store = createStore();
			const onTurnComplete = vi.fn();
			const orchestrator = useOrchestrator({
				store,
				runtime,
				onTurnComplete,
			});

			orchestrator.start("Test callback");

			await vi.waitFor(() => {
				expect(orchestrator.status).toBe("completed");
			});

			expect(onTurnComplete).toHaveBeenCalledTimes(1);
			expect(onTurnComplete).toHaveBeenCalledWith(
				expect.objectContaining({
					role: "assistant",
					content: "Response",
				}),
			);
		});
	});
});
