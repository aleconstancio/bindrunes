import { afterEach, describe, expect, it, vi } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { createOmnibar } from "./createOmnibar.svelte";

const sampleOptions = [
	{ id: "1", label: "Dashboard", description: "Main view", category: "Nav", action: vi.fn() },
	{ id: "2", label: "Settings", description: "Preferences", category: "Nav", action: vi.fn() },
	{ id: "3", label: "Help", category: "Support", action: vi.fn() },
];

describe("createOmnibar", () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	it("starts closed with empty query", async () => {
		const o = await mountComposable(() => createOmnibar({ options: sampleOptions }));
		expect(o.isOpen).toBe(false);
		expect(o.searchQuery).toBe("");
		expect(o.selectedIndex).toBe(0);
	});

	it("open() sets isOpen to true", async () => {
		const o = await mountComposable(() => createOmnibar({ options: sampleOptions }));
		o.open();
		expect(o.isOpen).toBe(true);
	});

	it("close() sets isOpen to false", async () => {
		const o = await mountComposable(() => createOmnibar({ options: sampleOptions }));
		o.open();
		o.close();
		expect(o.isOpen).toBe(false);
	});

	it("toggle() flips isOpen", async () => {
		const o = await mountComposable(() => createOmnibar({ options: sampleOptions }));
		o.toggle();
		expect(o.isOpen).toBe(true);
		o.toggle();
		expect(o.isOpen).toBe(false);
	});

	it("filteredOptions returns all options when query is empty", async () => {
		const o = await mountComposable(() => createOmnibar({ options: sampleOptions }));
		expect(o.filteredOptions).toHaveLength(3);
	});

	it("setQuery filters by label", async () => {
		const o = await mountComposable(() => createOmnibar({ options: sampleOptions }));
		o.setQuery("Dash");
		expect(o.filteredOptions).toHaveLength(1);
		expect(o.filteredOptions[0].label).toBe("Dashboard");
	});

	it("setQuery filters by description", async () => {
		const o = await mountComposable(() => createOmnibar({ options: sampleOptions }));
		o.setQuery("Prefer");
		expect(o.filteredOptions).toHaveLength(1);
		expect(o.filteredOptions[0].label).toBe("Settings");
	});

	it("setQuery filters by category", async () => {
		const o = await mountComposable(() => createOmnibar({ options: sampleOptions }));
		o.setQuery("Support");
		expect(o.filteredOptions).toHaveLength(1);
		expect(o.filteredOptions[0].label).toBe("Help");
	});

	it("setQuery is case-insensitive", async () => {
		const o = await mountComposable(() => createOmnibar({ options: sampleOptions }));
		o.setQuery("dashBOARD");
		expect(o.filteredOptions).toHaveLength(1);
	});

	it("selectNext cycles forward", async () => {
		const o = await mountComposable(() => createOmnibar({ options: sampleOptions }));
		expect(o.selectedIndex).toBe(0);
		o.selectNext();
		expect(o.selectedIndex).toBe(1);
		o.selectNext();
		expect(o.selectedIndex).toBe(2);
	});

	it("selectNext does not go past last item", async () => {
		const o = await mountComposable(() => createOmnibar({ options: sampleOptions }));
		o.selectNext();
		o.selectNext();
		o.selectNext();
		expect(o.selectedIndex).toBe(2);
	});

	it("selectPrev cycles backward", async () => {
		const o = await mountComposable(() => createOmnibar({ options: sampleOptions }));
		o.selectNext();
		o.selectNext();
		expect(o.selectedIndex).toBe(2);
		o.selectPrev();
		expect(o.selectedIndex).toBe(1);
	});

	it("selectPrev does not go before first item", async () => {
		const o = await mountComposable(() => createOmnibar({ options: sampleOptions }));
		o.selectPrev();
		expect(o.selectedIndex).toBe(0);
	});

	it("executeSelected calls action and closes", async () => {
		const action = vi.fn();
		const o = await mountComposable(() =>
			createOmnibar({ options: [{ id: "1", label: "Test", action }] }),
		);
		o.open();
		o.executeSelected();
		expect(action).toHaveBeenCalledOnce();
		expect(o.isOpen).toBe(false);
	});

	it("setOptions replaces options", async () => {
		const o = await mountComposable(() => createOmnibar({ options: sampleOptions }));
		o.setOptions([{ id: "4", label: "New", action: vi.fn() }]);
		expect(o.filteredOptions).toHaveLength(1);
		expect(o.filteredOptions[0].label).toBe("New");
	});

	it("open resets query and selection", async () => {
		const o = await mountComposable(() => createOmnibar({ options: sampleOptions }));
		o.setQuery("Dash");
		o.selectNext();
		o.open();
		expect(o.searchQuery).toBe("");
		expect(o.selectedIndex).toBe(0);
	});

	it("close resets query and selection", async () => {
		const o = await mountComposable(() => createOmnibar({ options: sampleOptions }));
		o.open();
		o.setQuery("Dash");
		o.close();
		expect(o.searchQuery).toBe("");
		expect(o.selectedIndex).toBe(0);
		expect(o.isOpen).toBe(false);
	});
});
