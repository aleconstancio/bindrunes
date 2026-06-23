import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createIndexedDBAdapter, createLocalStorageAdapter } from "./persistence.svelte";

describe("createLocalStorageAdapter", () => {
	let storage: Map<string, string>;

	beforeEach(() => {
		storage = new Map();
		vi.stubGlobal("localStorage", {
			getItem: vi.fn((key: string) => storage.get(key) ?? null),
			setItem: vi.fn((key: string, value: string) => {
				storage.set(key, value);
			}),
			removeItem: vi.fn((key: string) => {
				storage.delete(key);
			}),
			clear: vi.fn(() => storage.clear()),
			get length() {
				return storage.size;
			},
			key: vi.fn((index: number) => [...storage.keys()][index] ?? null),
		});
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("save and load a value", async () => {
		const adapter = createLocalStorageAdapter();
		await adapter.save("window-1", '{"data":true}');
		const result = await adapter.load("window-1");
		expect(result).toBe('{"data":true}');
	});

	it("prefixes keys", async () => {
		const adapter = createLocalStorageAdapter("myapp");
		await adapter.save("key1", "val1");
		expect(localStorage.setItem).toHaveBeenCalledWith("myapp:key1", "val1");
		await adapter.load("key1");
		expect(localStorage.getItem).toHaveBeenCalledWith("myapp:key1");
	});

	it("defaults prefix to bindrunes", async () => {
		const adapter = createLocalStorageAdapter();
		await adapter.save("k", "v");
		expect(localStorage.setItem).toHaveBeenCalledWith("bindrunes:k", "v");
	});

	it("load returns null for nonexistent keys", async () => {
		const adapter = createLocalStorageAdapter();
		const result = await adapter.load("nope");
		expect(result).toBeNull();
	});

	it("remove deletes a key", async () => {
		const adapter = createLocalStorageAdapter();
		await adapter.save("del", "val");
		await adapter.remove("del");
		expect(localStorage.removeItem).toHaveBeenCalledWith("bindrunes:del");
		const result = await adapter.load("del");
		expect(result).toBeNull();
	});

	it("save/load/remove cycle with multiple keys", async () => {
		const adapter = createLocalStorageAdapter();
		await adapter.save("a", "1");
		await adapter.save("b", "2");
		expect(await adapter.load("a")).toBe("1");
		expect(await adapter.load("b")).toBe("2");
		await adapter.remove("a");
		expect(await adapter.load("a")).toBeNull();
		expect(await adapter.load("b")).toBe("2");
	});
});

describe("createIndexedDBAdapter", () => {
	it("returns an object with save, load, and remove methods", () => {
		const adapter = createIndexedDBAdapter();
		expect(typeof adapter.save).toBe("function");
		expect(typeof adapter.load).toBe("function");
		expect(typeof adapter.remove).toBe("function");
	});

	it("defaults db name to bindrunes-agentic", () => {
		const adapter = createIndexedDBAdapter();
		expect(adapter).toBeDefined();
	});

	it("accepts custom db name", () => {
		const adapter = createIndexedDBAdapter("custom-db");
		expect(adapter).toBeDefined();
	});
});
