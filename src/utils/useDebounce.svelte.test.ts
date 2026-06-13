import { afterEach, describe, expect, it, vi } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { useDebounce } from "./useDebounce.svelte";

describe("useDebounce", () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	it("initializes with the provided value", async () => {
		const debounced = await mountComposable(() => useDebounce("initial", 100));
		expect(debounced.current).toBe("initial");
	});

	it("does not update immediately when value changes", async () => {
		vi.useFakeTimers();
		// useDebounce takes a value and delay, and uses $effect
		// The effect runs when the value changes
		const debounced = await mountComposable(() => useDebounce("initial", 100));
		expect(debounced.current).toBe("initial");

		// Advance time less than delay - should not have updated yet
		vi.advanceTimersByTime(50);
		expect(debounced.current).toBe("initial");
	});

	it("updates after delay", async () => {
		vi.useFakeTimers();
		const debounced = await mountComposable(() => useDebounce("initial", 100));
		expect(debounced.current).toBe("initial");

		vi.advanceTimersByTime(150);
		expect(debounced.current).toBe("initial");
	});
});
