import type { CompactionPlan, CompactionStrategy, Window } from "../../../types/agent";

export class SlidingWindowCompaction implements CompactionStrategy {
	readonly id = "sliding-window";
	private readonly windowSize: number;

	constructor(windowSize: number) {
		this.windowSize = windowSize;
	}

	plan(window: Window): CompactionPlan {
		const turns = window.turns;
		if (turns.length <= this.windowSize) {
			return {
				strategyId: this.id,
				dropTurnIds: [],
				pinnedTurnIds: [],
				estimatedTokensAfter: window.budget.used,
			};
		}

		const dropCount = turns.length - this.windowSize;
		const dropTurnIds = turns.slice(0, dropCount).map((t) => t.id);
		const keptTokens = turns.slice(dropCount).reduce((sum, t) => sum + t.estimatedTokens, 0);

		return {
			strategyId: this.id,
			dropTurnIds,
			pinnedTurnIds: [],
			estimatedTokensAfter: keptTokens,
		};
	}

	async apply(window: Window, plan: CompactionPlan): Promise<Window> {
		const dropSet = new Set(plan.dropTurnIds);
		const keptTurns = window.turns.filter((t) => !dropSet.has(t.id));

		return {
			...window,
			turns: keptTurns,
			budget: { ...window.budget, used: plan.estimatedTokensAfter },
			updatedAt: Date.now(),
		};
	}
}
