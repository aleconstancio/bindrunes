import { describe, expect, it } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { useVirtualList } from "./useVirtualList.svelte";

describe("useVirtualList", () => {
	const items = Array.from({ length: 100 }, (_, i) => ({ id: i, name: `Item ${i}` }));

	it("returns visible items", async () => {
		const { visibleItems } = await mountComposable(() => useVirtualList(items, { itemHeight: 40 }));
		expect(visibleItems.length).toBeGreaterThan(0);
		expect(visibleItems[0].index).toBe(0);
	});

	it("calculates correct styles", async () => {
		const { visibleItems } = await mountComposable(() => useVirtualList(items, { itemHeight: 40 }));
		const first = visibleItems[0];
		expect(first.style).toContain("position:absolute");
		expect(first.style).toContain("height:40px");
	});

	it("handles empty array", async () => {
		const { visibleItems } = await mountComposable(() => useVirtualList([], { itemHeight: 40 }));
		expect(visibleItems).toHaveLength(0);
	});

	it("respects overscan option", async () => {
		const { visibleItems } = await mountComposable(() =>
			useVirtualList(items, { itemHeight: 40, overscan: 2 }),
		);
		expect(visibleItems.length).toBeGreaterThan(0);
	});
});
