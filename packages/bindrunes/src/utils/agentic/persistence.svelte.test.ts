import { describe, expect, it, vi } from "vitest";
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
		save: vi.fn(async (key: string, data: string) => {
			store.set(key, data);
		}),
		load: vi.fn(async (key: string) => store.get(key) ?? null),
		remove: vi.fn(async (key: string) => {
			store.delete(key);
		}),
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

		const id = store.createRoot({ test: true });
		store.appendTurn(id, makeTurn("hello"));
		const persist = createPersistenceAdapter(store, adapter, "test-key");
		await persist.save();

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

	it("save throws when adapter.save rejects", async () => {
		const adapter = createMemoryAdapter();
		adapter.save.mockRejectedValueOnce(new Error("disk full"));
		const store = createWindowStore();
		store.createRoot({});

		const persist = createPersistenceAdapter(store, adapter, "test-key");
		await expect(persist.save()).rejects.toThrow("disk full");
	});

	it("load throws when adapter.load rejects", async () => {
		const adapter = createMemoryAdapter();
		adapter.load.mockRejectedValueOnce(new Error("read error"));
		const store = createWindowStore();

		const persist = createPersistenceAdapter(store, adapter, "test-key");
		await expect(persist.load()).rejects.toThrow("read error");
	});

	it("save and load an empty window store", async () => {
		const adapter = createMemoryAdapter();
		const store = createWindowStore();

		const persist = createPersistenceAdapter(store, adapter, "empty-key");
		await persist.save();

		const freshStore = createWindowStore();
		const freshPersist = createPersistenceAdapter(freshStore, adapter, "empty-key");
		await freshPersist.load();

		expect(freshStore.windows).toHaveLength(0);
		expect(freshStore.activeId).toBeNull();
	});

	it("load handles malformed JSON gracefully", async () => {
		const adapter = createMemoryAdapter();
		adapter.load.mockResolvedValueOnce("not valid json {{{");

		const store = createWindowStore();
		const persist = createPersistenceAdapter(store, adapter, "bad-key");
		await expect(persist.load()).rejects.toThrow();
	});

	it("save and load multiple windows with turns", async () => {
		const adapter = createMemoryAdapter();
		const store = createWindowStore();
		const id1 = store.createRoot({ thread: 1 });
		store.appendTurn(id1, makeTurn("msg1"));
		store.appendTurn(id1, makeTurn("msg2"));

		const id2 = store.createRoot({ thread: 2 });
		store.appendTurn(id2, makeTurn("msg3"));

		const persist = createPersistenceAdapter(store, adapter, "multi-key");
		await persist.save();

		const freshStore = createWindowStore();
		const freshPersist = createPersistenceAdapter(freshStore, adapter, "multi-key");
		await freshPersist.load();

		expect(freshStore.windows).toHaveLength(2);
		expect(freshStore.windows[0].turns).toHaveLength(2);
		expect(freshStore.windows[1].turns).toHaveLength(1);
		expect(freshStore.windows[0].turns[0].content).toBe("msg1");
		expect(freshStore.windows[1].turns[0].content).toBe("msg3");
	});

	it("load preserves turn metadata", async () => {
		const adapter = createMemoryAdapter();
		const store = createWindowStore();
		const id = store.createRoot({ ctx: true });
		const turn = {
			id: "turn-meta",
			role: "assistant" as const,
			content: "response",
			toolCalls: [{ callId: "tc1", name: "search", args: { q: "hi" }, result: "ok" }],
			createdAt: 12345,
			estimatedTokens: 7,
			memoryLayer: "episodic" as const,
		};
		store.appendTurn(id, turn);

		const persist = createPersistenceAdapter(store, adapter, "meta-key");
		await persist.save();

		const freshStore = createWindowStore();
		const freshPersist = createPersistenceAdapter(freshStore, adapter, "meta-key");
		await freshPersist.load();

		const loaded = freshStore.windows[0].turns[0];
		expect(loaded.id).toBe("turn-meta");
		expect(loaded.role).toBe("assistant");
		expect(loaded.toolCalls).toHaveLength(1);
		expect(loaded.toolCalls![0].name).toBe("search");
		expect(loaded.createdAt).toBe(12345);
		expect(loaded.memoryLayer).toBe("episodic");
	});

	it("load clears existing windows before restoring", async () => {
		const adapter = createMemoryAdapter();
		const store = createWindowStore();
		const id = store.createRoot({});
		store.appendTurn(id, makeTurn("old"));
		const persist = createPersistenceAdapter(store, adapter, "replace-key");
		await persist.save();

		const freshStore = createWindowStore();
		freshStore.createRoot({ stale: true });
		expect(freshStore.windows).toHaveLength(1);

		const freshPersist = createPersistenceAdapter(freshStore, adapter, "replace-key");
		await freshPersist.load();

		expect(freshStore.windows).toHaveLength(1);
		expect(freshStore.windows[0].turns).toHaveLength(1);
	});
});
