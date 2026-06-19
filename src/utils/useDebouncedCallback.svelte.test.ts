import { describe, expect, it, vi } from "vitest";
import { useDebouncedCallback } from "./useDebouncedCallback.svelte";

describe("useDebouncedCallback", () => {
	it("delays function execution", async () => {
		const fn = vi.fn();
		const debounced = useDebouncedCallback(fn, 100);

		debounced();
		debounced();
		debounced();

		expect(fn).not.toHaveBeenCalled();

		await new Promise((r) => setTimeout(r, 150));
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it("passes arguments to the debounced function", async () => {
		const fn = vi.fn();
		const debounced = useDebouncedCallback(fn, 50);

		debounced("hello", 42);

		await new Promise((r) => setTimeout(r, 100));
		expect(fn).toHaveBeenCalledWith("hello", 42);
	});

	it("resets timer on subsequent calls", async () => {
		const fn = vi.fn();
		const debounced = useDebouncedCallback(fn, 100);

		debounced();
		await new Promise((r) => setTimeout(r, 50));
		debounced();
		await new Promise((r) => setTimeout(r, 50));
		expect(fn).not.toHaveBeenCalled();

		await new Promise((r) => setTimeout(r, 100));
		expect(fn).toHaveBeenCalledTimes(1);
	});
});
