import type { Window } from "../../types/agent";

export interface EvictionPolicyInstance {
	shouldEvict(window: Window): boolean;
	evict(window: Window): Window;
}

export function createTokenBudgetEviction(threshold: number): EvictionPolicyInstance {
	return {
		shouldEvict(window) {
			return window.budget.used > threshold;
		},
		evict(window) {
			const kept = [];
			let tokens = 0;
			for (let i = window.turns.length - 1; i >= 0; i--) {
				const turn = window.turns[i];
				if (tokens + turn.estimatedTokens > threshold) break;
				tokens += turn.estimatedTokens;
				kept.unshift(turn);
			}
			return {
				...window,
				turns: kept,
				budget: { used: tokens, cap: window.budget.cap },
				updatedAt: Date.now(),
			};
		},
	};
}

export function createAgeEviction(maxAgeMs: number): EvictionPolicyInstance {
	return {
		shouldEvict(window) {
			const cutoff = Date.now() - maxAgeMs;
			return window.turns.some((t) => t.createdAt < cutoff);
		},
		evict(window) {
			const cutoff = Date.now() - maxAgeMs;
			const kept = window.turns.filter((t) => t.createdAt >= cutoff);
			const used = kept.reduce((sum, t) => sum + t.estimatedTokens, 0);
			return {
				...window,
				turns: kept,
				budget: { used, cap: window.budget.cap },
				updatedAt: Date.now(),
			};
		},
	};
}

export function createCompositeEviction(
	...policies: EvictionPolicyInstance[]
): EvictionPolicyInstance {
	return {
		shouldEvict(window) {
			return policies.some((p) => p.shouldEvict(window));
		},
		evict(window) {
			let result = window;
			for (const policy of policies) {
				if (policy.shouldEvict(result)) {
					result = policy.evict(result);
				}
			}
			return result;
		},
	};
}
