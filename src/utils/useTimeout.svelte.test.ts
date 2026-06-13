import { afterEach, describe, expect, it, vi } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { useTimeout } from "./useTimeout.svelte";

describe("useTimeout", () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	it("fires callback after delay", async () => {
		vi.useFakeTimers();
		const callback = vi.fn();
		const result = await mountComposable(() => useTimeout(callback, 100));

		expect(result.fired).toBe(false);
		vi.advanceTimersByTime(100);
		expect(callback).toHaveBeenCalledTimes(1);
		expect(result.fired).toBe(true);
	});

	it("clear() prevents callback from firing", async () => {
		vi.useFakeTimers();
		const callback = vi.fn();
		const result = await mountComposable(() => useTimeout(callback, 100));

		result.clear();
		vi.advanceTimersByTime(200);
		expect(callback).not.toHaveBeenCalled();
	});

	it("reset() restarts the timeout", async () => {
		vi.useFakeTimers();
		const callback = vi.fn();
		const result = await mountComposable(() => useTimeout(callback, 100));

		vi.advanceTimersByTime(50);
		result.reset();
		vi.advanceTimersByTime(50);
		expect(callback).not.toHaveBeenCalled();

		vi.advanceTimersByTime(50);
		expect(callback).toHaveBeenCalledTimes(1);
	});
});
