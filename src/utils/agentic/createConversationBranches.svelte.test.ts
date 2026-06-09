import { describe, expect, it } from "vitest";
import { toWindowId, type Window } from "../../types/agent";
import { createConversationBranches } from "./createConversationBranches.svelte";

function w(
	id: string,
	parentId: string | null,
	children: string[] = [],
	turns: number = 0,
): Window {
	return {
		id: toWindowId(id),
		parentId: parentId ? toWindowId(parentId) : null,
		state: null,
		turns: Array.from({ length: turns }, (_, i) => ({
			id: `${id}-t${i}`,
			role: "user" as const,
			content: `turn ${i}`,
			createdAt: i,
			estimatedTokens: 10,
			memoryLayer: "episodic" as const,
		})),
		semanticRefs: [],
		budget: { used: 0, cap: 1000 },
		policy: { kind: "none" },
		lineage: { children: children.map(toWindowId) },
		createdAt: 0,
		updatedAt: 0,
	};
}

describe("createConversationBranches", () => {
	describe("linear history", () => {
		it("reports exactly one branch and one leaf when no forks exist", () => {
			const windows: ReadonlyArray<Window> = [
				w("a", null, ["b"], 1),
				w("b", "a", ["c"], 2),
				w("c", "b", [], 3),
			];
			const branches = createConversationBranches({
				rootId: toWindowId("a"),
				windows,
			});
			expect(branches.leaves).toEqual([toWindowId("c")]);
			expect(branches.branches).toHaveLength(1);
		});

		it("a single-node history has one branch that contains only the root", () => {
			const windows: ReadonlyArray<Window> = [w("solo", null, [], 0)];
			const branches = createConversationBranches({
				rootId: toWindowId("solo"),
				windows,
			});
			expect(branches.leaves).toEqual([toWindowId("solo")]);
			expect(branches.branches).toHaveLength(1);
		});
	});

	describe("branching", () => {
		it("a single fork from the root yields two branches and two leaves", () => {
			const windows: ReadonlyArray<Window> = [
				w("root", null, ["a", "b"], 1),
				w("a", "root", [], 2),
				w("b", "root", [], 2),
			];
			const branches = createConversationBranches({
				rootId: toWindowId("root"),
				windows,
			});
			expect(branches.leaves).toHaveLength(2);
			expect(branches.leaves).toContain(toWindowId("a"));
			expect(branches.leaves).toContain(toWindowId("b"));
			expect(branches.branches).toHaveLength(2);
		});

		it("a fork from a non-root window reports three branches", () => {
			// root -> x -> a
			//            -> b
			const windows: ReadonlyArray<Window> = [
				w("root", null, ["x"], 1),
				w("x", "root", ["a", "b"], 2),
				w("a", "x", [], 3),
				w("b", "x", [], 3),
			];
			const branches = createConversationBranches({
				rootId: toWindowId("root"),
				windows,
			});
			expect(branches.branches).toHaveLength(2);
			expect(branches.leaves).toHaveLength(2);
		});

		it("asymmetric forks give different branch lengths", () => {
			// root -> a -> a1 -> a2
			//            -> b
			const windows: ReadonlyArray<Window> = [
				w("root", null, ["a"], 1),
				w("a", "root", ["a1", "b"], 2),
				w("a1", "a", ["a2"], 3),
				w("a2", "a1", [], 4),
				w("b", "a", [], 3),
			];
			const branches = createConversationBranches({
				rootId: toWindowId("root"),
				windows,
			});
			const lengths = branches.branches.map((b) => b.path.length).sort((x, y) => x - y);
			expect(lengths).toEqual([3, 4]);
		});
	});

	describe("compareSiblings()", () => {
		it("finds the common ancestor of two leaves", () => {
			const windows: ReadonlyArray<Window> = [
				w("root", null, ["a", "b"], 1),
				w("a", "root", [], 2),
				w("b", "root", [], 2),
			];
			const branches = createConversationBranches({
				rootId: toWindowId("root"),
				windows,
			});
			const cmp = branches.compareSiblings(toWindowId("a"), toWindowId("b"));
			expect(cmp.commonAncestor).toBe(toWindowId("root"));
			expect(cmp.divergedAt).toBe(1, "they diverge right after the root (turn 1)");
		});

		it("returns the same window as both ancestor and 'diverged at its turn count' when comparing a window to itself", () => {
			const windows: ReadonlyArray<Window> = [w("root", null, ["a"], 1), w("a", "root", [], 2)];
			const branches = createConversationBranches({
				rootId: toWindowId("root"),
				windows,
			});
			const cmp = branches.compareSiblings(toWindowId("a"), toWindowId("a"));
			expect(cmp.commonAncestor).toBe(toWindowId("a"));
			expect(cmp.divergedAt).toBe(2);
		});

		it("identifies a deep common ancestor", () => {
			// root -> x -> a -> a1
			//                 -> a2
			const windows: ReadonlyArray<Window> = [
				w("root", null, ["x"], 1),
				w("x", "root", ["a"], 2),
				w("a", "x", ["a1", "a2"], 3),
				w("a1", "a", [], 4),
				w("a2", "a", [], 4),
			];
			const branches = createConversationBranches({
				rootId: toWindowId("root"),
				windows,
			});
			const cmp = branches.compareSiblings(toWindowId("a1"), toWindowId("a2"));
			expect(cmp.commonAncestor).toBe(toWindowId("a"));
			expect(cmp.divergedAt).toBe(3);
		});
	});

	describe("edge cases", () => {
		it("an unknown rootId yields no branches and no leaves", () => {
			const windows: ReadonlyArray<Window> = [w("a", null, [], 1)];
			const branches = createConversationBranches({
				rootId: toWindowId("nope"),
				windows,
			});
			expect(branches.branches).toEqual([]);
			expect(branches.leaves).toEqual([]);
		});

		it("a root with no children is a single branch containing just itself", () => {
			const windows: ReadonlyArray<Window> = [w("only", null, [], 1)];
			const branches = createConversationBranches({
				rootId: toWindowId("only"),
				windows,
			});
			expect(branches.branches).toHaveLength(1);
			expect(branches.branches[0]?.path).toEqual([toWindowId("only")]);
		});

		it("ignores windows that are not reachable from the root", () => {
			const windows: ReadonlyArray<Window> = [
				w("root", null, ["a"], 1),
				w("a", "root", [], 2),
				w("orphan", "ghost", [], 99),
			];
			const branches = createConversationBranches({
				rootId: toWindowId("root"),
				windows,
			});
			expect(branches.leaves).toEqual([toWindowId("a")]);
		});

		it("handles a lineage that lists children that are not in the windows list", () => {
			const windows: ReadonlyArray<Window> = [
				w("root", null, ["present", "missing"], 1),
				w("present", "root", [], 2),
			];
			const branches = createConversationBranches({
				rootId: toWindowId("root"),
				windows,
			});
			expect(branches.leaves).toEqual([toWindowId("present")]);
		});

		it("compareSiblings returns the root as common ancestor when one window is unreachable", () => {
			const windows: ReadonlyArray<Window> = [w("root", null, ["a"], 1), w("a", "root", [], 2)];
			const branches = createConversationBranches({
				rootId: toWindowId("root"),
				windows,
			});
			const cmp = branches.compareSiblings(toWindowId("a"), toWindowId("ghost"));
			expect(cmp.commonAncestor).toBe(toWindowId("root"));
		});
	});
});
