// src/utils/agentic/createConversationBranches.svelte.ts
// Derives the branch tree from a flat list of Windows rooted at `rootId`.
// Pure derivation — no internal state to mutate, no runes needed.

import type { Window, WindowId } from "../../types/agent";
import { toWindowId } from "../../types/agent";

export interface Branch {
	readonly id: WindowId;
	readonly path: ReadonlyArray<WindowId>;
}

export interface SiblingComparison {
	readonly commonAncestor: WindowId;
	readonly divergedAt: number;
}

export interface CreateConversationBranchesOptions {
	readonly rootId: WindowId;
	readonly windows: ReadonlyArray<Window>;
}

export interface ConversationBranches {
	readonly rootId: WindowId;
	readonly branches: ReadonlyArray<Branch>;
	readonly leaves: ReadonlyArray<WindowId>;
	compareSiblings(a: WindowId, b: WindowId): SiblingComparison;
}

function indexById(windows: ReadonlyArray<Window>): Map<WindowId, Window> {
	const map = new Map<WindowId, Window>();
	for (const win of windows) map.set(win.id, win);
	return map;
}

function buildPath(
	rootId: WindowId,
	leafId: WindowId,
	byId: Map<WindowId, Window>,
): WindowId[] | null {
	const path: WindowId[] = [];
	const seen = new Set<WindowId>();
	let cur: WindowId | null = leafId;
	while (cur !== null) {
		if (seen.has(cur)) return null; // cycle — bail
		seen.add(cur);
		path.unshift(cur);
		if (cur === rootId) return path;
		const win = byId.get(cur);
		if (!win) return null; // orphan
		cur = win.parentId;
	}
	return null; // never reached root
}

export function createConversationBranches(
	options: CreateConversationBranchesOptions,
): ConversationBranches {
	const { rootId, windows } = options;
	const byId = indexById(windows);
	const root = byId.get(rootId);

	if (!root) {
		return {
			rootId,
			branches: [],
			leaves: [],
			compareSiblings: () => ({
				commonAncestor: rootId,
				divergedAt: 0,
			}),
		};
	}

	// BFS from root, tracking each reachable window's depth.
	const reachable = new Set<WindowId>([rootId]);
	const queue: WindowId[] = [rootId];
	while (queue.length > 0) {
		const cur = queue.shift() as WindowId;
		const win = byId.get(cur);
		if (!win) continue;
		for (const child of win.lineage.children) {
			if (!byId.has(child)) continue;
			if (reachable.has(child)) continue;
			reachable.add(child);
			queue.push(child);
		}
	}

	// A leaf is a reachable window with no reachable children.
	const leaves: WindowId[] = [];
	for (const id of reachable) {
		const win = byId.get(id);
		if (!win) continue;
		const hasReachableChild = win.lineage.children.some((c) => reachable.has(c));
		if (!hasReachableChild) leaves.push(id);
	}

	// Build a branch = root-to-leaf path for each leaf.
	const branches: Branch[] = [];
	for (const leaf of leaves) {
		const path = buildPath(rootId, leaf, byId);
		if (path) branches.push({ id: leaf, path });
	}

	function compareSiblings(a: WindowId, b: WindowId): SiblingComparison {
		if (a === b) {
			const win = byId.get(a);
			return {
				commonAncestor: a,
				divergedAt: win?.turns.length ?? 0,
			};
		}
		const pathA = buildPath(rootId, a, byId);
		const pathB = buildPath(rootId, b, byId);
		if (!pathA || !pathB) {
			return { commonAncestor: rootId, divergedAt: 0 };
		}
		// Walk from the start (root side) and find the last shared id.
		let lastShared: WindowId = toWindowId("");
		let lastSharedTurns = 0;
		const len = Math.min(pathA.length, pathB.length);
		for (let i = 0; i < len; i++) {
			if (pathA[i] === pathB[i]) {
				lastShared = pathA[i] as WindowId;
				lastSharedTurns = byId.get(lastShared)?.turns.length ?? 0;
			} else {
				break;
			}
		}
		return { commonAncestor: lastShared, divergedAt: lastSharedTurns };
	}

	return { rootId, branches, leaves, compareSiblings };
}
