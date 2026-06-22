import { describe, expect, it } from "vitest";
import type { Window } from "../../types/agent";
import { toWindowId } from "../../types/agent";
import {
	createAgeEviction,
	createCompositeEviction,
	createTokenBudgetEviction,
	type EvictionPolicyInstance,
} from "./eviction.svelte";

function makeWindow(turnCount: number, tokenPerTurn = 10): Window {
	return {
		id: toWindowId("w-test"),
		parentId: null,
		state: {},
		turns: Array.from({ length: turnCount }, (_, i) => ({
			id: `turn-${i}`,
			role: i % 2 === 0 ? "user" : "assistant",
			content: `message-${i}`,
			createdAt: Date.now() - (turnCount - i) * 1000,
			estimatedTokens: tokenPerTurn,
			memoryLayer: "episodic" as const,
		})),
		semanticRefs: [],
		budget: { used: turnCount * tokenPerTurn, cap: 1000 },
		policy: { kind: "none" },
		lineage: { children: [] },
		createdAt: Date.now(),
		updatedAt: Date.now(),
	};
}

describe("createTokenBudgetEviction", () => {
	it("should evict when over threshold", () => {
		const policy = createTokenBudgetEviction(50);
		const window = makeWindow(10, 10);
		expect(policy.shouldEvict(window)).toBe(true);
	});

	it("should not evict when under threshold", () => {
		const policy = createTokenBudgetEviction(200);
		const window = makeWindow(5, 10);
		expect(policy.shouldEvict(window)).toBe(false);
	});

	it("evict removes oldest turns", () => {
		const policy = createTokenBudgetEviction(50);
		const window = makeWindow(10, 10);
		const evicted = policy.evict(window);
		expect(evicted.turns.length).toBeLessThan(10);
		expect(evicted.budget.used).toBeLessThanOrEqual(50);
	});
});

describe("createAgeEviction", () => {
	it("should evict when turns are too old", () => {
		const policy = createAgeEviction(4999);
		const window = makeWindow(5);
		expect(policy.shouldEvict(window)).toBe(true);
	});

	it("should not evict when turns are recent", () => {
		const policy = createAgeEviction(60000);
		const window = {
			...makeWindow(3),
			turns: makeWindow(3).turns.map((t) => ({
				...t,
				createdAt: Date.now(),
			})),
		};
		expect(policy.shouldEvict(window)).toBe(false);
	});
});

describe("createCompositeEviction", () => {
	it("evicts if any policy says so", () => {
		const never: EvictionPolicyInstance = {
			shouldEvict: () => false,
			evict: (w) => w,
		};
		const always: EvictionPolicyInstance = {
			shouldEvict: () => true,
			evict: (w) => ({ ...w, turns: [], budget: { ...w.budget, used: 0 } }),
		};
		const composite = createCompositeEviction(never, always);
		const window = makeWindow(5);
		expect(composite.shouldEvict(window)).toBe(true);
	});
});
