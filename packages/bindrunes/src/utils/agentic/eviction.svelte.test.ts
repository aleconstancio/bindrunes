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

	it("does not evict when no policy triggers", () => {
		const never: EvictionPolicyInstance = {
			shouldEvict: () => false,
			evict: (w) => w,
		};
		const composite = createCompositeEviction(never);
		const window = makeWindow(5);
		expect(composite.shouldEvict(window)).toBe(false);
		const result = composite.evict(window);
		expect(result.turns).toHaveLength(5);
	});

	it("evict applies policies sequentially when multiple trigger", () => {
		let evictCount = 0;
		const p1: EvictionPolicyInstance = {
			shouldEvict: () => true,
			evict: (w) => {
				evictCount++;
				return { ...w, turns: w.turns.slice(0, 3), budget: { ...w.budget, used: 30 } };
			},
		};
		const p2: EvictionPolicyInstance = {
			shouldEvict: () => true,
			evict: (w) => {
				evictCount++;
				return { ...w, turns: w.turns.slice(0, 1), budget: { ...w.budget, used: 10 } };
			},
		};
		const composite = createCompositeEviction(p1, p2);
		const window = makeWindow(10);
		const result = composite.evict(window);
		expect(evictCount).toBe(2);
		expect(result.turns).toHaveLength(1);
	});

	it("age eviction removes old turns and keeps recent ones", () => {
		const policy = createAgeEviction(60000);
		const window = {
			...makeWindow(5),
			turns: [
				{
					...makeWindow(1).turns[0],
					id: "old",
					createdAt: Date.now() - 120000,
					estimatedTokens: 10,
				},
				{ ...makeWindow(1).turns[0], id: "recent", createdAt: Date.now(), estimatedTokens: 10 },
			],
		};
		const evicted = policy.evict(window);
		expect(evicted.turns).toHaveLength(1);
		expect(evicted.turns[0].id).toBe("recent");
	});

	it("token budget eviction keeps turns from end until threshold", () => {
		const policy = createTokenBudgetEviction(25);
		const window = makeWindow(5, 10); // 5 turns * 10 tokens = 50 used
		const evicted = policy.evict(window);
		expect(evicted.turns.length).toBeLessThanOrEqual(3);
		expect(evicted.budget.used).toBeLessThanOrEqual(25);
	});
});
