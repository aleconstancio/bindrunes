import { describe, expect, it, vi } from "vitest";
import type { Window } from "../../../types/agent";
import { toWindowId } from "../../../types/agent";
import { SummarizeCompaction } from "./SummarizeCompaction";

function makeWindow(turnCount: number): Window {
	return {
		id: toWindowId("w-test"),
		parentId: null,
		state: {},
		turns: Array.from({ length: turnCount }, (_, i) => ({
			id: `turn-${i}`,
			role: i % 2 === 0 ? "user" : "assistant",
			content: `message-${i}`,
			createdAt: Date.now(),
			estimatedTokens: 10,
			memoryLayer: "episodic" as const,
		})),
		semanticRefs: [],
		budget: { used: turnCount * 10, cap: 1000 },
		policy: { kind: "none" },
		lineage: { children: [] },
		createdAt: Date.now(),
		updatedAt: Date.now(),
	};
}

describe("SummarizeCompaction", () => {
	it("returns strategy id", () => {
		const strategy = new SummarizeCompaction({
			keepLast: 2,
			summarize: vi.fn(),
		});
		expect(strategy.id).toBe("summarize");
	});

	it("plan drops turns beyond keepLast", () => {
		const strategy = new SummarizeCompaction({
			keepLast: 2,
			summarize: vi.fn(),
		});
		const window = makeWindow(5);
		const plan = strategy.plan(window);

		expect(plan.dropTurnIds).toEqual(["turn-0", "turn-1", "turn-2"]);
		expect(plan.pinnedTurnIds).toEqual(["turn-3", "turn-4"]);
	});

	it("apply calls summarize and adds summary turn", async () => {
		const summarize = vi.fn().mockResolvedValue("Summary of conversation");
		const strategy = new SummarizeCompaction({ keepLast: 2, summarize });
		const window = makeWindow(5);
		const plan = strategy.plan(window);
		const result = await strategy.apply(window, plan);

		expect(summarize).toHaveBeenCalled();
		expect(result.turns).toHaveLength(3);
		expect(result.turns[0].content).toContain("Summary of conversation");
		expect(result.turns[0].role).toBe("system");
	});

	it("plan keeps all turns when exactly at keepLast", () => {
		const strategy = new SummarizeCompaction({
			keepLast: 3,
			summarize: vi.fn(),
		});
		const window = makeWindow(3);
		const plan = strategy.plan(window);

		expect(plan.dropTurnIds).toEqual([]);
		expect(plan.pinnedTurnIds).toEqual(["turn-0", "turn-1", "turn-2"]);
		expect(plan.estimatedTokensAfter).toBe(30);
	});

	it("plan with zero turns", () => {
		const strategy = new SummarizeCompaction({
			keepLast: 3,
			summarize: vi.fn(),
		});
		const window = makeWindow(0);
		const plan = strategy.plan(window);

		expect(plan.dropTurnIds).toEqual([]);
		expect(plan.pinnedTurnIds).toEqual([]);
		expect(plan.estimatedTokensAfter).toBe(0);
	});

	it("apply summary turn has episodic memoryLayer", async () => {
		const summarize = vi.fn().mockResolvedValue("test summary");
		const strategy = new SummarizeCompaction({ keepLast: 1, summarize });
		const window = makeWindow(3);
		const plan = strategy.plan(window);
		const result = await strategy.apply(window, plan);

		expect(result.turns[0].memoryLayer).toBe("episodic");
		expect(result.turns[0].role).toBe("system");
	});

	it("apply with no dropped turns still calls summarize with empty array", async () => {
		const summarize = vi.fn().mockResolvedValue("");
		const strategy = new SummarizeCompaction({ keepLast: 5, summarize });
		const window = makeWindow(3);
		const plan = strategy.plan(window);
		const result = await strategy.apply(window, plan);

		expect(summarize).toHaveBeenCalledWith([]);
		expect(result.turns).toHaveLength(4); // 1 summary + 3 kept
	});
});
