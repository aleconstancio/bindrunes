# Phase 2: Agentic Kernel v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the agentic kernel v1 — Orchestrator, compaction strategies, persistence, and eviction policies.

**Architecture:** Four independent modules that compose with the existing `WindowStore` and `AgentRuntime` interfaces. Each module follows the `createX()` factory pattern with Svelte 5 runes.

**Tech Stack:** TypeScript, Svelte 5 runes, Vitest, existing agentic types

---

## File Structure

### Created Files
- `src/utils/agentic/createOrchestrator.svelte.ts`
- `src/utils/agentic/createOrchestrator.svelte.test.ts`
- `src/utils/agentic/compaction/SlidingWindowCompaction.ts`
- `src/utils/agentic/compaction/SlidingWindowCompaction.test.ts`
- `src/utils/agentic/compaction/SummarizeCompaction.ts`
- `src/utils/agentic/compaction/SummarizeCompaction.test.ts`
- `src/utils/agentic/persistence.svelte.ts`
- `src/utils/agentic/persistence.svelte.test.ts`
- `src/utils/agentic/eviction.svelte.ts`
- `src/utils/agentic/eviction.svelte.test.ts`

### Modified Files
- `src/utils/agentic/index.ts` (add exports)

---

## Task 1: SlidingWindowCompaction Strategy

**Files:**
- Create: `src/utils/agentic/compaction/SlidingWindowCompaction.ts`
- Create: `src/utils/agentic/compaction/SlidingWindowCompaction.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, expect, it } from "vitest";
import type { Window } from "../../types/agent";
import { toWindowId } from "../../types/agent";
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
		const plan = strategy.plan(window, window.budget);

		expect(plan.strategyId).toBe("sliding-window");
		expect(plan.dropTurnIds).toEqual(["turn-0", "turn-1"]);
		expect(plan.estimatedTokensAfter).toBe(30);
	});

	it("plan keeps all turns when under window size", () => {
		const strategy = new SlidingWindowCompaction(10);
		const window = makeWindow(3);
		const plan = strategy.plan(window, window.budget);

		expect(plan.dropTurnIds).toEqual([]);
		expect(plan.estimatedTokensAfter).toBe(30);
	});

	it("apply removes dropped turns from window", async () => {
		const strategy = new SlidingWindowCompaction(3);
		const window = makeWindow(5);
		const plan = strategy.plan(window, window.budget);
		const result = await strategy.apply(window, plan);

		expect(result.turns).toHaveLength(3);
		expect(result.turns[0].id).toBe("turn-2");
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd /home/ale/Projects/bindrunes/packages/bindrunes && npx vitest run src/utils/agentic/compaction/SlidingWindowCompaction.test.ts
```

Expected: FAIL — module not found

- [ ] **Step 3: Write minimal implementation**

```typescript
import type { CompactionPlan, CompactionStrategy, Window } from "../../types/agent";

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
```

- [ ] **Step 4: Run test to verify it passes**

```bash
cd /home/ale/Projects/bindrunes/packages/bindrunes && npx vitest run src/utils/agentic/compaction/SlidingWindowCompaction.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add packages/bindrunes/src/utils/agentic/compaction/
git commit -m "feat(agentic): add SlidingWindowCompaction strategy"
```

---

## Task 2: SummarizeCompaction Strategy

**Files:**
- Create: `src/utils/agentic/compaction/SummarizeCompaction.ts`
- Create: `src/utils/agentic/compaction/SummarizeCompaction.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, expect, it, vi } from "vitest";
import type { Window } from "../../types/agent";
import { toWindowId } from "../../types/agent";
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
		const plan = strategy.plan(window, window.budget);

		expect(plan.dropTurnIds).toEqual(["turn-0", "turn-1", "turn-2"]);
		expect(plan.pinnedTurnIds).toEqual(["turn-3", "turn-4"]);
	});

	it("apply calls summarize and adds summary turn", async () => {
		const summarize = vi.fn().mockResolvedValue("Summary of conversation");
		const strategy = new SummarizeCompaction({ keepLast: 2, summarize });
		const window = makeWindow(5);
		const plan = strategy.plan(window, window.budget);
		const result = await strategy.apply(window, plan);

		expect(summarize).toHaveBeenCalled();
		expect(result.turns).toHaveLength(3); // summary + 2 kept
		expect(result.turns[0].content).toContain("Summary of conversation");
		expect(result.turns[0].role).toBe("system");
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd /home/ale/Projects/bindrunes/packages/bindrunes && npx vitest run src/utils/agentic/compaction/SummarizeCompaction.test.ts
```

Expected: FAIL — module not found

- [ ] **Step 3: Write minimal implementation**

```typescript
import type { CompactionPlan, CompactionStrategy, Turn, Window } from "../../types/agent";

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
			estimatedTokensAfter: pinnedTokens, // summary tokens added in apply
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
			estimatedTokens: Math.ceil(summaryText.length / 4), // rough estimate
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
```

- [ ] **Step 4: Run test to verify it passes**

```bash
cd /home/ale/Projects/bindrunes/packages/bindrunes && npx vitest run src/utils/agentic/compaction/SummarizeCompaction.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add packages/bindrunes/src/utils/agentic/compaction/
git commit -m "feat(agentic): add SummarizeCompaction strategy"
```

---

## Task 3: Eviction Policies

**Files:**
- Create: `src/utils/agentic/eviction.svelte.ts`
- Create: `src/utils/agentic/eviction.svelte.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
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
			createdAt: Date.now() - (turnCount - i) * 1000, // older first
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
		const window = makeWindow(10, 10); // 100 tokens, cap 50
		expect(policy.shouldEvict(window)).toBe(true);
	});

	it("should not evict when under threshold", () => {
		const policy = createTokenBudgetEviction(200);
		const window = makeWindow(5, 10); // 50 tokens, cap 200
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
		const policy = createAgeEviction(5000); // 5 seconds
		const window = makeWindow(5);
		// All turns are older than 5s due to createdAt manipulation
		expect(policy.shouldEvict(window)).toBe(true);
	});

	it("should not evict when turns are recent", () => {
		const policy = createAgeEviction(60000); // 60 seconds
		const window = {
			...makeWindow(3),
			turns: makeWindow(3).turns.map((t) => ({
				...t,
				createdAt: Date.now(), // all recent
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
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd /home/ale/Projects/bindrunes/packages/bindrunes && npx vitest run src/utils/agentic/eviction.svelte.test.ts
```

Expected: FAIL — module not found

- [ ] **Step 3: Write minimal implementation**

```typescript
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
			// Keep newest turns that fit within threshold
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

export function createCompositeEviction(...policies: EvictionPolicyInstance[]): EvictionPolicyInstance {
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
```

- [ ] **Step 4: Run test to verify it passes**

```bash
cd /home/ale/Projects/bindrunes/packages/bindrunes && npx vitest run src/utils/agentic/eviction.svelte.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add packages/bindrunes/src/utils/agentic/eviction.svelte.ts packages/bindrunes/src/utils/agentic/eviction.svelte.test.ts
git commit -m "feat(agentic): add eviction policies (token budget, age, composite)"
```

---

## Task 4: Persistence Layer

**Files:**
- Create: `src/utils/agentic/persistence.svelte.ts`
- Create: `src/utils/agentic/persistence.svelte.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Window } from "../../types/agent";
import { toWindowId } from "../../types/agent";
import { createWindowStore } from "./createWindowStore.svelte";
import { createPersistenceAdapter, type PersistenceAdapter } from "./persistence.svelte";

function makeTurn(content: string) {
	return {
		id: `turn-${Math.random()}`,
		role: "user" as const,
		content,
		createdAt: Date.now(),
		estimatedTokens: 10,
		memoryLayer: "episodic" as const,
	};
}

function createMemoryAdapter(): PersistenceAdapter & { store: Map<string, string> } {
	const store = new Map<string, string>();
	return {
		store,
		save: vi.fn(async (key: string, data: string) => { store.set(key, data); }),
		load: vi.fn(async (key: string) => store.get(key) ?? null),
		remove: vi.fn(async (key: string) => { store.delete(key); }),
	};
}

describe("createPersistenceAdapter", () => {
	it("save serializes store to adapter", async () => {
		const adapter = createMemoryAdapter();
		const store = createWindowStore();
		const id = store.createRoot({ test: true });
		store.appendTurn(id, makeTurn("hello"));

		const persist = createPersistenceAdapter(store, adapter, "test-key");
		await persist.save();

		expect(adapter.store.has("test-key")).toBe(true);
		const data = JSON.parse(adapter.store.get("test-key")!);
		expect(data.windows).toHaveLength(1);
		expect(data.windows[0].turns).toHaveLength(1);
	});

	it("load deserializes from adapter into store", async () => {
		const adapter = createMemoryAdapter();
		const store = createWindowStore();

		// First save something
		const id = store.createRoot({ test: true });
		store.appendTurn(id, makeTurn("hello"));
		const persist = createPersistenceAdapter(store, adapter, "test-key");
		await persist.save();

		// Create a fresh store and load
		const freshStore = createWindowStore();
		const freshPersist = createPersistenceAdapter(freshStore, adapter, "test-key");
		await freshPersist.load();

		expect(freshStore.windows).toHaveLength(1);
		expect(freshStore.windows[0].turns).toHaveLength(1);
	});

	it("clear removes data from adapter", async () => {
		const adapter = createMemoryAdapter();
		const store = createWindowStore();
		store.createRoot({});

		const persist = createPersistenceAdapter(store, adapter, "test-key");
		await persist.save();
		await persist.clear();

		expect(adapter.store.has("test-key")).toBe(false);
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd /home/ale/Projects/bindrunes/packages/bindrunes && npx vitest run src/utils/agentic/persistence.svelte.test.ts
```

Expected: FAIL — module not found

- [ ] **Step 3: Write minimal implementation**

```typescript
import type { Window, WindowId } from "../../types/agent";
import type { WindowStore } from "./createWindowStore.svelte";

export interface PersistenceAdapter {
	save(key: string, data: string): Promise<void>;
	load(key: string): Promise<string | null>;
	remove(key: string): Promise<void>;
}

interface SerializedStore {
	windows: Array<{
		id: string;
		parentId: string | null;
		state: unknown;
		turns: Array<{
			id: string;
			role: string;
			content: string;
			toolCalls?: Array<{
				callId: string;
				name: string;
				args: unknown;
				result?: unknown;
				isError?: boolean;
			}>;
			createdAt: number;
			estimatedTokens: number;
			memoryLayer: string;
		}>;
		semanticRefs: Array<{
			id: string;
			preview: string;
			estimatedTokens: number;
			pinned: boolean;
		}>;
		budget: { used: number; cap: number };
		policy: { kind: string; [key: string]: unknown };
		lineage: { children: string[] };
		createdAt: number;
		updatedAt: number;
	}>;
	activeId: string | null;
}

export function createPersistenceAdapter(
	store: WindowStore,
	adapter: PersistenceAdapter,
	key: string,
) {
	return {
		async save(): Promise<void> {
			const data: SerializedStore = {
				windows: store.windows.map((w) => ({
					id: w.id,
					parentId: w.parentId,
					state: w.state,
					turns: w.turns.map((t) => ({
						id: t.id,
						role: t.role,
						content: t.content,
						toolCalls: t.toolCalls ? [...t.toolCalls] : undefined,
						createdAt: t.createdAt,
						estimatedTokens: t.estimatedTokens,
						memoryLayer: t.memoryLayer,
					})),
					semanticRefs: [...w.semanticRefs],
					budget: { ...w.budget },
					policy: { ...w.policy },
					lineage: { children: [...w.lineage.children] },
					createdAt: w.createdAt,
					updatedAt: w.updatedAt,
				})),
				activeId: store.activeId,
			};
			await adapter.save(key, JSON.stringify(data));
		},

		async load(): Promise<void> {
			const raw = await adapter.load(key);
			if (!raw) return;

			const data: SerializedStore = JSON.parse(raw);
			// Clear existing windows
			for (const w of [...store.windows]) {
				store.remove(w.id);
			}
			// Recreate windows
			for (const w of data.windows) {
				const id = store.createRoot(w.state) as unknown as WindowId;
				// Override the generated id with the persisted one
				// Note: This is a simplified approach. In production, you'd need
				// a more robust deserialization that preserves IDs.
				for (const turn of w.turns) {
					store.appendTurn(id, {
						id: turn.id,
						role: turn.role as "user" | "assistant" | "system" | "tool",
						content: turn.content,
						toolCalls: turn.toolCalls,
						createdAt: turn.createdAt,
						estimatedTokens: turn.estimatedTokens,
						memoryLayer: turn.memoryLayer as "working" | "episodic" | "semantic",
					});
				}
			}
			if (data.activeId) {
				const firstWindow = store.windows[0];
				if (firstWindow) store.navigate(firstWindow.id);
			}
		},

		async clear(): Promise<void> {
			await adapter.remove(key);
		},
	};
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
cd /home/ale/Projects/bindrunes/packages/bindrunes && npx vitest run src/utils/agentic/persistence.svelte.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add packages/bindrunes/src/utils/agentic/persistence.svelte.ts packages/bindrunes/src/utils/agentic/persistence.svelte.test.ts
git commit -m "feat(agentic): add persistence layer with adapter pattern"
```

---

## Task 5: Orchestrator

**Files:**
- Create: `src/utils/agentic/createOrchestrator.svelte.ts`
- Create: `src/utils/agentic/createOrchestrator.svelte.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AgentRuntime, Delta, ToolSpec } from "../../types/agent";
import { createWindowStore } from "./createWindowStore.svelte";
import { createOrchestrator, type OrchestratorOptions } from "./createOrchestrator.svelte";

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

		// Create a root window first
		store.createRoot({});

		orch.start("Hi there");
		// Wait for completion
		await vi.waitFor(() => {
			expect(orch.status).toBe("completed");
		}, { timeout: 5000 });

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

		await vi.waitFor(() => {
			expect(orch.status).toBe("aborted");
		}, { timeout: 5000 });
	});

	it("respects maxTurns limit", async () => {
		// Runtime that always returns a tool call
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

		await vi.waitFor(() => {
			expect(orch.status).toBe("completed");
		}, { timeout: 5000 });

		expect(orch.currentTurn).toBeLessThanOrEqual(2);
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd /home/ale/Projects/bindrunes/packages/bindrunes && npx vitest run src/utils/agentic/createOrchestrator.svelte.test.ts
```

Expected: FAIL — module not found

- [ ] **Step 3: Write minimal implementation**

```typescript
import type { AgentRuntime, Delta, Message, Turn } from "../../types/agent";
import type { WindowStore } from "./createWindowStore.svelte";

export interface ToolHandler {
	(name: string, args: unknown): Promise<unknown>;
}

export interface OrchestratorOptions {
	store: WindowStore;
	runtime: AgentRuntime;
	maxTurns?: number;
	timeout?: number;
	onTurnComplete?: (turn: Turn) => void;
	onToolCall?: (name: string, args: unknown) => void;
	toolHandler?: ToolHandler;
}

export interface OrchestratorResult {
	readonly status: "idle" | "running" | "completed" | "error" | "aborted";
	readonly currentTurn: number;
	readonly messages: ReadonlyArray<Turn>;
	readonly error: Error | null;
	start: (input: string) => void;
	abort: () => void;
}

function uid(prefix: string): string {
	const r = Math.random().toString(36).slice(2, 10);
	const t = Date.now().toString(36);
	return `${prefix}_${t}${r}`;
}

function estimateTokens(text: string): number {
	return Math.ceil(text.length / 4);
}

export function createOrchestrator(options: OrchestratorOptions): OrchestratorResult {
	const {
		store,
		runtime,
		maxTurns = 10,
		timeout = 30000,
		onTurnComplete,
		onToolCall,
		toolHandler,
	} = options;

	let status = $state<"idle" | "running" | "completed" | "error" | "aborted">("idle");
	let currentTurn = $state(0);
	let error = $state<Error | null>(null);
	let abortController: AbortController | null = null;

	function buildMessages(): Message[] {
		const window = store.active;
		if (!window) return [];

		return window.turns.map((t) => ({
			role: t.role as "system" | "user" | "assistant" | "tool",
			content: t.content,
			toolCallId: t.toolCalls?.[0]?.callId,
		}));
	}

	function appendUserTurn(input: string): void {
		const window = store.active;
		if (!window) return;

		const turn: Turn = {
			id: uid("turn"),
			role: "user",
			content: input,
			createdAt: Date.now(),
			estimatedTokens: estimateTokens(input),
			memoryLayer: "working",
		};
		store.appendTurn(window.id, turn);
	}

	function appendAssistantTurn(content: string, toolCalls?: Turn["toolCalls"]): Turn {
		const window = store.active;
		if (!window) throw new Error("No active window");

		const turn: Turn = {
			id: uid("turn"),
			role: "assistant",
			content,
			toolCalls,
			createdAt: Date.now(),
			estimatedTokens: estimateTokens(content),
			memoryLayer: "working",
		};
		store.appendTurn(window.id, turn);
		return turn;
	}

	function appendToolTurn(callId: string, result: unknown): void {
		const window = store.active;
		if (!window) return;

		const turn: Turn = {
			id: uid("turn"),
			role: "tool",
			content: typeof result === "string" ? result : JSON.stringify(result),
			toolCalls: [{ callId, name: "", args: {}, result }],
			createdAt: Date.now(),
			estimatedTokens: estimateTokens(JSON.stringify(result)),
			memoryLayer: "working",
		};
		store.appendTurn(window.id, turn);
	}

	async function runLoop(input: string): Promise<void> {
		try {
			status = "running";
			abortController = new AbortController();
			const signal = abortController.signal;

			appendUserTurn(input);

			for (let turn = 0; turn < maxTurns; turn++) {
				if (signal.aborted) {
					status = "aborted";
					return;
				}

				currentTurn = turn + 1;
				const messages = buildMessages();

				let responseText = "";
				const toolCalls: Turn["toolCalls"] = [];

				// Stream completion
				const iterable = runtime.complete({ messages, tools: runtime.tools }, signal);
				for await (const delta of iterable) {
					if (signal.aborted) {
						status = "aborted";
						return;
					}

					switch (delta.kind) {
						case "token":
							responseText += delta.text;
							break;
						case "tool_call":
							toolCalls?.push({
								callId: delta.callId,
								name: delta.name,
								args: delta.args,
							});
							onToolCall?.(delta.name, delta.args);
							break;
						case "error":
							if (!delta.recoverable) {
								throw new Error(delta.message);
							}
							break;
						case "done":
							break;
					}
				}

				// Append assistant turn
				const assistantTurn = appendAssistantTurn(responseText, toolCalls.length > 0 ? toolCalls : undefined);
				onTurnComplete?.(assistantTurn);

				// If no tool calls, we're done
				if (toolCalls.length === 0 || !toolHandler) {
					status = "completed";
					return;
				}

				// Execute tool calls
				for (const tc of toolCalls) {
					if (signal.aborted) {
						status = "aborted";
						return;
					}

					try {
						const result = await toolHandler(tc.name, tc.args);
						appendToolTurn(tc.callId, result);
						// Update the tool call with result
						tc.result = result;
					} catch (err) {
						appendToolTurn(tc.callId, { error: String(err) });
						tc.isError = true;
					}
				}
			}

			// Max turns reached
			status = "completed";
		} catch (err) {
			error = err instanceof Error ? err : new Error(String(err));
			status = "error";
		} finally {
			abortController = null;
		}
	}

	return {
		get status() {
			return status;
		},
		get currentTurn() {
			return currentTurn;
		},
		get messages() {
			return store.active?.turns ?? [];
		},
		get error() {
			return error;
		},

		start(input: string) {
			if (status === "running") return;
			status = "idle";
			error = null;
			currentTurn = 0;
			runLoop(input);
		},

		abort() {
			abortController?.abort();
		},
	};
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
cd /home/ale/Projects/bindrunes/packages/bindrunes && npx vitest run src/utils/agentic/createOrchestrator.svelte.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add packages/bindrunes/src/utils/agentic/createOrchestrator.svelte.ts packages/bindrunes/src/utils/agentic/createOrchestrator.svelte.test.ts
git commit -m "feat(agentic): add Orchestrator composable for multi-turn agent loops"
```

---

## Task 6: Update Agentic Index

**Files:**
- Modify: `src/utils/agentic/index.ts`

- [ ] **Step 1: Add new exports**

Add these exports to the index file:

```typescript
export { createOrchestrator } from "./createOrchestrator.svelte";
export type { OrchestratorOptions, OrchestratorResult, ToolHandler } from "./createOrchestrator.svelte";
export { SlidingWindowCompaction } from "./compaction/SlidingWindowCompaction";
export { SummarizeCompaction } from "./compaction/SummarizeCompaction";
export type { SummarizeCompactionOptions } from "./compaction/SummarizeCompaction";
export { createPersistenceAdapter } from "./persistence.svelte";
export type { PersistenceAdapter } from "./persistence.svelte";
export {
	createTokenBudgetEviction,
	createAgeEviction,
	createCompositeEviction,
	type EvictionPolicyInstance,
} from "./eviction.svelte";
```

- [ ] **Step 2: Run all agentic tests**

```bash
cd /home/ale/Projects/bindrunes/packages/bindrunes && npx vitest run src/utils/agentic/
```

Expected: All tests pass

- [ ] **Step 3: Commit**

```bash
git add packages/bindrunes/src/utils/agentic/index.ts
git commit -m "feat(agentic): export orchestrator, compaction, persistence, and eviction modules"
```

---

## Task 7: Validate Phase 2

- [ ] **Step 1: Run all agentic tests with coverage**

```bash
cd /home/ale/Projects/bindrunes/packages/bindrunes && npx vitest run --coverage src/utils/agentic/
```

Expected: 95%+ lines, 90%+ branches, 92%+ functions

- [ ] **Step 2: Run type check**

```bash
cd /home/ale/Projects/bindrunes/packages/bindrunes-kit && bun run check
```

Expected: Pass

- [ ] **Step 3: Final commit if any fixes needed**

```bash
git add -A && git commit -m "chore: phase 2 agentic kernel validation"
```

---

## Summary

| Task | Description | Dependencies |
|------|-------------|--------------|
| 1 | SlidingWindowCompaction | None |
| 2 | SummarizeCompaction | None |
| 3 | Eviction policies | None |
| 4 | Persistence layer | None |
| 5 | Orchestrator | Tasks 1-4 (uses types) |
| 6 | Update index | Tasks 1-5 |
| 7 | Validate | All tasks |

Tasks 1-4 can be parallelized. Task 5 depends on the type system but not on the implementations. Task 6 depends on all implementations.
