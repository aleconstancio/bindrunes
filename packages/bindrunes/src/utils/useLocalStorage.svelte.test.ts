import { afterEach, describe, expect, it } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { useLocalStorage } from "./useLocalStorage.svelte";

describe("useLocalStorage", () => {
	afterEach(() => {
		localStorage.clear();
	});

	it("returns default value when nothing stored", async () => {
		const store = await mountComposable(() => useLocalStorage("test-key", "default"));
		expect(store.value).toBe("default");
	});

	it("set() updates value and persists", async () => {
		const store = await mountComposable(() => useLocalStorage("test-key", "default"));
		store.set("new-value");
		expect(store.value).toBe("new-value");
		expect(JSON.parse(localStorage.getItem("test-key")!)).toBe("new-value");
	});

	it("remove() resets to default", async () => {
		const store = await mountComposable(() => useLocalStorage("test-key", "default"));
		store.set("new-value");
		store.remove();
		expect(store.value).toBe("default");
		expect(localStorage.getItem("test-key")).toBeNull();
	});

	it("reads existing value from localStorage", async () => {
		localStorage.setItem("test-key", JSON.stringify("existing"));
		const store = await mountComposable(() => useLocalStorage("test-key", "default"));
		expect(store.value).toBe("existing");
	});

	it("handles complex types", async () => {
		const store = await mountComposable(() =>
			useLocalStorage("test-obj", { count: 0, name: "test" }),
		);
		store.set({ count: 42, name: "updated" });
		expect(store.value).toEqual({ count: 42, name: "updated" });
	});
});
