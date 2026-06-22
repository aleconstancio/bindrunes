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
			async *complete(_req, signal) {
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
});
