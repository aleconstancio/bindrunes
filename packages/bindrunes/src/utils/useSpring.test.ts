import { describe, expect, it } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { useSpring } from "./useSpring.svelte";

describe("useSpring", () => {
	it("initializes with the given value", async () => {
		const spring = await mountComposable(() => useSpring(0));
		expect(spring.value).toBe(0);
	});

	it("has a set method", async () => {
		const spring = await mountComposable(() => useSpring(0));
		expect(typeof spring.set).toBe("function");
	});

	it("has a destroy method", async () => {
		const spring = await mountComposable(() => useSpring(0));
		expect(typeof spring.destroy).toBe("function");
	});

	it("can be set and read", async () => {
		const spring = await mountComposable(() => useSpring(0));
		spring.set(100);
		expect(() => spring.value).not.toThrow();
	});
});
