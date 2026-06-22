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
});
