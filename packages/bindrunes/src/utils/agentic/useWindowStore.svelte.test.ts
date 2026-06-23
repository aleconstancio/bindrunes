import { describe, expect, it } from "vitest";
import { mountComposable } from "../../helpers/test-wrapper.svelte";
import { provideWindowStore } from "./provideWindowStore.svelte";
import { useWindowStore } from "./useWindowStore.svelte";

describe("useWindowStore", () => {
	it("is a function", () => {
		expect(typeof useWindowStore).toBe("function");
	});

	it("throws when called outside component context", () => {
		expect(() => useWindowStore()).toThrow();
	});

	it("throws when no provider is mounted", async () => {
		await expect(async () => {
			await mountComposable(() => useWindowStore());
		}).rejects.toThrow();
	});

	it("retrieves the store from a parent provider", async () => {
		const result = await mountComposable(() => {
			provideWindowStore();
			return useWindowStore();
		});
		expect(result).toHaveProperty("windows");
		expect(result).toHaveProperty("createRoot");
	});

	it("returns a store with same properties as provided", async () => {
		const result = await mountComposable(() => {
			const provided = provideWindowStore();
			const used = useWindowStore();
			return { providedWindows: provided.windows, usedWindows: used.windows };
		});
		expect(result.usedWindows).toEqual(result.providedWindows);
	});
});
