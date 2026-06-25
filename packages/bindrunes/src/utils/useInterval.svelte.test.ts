import { afterEach, describe, expect, it, vi } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { useInterval } from "./useInterval.svelte";

describe("useInterval", () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	it("calls callback at specified interval", async () => {
		vi.useFakeTimers();
		const callback = vi.fn();
		await mountComposable(() => useInterval(callback, 100));

		vi.advanceTimersByTime(350);
		expect(callback).toHaveBeenCalledTimes(3);
	});

	it("destroy() halts the interval", async () => {
		vi.useFakeTimers();
		const callback = vi.fn();
		const result = await mountComposable(() => useInterval(callback, 100));

		vi.advanceTimersByTime(250);
		expect(callback).toHaveBeenCalledTimes(2);

		result.destroy();
		vi.advanceTimersByTime(300);
		expect(callback).toHaveBeenCalledTimes(2);
	});

	it("reset() restarts the interval", async () => {
		vi.useFakeTimers();
		const callback = vi.fn();
		const result = await mountComposable(() => useInterval(callback, 100));

		vi.advanceTimersByTime(250);
		expect(callback).toHaveBeenCalledTimes(2);

		result.reset();
		vi.advanceTimersByTime(100);
		expect(callback).toHaveBeenCalledTimes(3);
	});

	it("does not start with null delay", async () => {
		vi.useFakeTimers();
		const callback = vi.fn();
		await mountComposable(() => useInterval(callback, null));

		vi.advanceTimersByTime(500);
		expect(callback).not.toHaveBeenCalled();
	});
});
