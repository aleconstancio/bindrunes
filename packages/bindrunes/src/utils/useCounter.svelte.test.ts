import { describe, expect, it } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { useCounter } from "./useCounter.svelte";

describe("useCounter", () => {
	it("initializes with default value 0", async () => {
		const counter = await mountComposable(() => useCounter());
		expect(counter.count).toBe(0);
	});

	it("initializes with custom value", async () => {
		const counter = await mountComposable(() => useCounter(5));
		expect(counter.count).toBe(5);
	});

	it("increments", async () => {
		const counter = await mountComposable(() => useCounter(0));
		counter.increment();
		expect(counter.count).toBe(1);
	});

	it("decrements", async () => {
		const counter = await mountComposable(() => useCounter(0));
		counter.decrement();
		expect(counter.count).toBe(-1);
	});

	it("resets to initial value", async () => {
		const counter = await mountComposable(() => useCounter(10));
		counter.set(50);
		counter.reset();
		expect(counter.count).toBe(10);
	});

	it("set() updates count", async () => {
		const counter = await mountComposable(() => useCounter(0));
		counter.set(42);
		expect(counter.count).toBe(42);
	});

	it("count setter updates value", async () => {
		const counter = await mountComposable(() => useCounter(0));
		counter.count = 99;
		expect(counter.count).toBe(99);
	});
});
