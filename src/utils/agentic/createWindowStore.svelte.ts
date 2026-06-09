// src/utils/agentic/createWindowStore.svelte.ts
// The central state for the agentic-chat system. Holds a graph of Windows,
// tracks the active window, and exposes the four primary operations:
// createRoot, fork, navigate, appendTurn, compact, remove.
//
// Reusable across all Svelte 5 components via shared context. Exposes
// readonly getters — internal mutations happen in place via Svelte 5 runes.

import type { CompactionPlan, EvictionPolicy, Turn, Window, WindowId } from "../../types/agent";
import { toWindowId } from "../../types/agent";

export interface WindowStoreOptions {
	readonly budgetCap?: number;
	readonly defaultPolicy?: EvictionPolicy;
}

export interface ForkOptions<TState> {
	readonly state?: TState;
}

export interface WindowStore {
	readonly windows: ReadonlyArray<Window>;
	readonly activeId: WindowId | null;
	readonly active: Window | null;
	readonly roots: ReadonlyArray<WindowId>;
	createRoot<TState>(state: TState): WindowId;
	fork<TState>(fromId: WindowId, options?: ForkOptions<TState>): WindowId;
	navigate(id: WindowId): void;
	appendTurn(windowId: WindowId | undefined, turn: Turn): void;
	compact(windowId: WindowId, plan: CompactionPlan): void;
	remove(windowId: WindowId): void;
}

function uid(prefix: string): string {
	const r = Math.random().toString(36).slice(2, 10);
	const t = Date.now().toString(36);
	return `${prefix}_${t}${r}`;
}

function sumTokens(turns: ReadonlyArray<Turn>): number {
	let total = 0;
	for (const t of turns) total += t.estimatedTokens;
	return total;
}

function nowMs(): number {
	return Date.now();
}

function emptyWindow<TState>(
	id: WindowId,
	parentId: WindowId | null,
	state: TState,
	budgetCap: number,
	policy: EvictionPolicy,
	createdAt: number,
): Window<TState> {
	return {
		id,
		parentId,
		state,
		turns: [],
		semanticRefs: [],
		budget: { used: 0, cap: budgetCap },
		policy,
		lineage: { children: [] },
		createdAt,
		updatedAt: createdAt,
	};
}

export function createWindowStore(options: WindowStoreOptions = {}): WindowStore {
	const budgetCap = options.budgetCap ?? 4096;
	const defaultPolicy: EvictionPolicy = options.defaultPolicy ?? { kind: "none" };

	const windows = $state<Window[]>([]);
	let activeId = $state<WindowId | null>(null);

	function addWindow<TState>(win: Window<TState>): void {
		// Push to children list of parent.
		if (win.parentId !== null) {
			const parent = windows.find((w) => w.id === win.parentId);
			if (parent) (parent.lineage.children as WindowId[]).push(win.id);
		}
		(windows as Window[]).push(win as Window);
	}

	function findIndex(id: WindowId): number {
		return windows.findIndex((w) => w.id === id);
	}

	function refresh(win: Window): void {
		// Bump updatedAt and budget.used to reflect current turns.
		(win as { updatedAt: number }).updatedAt = nowMs();
		(win.budget as { used: number }).used = sumTokens(win.turns);
	}

	return {
		get windows() {
			return windows;
		},
		get activeId() {
			return activeId;
		},
		get active() {
			if (activeId === null) return null;
			return windows.find((w) => w.id === activeId) ?? null;
		},
		get roots() {
			return windows.filter((w) => w.parentId === null).map((w) => w.id);
		},

		createRoot<TState>(state: TState): WindowId {
			const id = toWindowId(uid("w"));
			const win = emptyWindow(id, null, state, budgetCap, defaultPolicy, nowMs());
			addWindow(win);
			activeId = id;
			return id;
		},

		fork<TState>(fromId: WindowId, forkOptions?: ForkOptions<TState>): WindowId {
			const idx = findIndex(fromId);
			if (idx === -1) throw new Error(`createWindowStore.fork: window not found: ${fromId}`);
			const source = windows[idx]!;
			const childId = toWindowId(uid("w"));
			const childState = (forkOptions?.state ?? source.state) as TState;
			const child = emptyWindow(childId, fromId, childState, budgetCap, source.policy, nowMs());
			// Snapshot the turns at fork time.
			(child.turns as Turn[]).push(...source.turns.map((t) => ({ ...t })));
			(child.budget as { used: number }).used = sumTokens(child.turns);
			addWindow(child);
			activeId = childId;
			return childId;
		},

		navigate(id: WindowId): void {
			const idx = findIndex(id);
			if (idx === -1) throw new Error(`createWindowStore.navigate: window not found: ${id}`);
			activeId = id;
		},

		appendTurn(windowId: WindowId | undefined, turn: Turn): void {
			const targetId = windowId ?? activeId;
			if (targetId === null || targetId === undefined) {
				throw new Error("createWindowStore.appendTurn: no active window");
			}
			const idx = findIndex(targetId);
			if (idx === -1) {
				throw new Error(`createWindowStore.appendTurn: window not found: ${targetId}`);
			}
			const win = windows[idx]!;
			(win.turns as Turn[]).push(turn);
			refresh(win);
		},

		compact(windowId: WindowId, plan: CompactionPlan): void {
			const idx = findIndex(windowId);
			if (idx === -1) {
				throw new Error(`createWindowStore.compact: window not found: ${windowId}`);
			}
			const win = windows[idx]!;
			const dropSet = new Set(plan.dropTurnIds);
			const kept = win.turns.filter((t) => !dropSet.has(t.id));
			(win.turns as Turn[]).length = 0;
			(win.turns as Turn[]).push(...kept);

			if (plan.summary) {
				const summaryTurn: Turn = {
					id: uid("summary"),
					role: "system",
					content: `[compaction:${plan.strategyId}] ${plan.summary}`,
					createdAt: nowMs(),
					estimatedTokens: plan.estimatedTokensAfter,
					memoryLayer: "episodic",
				};
				(win.turns as Turn[]).unshift(summaryTurn);
			}
			refresh(win);
		},

		remove(windowId: WindowId): void {
			const idx = findIndex(windowId);
			if (idx === -1) return;
			const win = windows[idx]!;
			// Detach from parent's children list.
			if (win.parentId !== null) {
				const parent = windows.find((w) => w.id === win.parentId);
				if (parent) {
					const list = parent.lineage.children as WindowId[];
					const i = list.indexOf(windowId);
					if (i !== -1) list.splice(i, 1);
				}
			}
			(windows as Window[]).splice(idx, 1);
			if (activeId === windowId) activeId = null;
		},
	};
}
