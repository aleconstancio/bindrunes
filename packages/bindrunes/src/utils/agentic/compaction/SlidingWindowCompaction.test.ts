import { describe, expect, it } from "vitest";
import type { Window } from "../../../types/agent";
import { toWindowId } from "../../../types/agent";
import { SlidingWindowCompaction } from "./SlidingWindowCompaction";

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

describe("SlidingWindowCompaction", () => {
	it("returns strategy id", () => {
		const strategy = new SlidingWindowCompaction(3);
		expect(strategy.id).toBe("sliding-window");
	});

	it("plan drops oldest turns beyond window size", () => {
		const strategy = new SlidingWindowCompaction(3);
		const window = makeWindow(5);
		const plan = strategy.plan(window);

		expect(plan.strategyId).toBe("sliding-window");
		expect(plan.dropTurnIds).toEqual(["turn-0", "turn-1"]);
		expect(plan.estimatedTokensAfter).toBe(30);
	});

	it("plan keeps all turns when under window size", () => {
		const strategy = new SlidingWindowCompaction(10);
		const window = makeWindow(3);
		const plan = strategy.plan(window);

		expect(plan.dropTurnIds).toEqual([]);
		expect(plan.estimatedTokensAfter).toBe(30);
	});

	it("apply removes dropped turns from window", async () => {
		const strategy = new SlidingWindowCompaction(3);
		const window = makeWindow(5);
		const plan = strategy.plan(window);
		const result = await strategy.apply(window, plan);

		expect(result.turns).toHaveLength(3);
		expect(result.turns[0].id).toBe("turn-2");
	});
});
