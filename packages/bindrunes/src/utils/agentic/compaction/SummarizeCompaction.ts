import type { CompactionPlan, CompactionStrategy, Turn, Window } from "../../../types/agent";

export interface SummarizeCompactionOptions {
	readonly keepLast: number;
	readonly summarize: (turns: ReadonlyArray<Turn>) => Promise<string>;
}

function uid(prefix: string): string {
	const r = Math.random().toString(36).slice(2, 10);
	const t = Date.now().toString(36);
	return `${prefix}_${t}${r}`;
}

export class SummarizeCompaction implements CompactionStrategy {
	readonly id = "summarize";
	private readonly keepLast: number;
	private readonly summarize: (turns: ReadonlyArray<Turn>) => Promise<string>;

	constructor(options: SummarizeCompactionOptions) {
		this.keepLast = options.keepLast;
		this.summarize = options.summarize;
	}

	plan(window: Window): CompactionPlan {
		const turns = window.turns;
		if (turns.length <= this.keepLast) {
			return {
				strategyId: this.id,
				dropTurnIds: [],
				pinnedTurnIds: turns.map((t) => t.id),
				estimatedTokensAfter: window.budget.used,
			};
		}

		const dropCount = turns.length - this.keepLast;
		const dropTurnIds = turns.slice(0, dropCount).map((t) => t.id);
		const pinnedTurnIds = turns.slice(dropCount).map((t) => t.id);
		const pinnedTokens = pinnedTurnIds.reduce(
			(sum, id) => sum + (turns.find((t) => t.id === id)?.estimatedTokens ?? 0),
			0,
		);

		return {
			strategyId: this.id,
			dropTurnIds,
			pinnedTurnIds,
			estimatedTokensAfter: pinnedTokens,
		};
	}

	async apply(window: Window, plan: CompactionPlan): Promise<Window> {
		const dropSet = new Set(plan.dropTurnIds);
		const droppedTurns = window.turns.filter((t) => dropSet.has(t.id));
		const keptTurns = window.turns.filter((t) => !dropSet.has(t.id));

		const summaryText = await this.summarize(droppedTurns);
		const summaryTurn: Turn = {
			id: uid("summary"),
			role: "system",
			content: `[summary] ${summaryText}`,
			createdAt: Date.now(),
			estimatedTokens: Math.ceil(summaryText.length / 4),
			memoryLayer: "episodic",
		};

		return {
			...window,
			turns: [summaryTurn, ...keptTurns],
			budget: {
				used: summaryTurn.estimatedTokens + keptTurns.reduce((s, t) => s + t.estimatedTokens, 0),
				cap: window.budget.cap,
			},
			updatedAt: Date.now(),
		};
	}
}
