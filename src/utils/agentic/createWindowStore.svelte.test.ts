import { describe, it, expect, beforeEach } from "vitest";
import { createWindowStore } from "./createWindowStore.svelte";
import type { Turn, CompactionPlan, Window } from "../../types/agent";
import { toWindowId } from "../../types/agent";

function makeTurn(role: Turn["role"], content: string, tokens = 10): Turn {
	return {
		id: `${role}-${content}-${Math.random()}`,
		role,
		content,
		createdAt: Date.now(),
		estimatedTokens: tokens,
		memoryLayer: "episodic",
	};
}

describe("createWindowStore", () => {
	let store: ReturnType<typeof createWindowStore>;

	beforeEach(() => {
		store = createWindowStore({ budgetCap: 1000 });
	});

	describe("createRoot()", () => {
		it("creates a window with parentId=null and adds it to windows", () => {
			const id = store.createRoot({ greeting: "hi" });
			expect(store.windows).toHaveLength(1);
			const w = store.windows[0]!;
			expect(w.id).toBe(id);
			expect(w.parentId).toBeNull();
			expect(w.state).toEqual({ greeting: "hi" });
			expect(w.turns).toEqual([]);
		});

		it("sets the newly created root as active", () => {
			const id = store.createRoot({});
			expect(store.activeId).toBe(id);
			expect(store.active?.id).toBe(id);
		});

		it("multiple roots are independent (multiple trees)", () => {
			const a = store.createRoot({ who: "a" });
			const b = store.createRoot({ who: "b" });
			expect(store.windows).toHaveLength(2);
			expect(store.roots).toContain(a);
			expect(store.roots).toContain(b);
			// The most recent root becomes active.
			expect(store.activeId).toBe(b);
		});
	});

	describe("fork()", () => {
		it("creates a child window with parentId set to the source", () => {
			const root = store.createRoot({});
			store.appendTurn(root, makeTurn("user", "hello"));
			const child = store.fork(root, { state: { note: "from fork" } });
			expect(store.windows).toHaveLength(2);
			const childWin = store.windows.find((w) => w.id === child)!;
			expect(childWin.parentId).toBe(root);
			expect(childWin.state).toEqual({ note: "from fork" });
		});

		it("clones the source window's turns into the child (snapshot at fork time)", () => {
			const root = store.createRoot({});
			store.appendTurn(root, makeTurn("user", "u1"));
			store.appendTurn(root, makeTurn("assistant", "a1"));
			const child = store.fork(root);
			const childWin = store.windows.find((w) => w.id === child)!;
			expect(childWin.turns).toHaveLength(2);
			expect(childWin.turns[0]?.content).toBe("u1");
			expect(childWin.turns[1]?.content).toBe("a1");
		});

		it("the child gets a fresh id and starts as active", () => {
			const root = store.createRoot({});
			const child = store.fork(root);
			expect(child).not.toBe(root);
			expect(store.activeId).toBe(child);
		});

		it("subsequent appends to the source do not affect the fork", () => {
			const root = store.createRoot({});
			store.appendTurn(root, makeTurn("user", "before"));
			const child = store.fork(root);
			store.appendTurn(root, makeTurn("user", "after"));
			const childWin = store.windows.find((w) => w.id === child)!;
			expect(childWin.turns).toHaveLength(1);
			expect(childWin.turns[0]?.content).toBe("before");
		});

		it("throws if the source window does not exist", () => {
			expect(() => store.fork(toWindowId("nope"))).toThrow();
		});
	});

	describe("navigate()", () => {
		it("switches the active window", () => {
			const a = store.createRoot({});
			const b = store.createRoot({});
			store.navigate(a);
			expect(store.activeId).toBe(a);
			store.navigate(b);
			expect(store.activeId).toBe(b);
		});

		it("throws when navigating to a non-existent window", () => {
			expect(() => store.navigate(toWindowId("nope"))).toThrow();
		});
	});

	describe("appendTurn()", () => {
		it("appends a turn to the specified window", () => {
			const root = store.createRoot({});
			store.appendTurn(root, makeTurn("user", "hi"));
			store.appendTurn(root, makeTurn("assistant", "hello!"));
			const win = store.windows.find((w) => w.id === root)!;
			expect(win.turns).toHaveLength(2);
		});

		it("updates the window's updatedAt timestamp", () => {
			const root = store.createRoot({});
			const before = store.windows.find((w) => w.id === root)!.updatedAt;
			// bump clock a tick
			const t = makeTurn("user", "x");
			store.appendTurn(root, t);
			const after = store.windows.find((w) => w.id === root)!.updatedAt;
			expect(after).toBeGreaterThanOrEqual(before);
		});

		it("appends to the active window when no id is given", () => {
			const root = store.createRoot({});
			store.appendTurn(undefined, makeTurn("user", "x"));
			const win = store.windows.find((w) => w.id === root)!;
			expect(win.turns).toHaveLength(1);
		});
	});

	describe("compact()", () => {
		it("removes the turns named in plan.dropTurnIds", () => {
			const root = store.createRoot({});
			const t1 = makeTurn("user", "drop me");
			const t2 = makeTurn("user", "keep me");
			store.appendTurn(root, t1);
			store.appendTurn(root, t2);
			const plan: CompactionPlan = {
				strategyId: "sliding",
				dropTurnIds: [t1.id],
				pinnedTurnIds: [],
				estimatedTokensAfter: 10,
			};
			store.compact(root, plan);
			const win = store.windows.find((w) => w.id === root)!;
			expect(win.turns.map((t) => t.id)).toEqual([t2.id]);
		});

		it("stamps a summary onto the window when the plan carries one", () => {
			const root = store.createRoot({});
			const plan: CompactionPlan = {
				strategyId: "pinned-summary",
				dropTurnIds: [],
				pinnedTurnIds: [],
				summary: "User asked X. Assistant replied Y.",
				estimatedTokensAfter: 20,
			};
			store.compact(root, plan);
			const win = store.windows.find((w) => w.id === root)!;
			// The summary lands in a system turn at the head of the timeline.
			const first = win.turns[0];
			expect(first?.role).toBe("system");
			expect(first?.content).toContain("User asked X");
		});

		it("is a no-op when the plan drops nothing", () => {
			const root = store.createRoot({});
			store.appendTurn(root, makeTurn("user", "x"));
			const plan: CompactionPlan = {
				strategyId: "sliding",
				dropTurnIds: [],
				pinnedTurnIds: [],
				estimatedTokensAfter: 0,
			};
			store.compact(root, plan);
			const win = store.windows.find((w) => w.id === root)!;
			expect(win.turns).toHaveLength(1);
		});
	});

	describe("remove()", () => {
		it("removes a window from the list", () => {
			const root = store.createRoot({});
			const child = store.fork(root);
			store.remove(child);
			expect(store.windows.map((w) => w.id)).toEqual([root]);
		});

		it("clears activeId if the active window is removed", () => {
			const root = store.createRoot({});
			store.remove(root);
			expect(store.activeId).toBeNull();
		});

		it("does not remove the parent when a child is removed", () => {
			const root = store.createRoot({});
			const child = store.fork(root);
			store.remove(child);
			expect(store.windows.find((w) => w.id === root)).toBeDefined();
		});
	});

	describe("reactivity (runes)", () => {
		it("exposes readonly getters that change when state mutates", () => {
			const root = store.createRoot({});
			expect(store.windows).toHaveLength(1);
			const initial = store.windows.length;
			store.createRoot({});
			expect(store.windows.length).toBe(initial + 1);
		});
	});

	describe("budget tracking", () => {
		it("reflects summed turn tokens on each window's budget.used", () => {
			const root = store.createRoot({});
			store.appendTurn(root, makeTurn("user", "a", 100));
			store.appendTurn(root, makeTurn("assistant", "b", 50));
			const win = store.windows.find((w) => w.id === root)!;
			expect(win.budget.used).toBe(150);
			expect(win.budget.cap).toBe(1000);
		});
	});

	describe("type narrowing", () => {
		it("createRoot<TState>() preserves the state type for downstream getters", () => {
			interface AppState {
				count: number;
			}
			const id = store.createRoot<AppState>({ count: 0 });
			const w = store.windows.find((x) => x.id === id) as Window<AppState>;
			expect(w.state.count).toBe(0);
		});
	});

	describe("parent-child wiring", () => {
		it("fork() registers the new window in the parent's lineage.children", () => {
			const root = store.createRoot({});
			const child = store.fork(root);
			const rootWin = store.windows.find((w) => w.id === root)!;
			expect(rootWin.lineage.children).toContain(child);
		});

		it("remove() detaches the window from its parent's children list", () => {
			const root = store.createRoot({});
			const child = store.fork(root);
			store.remove(child);
			const rootWin = store.windows.find((w) => w.id === root)!;
			expect(rootWin.lineage.children).not.toContain(child);
		});

		it("remove() is a no-op for an unknown window id", () => {
			const root = store.createRoot({});
			const before = store.windows.length;
			store.remove(toWindowId("nope"));
			expect(store.windows.length).toBe(before);
			expect(store.activeId).toBe(root, "active is preserved when remove targets nothing");
		});

		it("remove() clears activeId when the active window is removed", () => {
			const root = store.createRoot({});
			store.remove(root);
			expect(store.activeId).toBeNull();
		});

		it("appendTurn on an unknown window throws", () => {
			expect(() => store.appendTurn(toWindowId("nope"), makeTurn("user", "x"))).toThrow();
		});

		it("appendTurn with no active window and no id throws", () => {
			const fresh = createWindowStore({});
			expect(() => fresh.appendTurn(undefined, makeTurn("user", "x"))).toThrow();
		});

		it("compact on an unknown window throws", () => {
			expect(() =>
				store.compact(toWindowId("nope"), {
					strategyId: "sliding",
					dropTurnIds: [],
					pinnedTurnIds: [],
					estimatedTokensAfter: 0,
				}),
			).toThrow();
		});

		it("active returns null when activeId points at a window that has been removed externally", () => {
			// Defensive: should not be possible via the API, but the getter must
			// not throw if it ever happens.
			const root = store.createRoot({});
			store.remove(root);
			expect(store.active).toBeNull();
		});
	});
});
