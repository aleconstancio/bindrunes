import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createSessionMonitor } from "./createSessionMonitor.svelte";

describe("createSessionMonitor", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});
	afterEach(() => {
		vi.useRealTimers();
	});

	it("calls onWarning before timeout", () => {
		const onRefresh = vi.fn();
		const onExpire = vi.fn();
		const onWarning = vi.fn();
		const stop = createSessionMonitor(onRefresh, onExpire, onWarning, {
			timeout: 1000,
			warningBefore: 200,
		});

		vi.advanceTimersByTime(800);
		expect(onWarning).toHaveBeenCalled();
		expect(onRefresh).not.toHaveBeenCalled();

		stop();
	});

	it("calls onRefresh at timeout", () => {
		const onRefresh = vi.fn();
		const onExpire = vi.fn();
		const onWarning = vi.fn();
		const stop = createSessionMonitor(onRefresh, onExpire, onWarning, {
			timeout: 1000,
			warningBefore: 200,
		});

		vi.advanceTimersByTime(1000);
		expect(onRefresh).toHaveBeenCalled();

		stop();
	});

	it("returns cleanup function", () => {
		const stop = createSessionMonitor(vi.fn(), vi.fn(), vi.fn(), {
			timeout: 1000,
			warningBefore: 200,
		});
		expect(typeof stop).toBe("function");
		stop();
	});
});
