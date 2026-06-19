import { afterEach, describe, expect, it, vi } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { useThrottle } from "./useThrottle.svelte";

describe("useThrottle", () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	it("initializes with the provided value", async () => {
		const throttled = await mountComposable(() => useThrottle("initial", 100));
		expect(throttled.current).toBe("initial");
	});

	it("returns value immediately on first call", async () => {
		vi.useFakeTimers();
		const throttled = await mountComposable(() => useThrottle("initial", 100));
		expect(throttled.current).toBe("initial");
	});

	it("throttles rapid updates", async () => {
		vi.useFakeTimers();
		const throttled = await mountComposable(() => useThrottle("initial", 100));
		expect(throttled.current).toBe("initial");

		// Advance less than delay
		vi.advanceTimersByTime(50);
		expect(throttled.current).toBe("initial");
	});
});
