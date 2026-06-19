import { describe, expect, it } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { useToggle } from "./useToggle.svelte";

describe("useToggle", () => {
	it("initializes with false by default", async () => {
		const toggle = await mountComposable(() => useToggle());
		expect(toggle.value).toBe(false);
	});

	it("initializes with custom value", async () => {
		const toggle = await mountComposable(() => useToggle(true));
		expect(toggle.value).toBe(true);
	});

	it("toggle() flips value", async () => {
		const toggle = await mountComposable(() => useToggle(false));
		toggle.toggle();
		expect(toggle.value).toBe(true);
		toggle.toggle();
		expect(toggle.value).toBe(false);
	});

	it("setOn() sets to true", async () => {
		const toggle = await mountComposable(() => useToggle(false));
		toggle.setOn();
		expect(toggle.value).toBe(true);
	});

	it("setOff() sets to false", async () => {
		const toggle = await mountComposable(() => useToggle(true));
		toggle.setOff();
		expect(toggle.value).toBe(false);
	});

	it("value setter updates value", async () => {
		const toggle = await mountComposable(() => useToggle(false));
		toggle.value = true;
		expect(toggle.value).toBe(true);
	});
});
