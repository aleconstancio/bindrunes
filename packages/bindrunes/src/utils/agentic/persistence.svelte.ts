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
			for (const w of [...store.windows]) {
				store.remove(w.id);
			}
			for (const w of data.windows) {
				const id = store.createRoot(w.state);
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
			if (data.activeId && store.windows.length > 0) {
				const firstWindow = store.windows[0];
				if (firstWindow) store.navigate(firstWindow.id);
			}
		},

		async clear(): Promise<void> {
			await adapter.remove(key);
		},
	};
}

export function createLocalStorageAdapter(prefix: string = "urupe-ui"): PersistenceAdapter {
	return {
		async save(key: string, data: string): Promise<void> {
			localStorage.setItem(`${prefix}:${key}`, data);
		},
		async load(key: string): Promise<string | null> {
			return localStorage.getItem(`${prefix}:${key}`);
		},
		async remove(key: string): Promise<void> {
			localStorage.removeItem(`${prefix}:${key}`);
		},
	};
}

export function createIndexedDBAdapter(dbName: string = "urupe-ui-agentic"): PersistenceAdapter {
	const STORE_NAME = "windows";

	function openDB(): Promise<IDBDatabase> {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(dbName, 1);
			request.onupgradeneeded = () => {
				request.result.createObjectStore(STORE_NAME);
			};
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	}

	return {
		async save(key: string, data: string): Promise<void> {
			const db = await openDB();
			return new Promise((resolve, reject) => {
				const tx = db.transaction(STORE_NAME, "readwrite");
				tx.objectStore(STORE_NAME).put(data, key);
				tx.oncomplete = () => {
					db.close();
					resolve();
				};
				tx.onerror = () => {
					db.close();
					reject(tx.error);
				};
			});
		},
		async load(key: string): Promise<string | null> {
			const db = await openDB();
			return new Promise((resolve, reject) => {
				const tx = db.transaction(STORE_NAME, "readonly");
				const req = tx.objectStore(STORE_NAME).get(key);
				req.onsuccess = () => {
					db.close();
					resolve(req.result ?? null);
				};
				req.onerror = () => {
					db.close();
					reject(req.error);
				};
			});
		},
		async remove(key: string): Promise<void> {
			const db = await openDB();
			return new Promise((resolve, reject) => {
				const tx = db.transaction(STORE_NAME, "readwrite");
				tx.objectStore(STORE_NAME).delete(key);
				tx.oncomplete = () => {
					db.close();
					resolve();
				};
				tx.onerror = () => {
					db.close();
					reject(tx.error);
				};
			});
		},
	};
}
