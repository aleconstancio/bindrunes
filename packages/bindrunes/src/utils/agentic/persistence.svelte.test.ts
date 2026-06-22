import { beforeEach, describe, expect, it, vi } from "vitest";
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
});
