import { describe, expect, it } from "vitest";
import { mountComposable } from "../../helpers/test-wrapper.svelte";
import { provideWindowStore } from "./provideWindowStore.svelte";

describe("provideWindowStore", () => {
	it("is a function", () => {
		expect(typeof provideWindowStore).toBe("function");
	});

	it("throws when called outside component context", () => {
		expect(() => provideWindowStore()).toThrow();
	});

	it("returns a WindowStore when called inside component context", async () => {
		const store = await mountComposable(() => provideWindowStore());
		expect(store).toHaveProperty("windows");
		expect(store).toHaveProperty("activeId");
		expect(store).toHaveProperty("active");
		expect(store).toHaveProperty("roots");
		expect(store).toHaveProperty("createRoot");
		expect(store).toHaveProperty("fork");
		expect(store).toHaveProperty("navigate");
		expect(store).toHaveProperty("appendTurn");
		expect(store).toHaveProperty("compact");
		expect(store).toHaveProperty("remove");
	});

	it("initially has no windows", async () => {
		const store = await mountComposable(() => provideWindowStore());
		expect(store.windows).toHaveLength(0);
		expect(store.activeId).toBeNull();
		expect(store.active).toBeNull();
		expect(store.roots).toHaveLength(0);
	});

	it("createRoot creates a window and sets it active", async () => {
		const store = await mountComposable(() => provideWindowStore());
		const id = store.createRoot({ chat: true });
		expect(id).toBeTruthy();
		expect(store.windows).toHaveLength(1);
		expect(store.activeId).toBe(id);
		expect(store.active?.id).toBe(id);
		expect(store.roots).toContain(id);
	});

	it("accepts budgetCap option", async () => {
		const store = await mountComposable(() => provideWindowStore({ budgetCap: 8192 }));
		const id = store.createRoot({});
		const win = store.windows.find((w) => w.id === id);
		expect(win?.budget.cap).toBe(8192);
	});
});
