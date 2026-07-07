// src/utils/agentic/createWindowStore.svelte.ts
// The central state for the agentic-chat system. Holds a graph of Windows,
// tracks the active window, and exposes the four primary operations:
// createRoot, fork, navigate, appendTurn, compact, remove.
//
// Reusable across all Svelte 5 components via shared context. Exposes
// readonly getters — internal mutations happen in place via Svelte 5 runes.

import type { CompactionPlan, EvictionPolicy, Turn, Window, WindowId } from "../../types/agent";
import { toWindowId } from "../../types/agent";
import { uid } from "./uid";

// ── Internal mutable types ──
// The public Window type uses ReadonlyArray and readonly fields.
// The store mutates internals in place, so we use these types
// to avoid `as` casts that defeat TypeScript's protection.

interface MutableTurn extends Omit<Turn, "toolCalls"> {
	toolCalls?: ReadonlyArray<{
		readonly callId: string;
		readonly name: string;
		readonly args: unknown;
		readonly result?: unknown;
		readonly isError?: boolean;
	}>;
}

interface MutableWindow<TState = unknown> {
	id: WindowId;
	parentId: WindowId | null;
	state: TState;
	turns: MutableTurn[];
	semanticRefs: Window["semanticRefs"];
	budget: { used: number; cap: number };
	policy: EvictionPolicy;
	lineage: { children: WindowId[] };
	createdAt: number;
	updatedAt: number;
}

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
): MutableWindow<TState> {
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

	const windows = $state<MutableWindow[]>([]);
	let activeId = $state<WindowId | null>(null);

	function addWindow<TState>(win: MutableWindow<TState>): void {
		// Push to children list of parent.
		if (win.parentId !== null) {
			const parent = windows.find((w) => w.id === win.parentId);
			if (parent) parent.lineage.children.push(win.id);
		}
		windows.push(win as MutableWindow);
	}

	function findIndex(id: WindowId): number {
		return windows.findIndex((w) => w.id === id);
	}

	function getWindow(idx: number, errorMessage: string): MutableWindow {
		const win = windows[idx];
		if (!win) throw new Error(errorMessage);
		return win;
	}

	function refresh(win: MutableWindow): void {
		// Bump updatedAt and budget.used to reflect current turns.
		win.updatedAt = nowMs();
		win.budget.used = sumTokens(win.turns);
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
			return (windows.find((w) => w.id === activeId) as Window) ?? null;
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
			const source = getWindow(idx, `createWindowStore.fork: window not found: ${fromId}`);
			const childId = toWindowId(uid("w"));
			const childState = (forkOptions?.state ?? source.state) as TState;
			const child = emptyWindow(childId, fromId, childState, budgetCap, source.policy, nowMs());
			// Snapshot the turns at fork time.
			child.turns.push(...source.turns.map((t) => ({ ...t })));
			child.budget.used = sumTokens(child.turns);
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
			const win = getWindow(idx, `createWindowStore.appendTurn: window not found: ${targetId}`);
			win.turns.push(turn);
			refresh(win);
		},

		compact(windowId: WindowId, plan: CompactionPlan): void {
			const idx = findIndex(windowId);
			if (idx === -1) {
				throw new Error(`createWindowStore.compact: window not found: ${windowId}`);
			}
			const win = getWindow(idx, `createWindowStore.compact: window not found: ${windowId}`);
			const dropSet = new Set(plan.dropTurnIds);
			const kept = win.turns.filter((t) => !dropSet.has(t.id));
			win.turns.length = 0;
			win.turns.push(...kept);

			if (plan.summary) {
				const summaryTurn: Turn = {
					id: uid("summary"),
					role: "system",
					content: `[compaction:${plan.strategyId}] ${plan.summary}`,
					createdAt: nowMs(),
					estimatedTokens: plan.estimatedTokensAfter,
					memoryLayer: "episodic",
				};
				win.turns.unshift(summaryTurn);
			}
			refresh(win);
		},

		remove(windowId: WindowId): void {
			const idx = findIndex(windowId);
			if (idx === -1) return;
			const win = getWindow(idx, `createWindowStore.remove: window not found: ${windowId}`);
			// Detach from parent's children list.
			if (win.parentId !== null) {
				const parent = windows.find((w) => w.id === win.parentId);
				if (parent) {
					const list = parent.lineage.children;
					const i = list.indexOf(windowId);
					if (i !== -1) list.splice(i, 1);
				}
			}
			windows.splice(idx, 1);
			if (activeId === windowId) activeId = null;
		},
	};
}
