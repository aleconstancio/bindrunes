import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createSession } from "./session.svelte";

describe("createSession", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("initializes with non-expired state", () => {
		const session = createSession({ timeout: 1000 });
		expect(session.isExpired).toBe(false);
		expect(session.showWarning).toBe(false);
		expect(session.lastActivity).toBeTypeOf("number");
	});

	it("onTimeout fires when elapsed >= timeout", () => {
		const onTimeout = vi.fn();
		const session = createSession({
			timeout: 60_000,
			warningBefore: 5_000,
			onTimeout,
		});

		session.startTracking();
		vi.advanceTimersByTime(61_000);

		expect(session.isExpired).toBe(true);
		expect(onTimeout).toHaveBeenCalled();
	});

	it("onWarning fires when elapsed >= timeout - warningBefore", () => {
		const onWarning = vi.fn();
		const session = createSession({
			timeout: 90_000,
			warningBefore: 40_000,
			onWarning,
		});

		session.startTracking();
		vi.advanceTimersByTime(61_000);

		expect(session.showWarning).toBe(true);
		expect(onWarning).toHaveBeenCalled();
	});

	it("reset extends timeout", () => {
		const onTimeout = vi.fn();
		const session = createSession({
			timeout: 60_000,
			warningBefore: 5_000,
			onTimeout,
		});

		session.startTracking();
		vi.advanceTimersByTime(40_000);
		session.reset();
		vi.advanceTimersByTime(40_000);

		expect(session.isExpired).toBe(false);
		expect(onTimeout).not.toHaveBeenCalled();
	});

	it("stopTracking cleans up timers", () => {
		const onTimeout = vi.fn();
		const session = createSession({
			timeout: 60_000,
			onTimeout,
		});

		session.startTracking();
		session.stopTracking();
		vi.advanceTimersByTime(120_000);

		expect(session.isExpired).toBe(false);
		expect(onTimeout).not.toHaveBeenCalled();
	});

	it("destroy alias stops tracking", () => {
		const onTimeout = vi.fn();
		const session = createSession({
			timeout: 60_000,
			onTimeout,
		});

		session.startTracking();
		session.destroy();
		vi.advanceTimersByTime(120_000);

		expect(onTimeout).not.toHaveBeenCalled();
	});

	it("onActivity callback fires on trackActivity", () => {
		const onActivity = vi.fn();
		const session = createSession({ onActivity });

		session.startTracking();
		window.dispatchEvent(new Event("mousedown"));

		expect(onActivity).toHaveBeenCalled();
		session.stopTracking();
	});

	it("autoRefresh calls refreshFn periodically", () => {
		const refreshFn = vi.fn().mockResolvedValue(undefined);
		const session = createSession({
			autoRefresh: true,
			refreshInterval: 30_000,
			refreshFn,
		});

		vi.advanceTimersByTime(30_000);
		expect(refreshFn).toHaveBeenCalled();

		vi.advanceTimersByTime(30_000);
		expect(refreshFn).toHaveBeenCalledTimes(2);
	});

	it("autoRefresh failure does not throw", () => {
		const refreshFn = vi.fn().mockRejectedValue(new Error("network"));
		const session = createSession({
			autoRefresh: true,
			refreshInterval: 10_000,
			refreshFn,
		});

		expect(() => vi.advanceTimersByTime(10_000)).not.toThrow();
		expect(refreshFn).toHaveBeenCalled();
	});

	it("autoRefresh resets activity timer on success", () => {
		const refreshFn = vi.fn().mockResolvedValue(undefined);
		const onTimeout = vi.fn();
		const session = createSession({
			autoRefresh: true,
			refreshInterval: 10_000,
			refreshFn,
			timeout: 60_000,
			warningBefore: 5_000,
			onTimeout,
		});

		session.startTracking();
		vi.advanceTimersByTime(10_000);
		expect(refreshFn).toHaveBeenCalled();
		expect(session.isExpired).toBe(false);
	});

	it("no autoRefresh without refreshFn", () => {
		const session = createSession({
			autoRefresh: true,
			refreshInterval: 10_000,
			// no refreshFn
		});

		vi.advanceTimersByTime(30_000);
		// No error, no refresh
	});

	it("warning shown only once until reset", () => {
		const onWarning = vi.fn();
		const session = createSession({
			timeout: 90_000,
			warningBefore: 40_000,
			onWarning,
		});

		session.startTracking();
		vi.advanceTimersByTime(60_000);
		expect(onWarning).toHaveBeenCalledTimes(1);

		vi.advanceTimersByTime(30_000);
		expect(onWarning).toHaveBeenCalledTimes(1); // still 1
	});

	it("onActivity resets warningShown", () => {
		const onWarning = vi.fn();
		const onActivity = vi.fn();
		const session = createSession({
			timeout: 180_000,
			warningBefore: 60_000,
			onWarning,
			onActivity,
		});

		// Warning zone: elapsed >= 120_000. Interval ticks at 60s, 120s, 180s, 240s...
		session.startTracking();
		vi.advanceTimersByTime(120_000); // tick at 120s, elapsed=120s >= 120s, warning fires
		expect(onWarning).toHaveBeenCalledTimes(1);

		window.dispatchEvent(new Event("mousedown")); // activity resets warningShown
		vi.advanceTimersByTime(60_000); // tick at 180s, elapsed from activity(120s)=60s < 120s, no warning
		expect(onWarning).toHaveBeenCalledTimes(1);

		vi.advanceTimersByTime(60_000); // tick at 240s, elapsed from activity(120s)=120s >= 120s, warning fires again
		expect(onWarning).toHaveBeenCalledTimes(2);
		session.stopTracking();
	});

	it("multiple activity events do not cause issues", () => {
		const onActivity = vi.fn();
		const session = createSession({ onActivity });

		session.startTracking();
		window.dispatchEvent(new Event("mousedown"));
		window.dispatchEvent(new Event("keydown"));
		window.dispatchEvent(new Event("touchstart"));
		window.dispatchEvent(new Event("scroll"));

		expect(onActivity).toHaveBeenCalledTimes(4);
		session.stopTracking();
	});

	it("stopTracking can be called multiple times safely", () => {
		const session = createSession({ timeout: 60_000 });
		session.startTracking();
		session.stopTracking();
		session.stopTracking(); // no error
	});

	it("startTracking can be called multiple times", () => {
		const session = createSession({ timeout: 60_000 });
		session.startTracking();
		session.startTracking(); // no error
		session.stopTracking();
	});

	it("destroy clears refresh timer", () => {
		const refreshFn = vi.fn().mockResolvedValue(undefined);
		const session = createSession({
			autoRefresh: true,
			refreshInterval: 10_000,
			refreshFn,
		});

		session.destroy();
		vi.advanceTimersByTime(30_000);
		expect(refreshFn).not.toHaveBeenCalled();
	});

	it("no-op when startTracking called without window", () => {
		const originalWindow = globalThis.window;
		// @ts-expect-error testing server-side
		delete globalThis.window;

		const session = createSession({ timeout: 60_000 });
		session.startTracking(); // no error

		globalThis.window = originalWindow;
	});

	it("no-op when stopTracking called without window", () => {
		const originalWindow = globalThis.window;
		// @ts-expect-error testing server-side
		delete globalThis.window;

		const session = createSession({ timeout: 60_000 });
		session.stopTracking(); // no error

		globalThis.window = originalWindow;
	});

	it("elapsed exactly at timeout boundary fires onTimeout", () => {
		const onTimeout = vi.fn();
		const session = createSession({
			timeout: 60_000,
			warningBefore: 5_000,
			onTimeout,
		});

		session.startTracking();
		vi.advanceTimersByTime(60_000); // exactly at boundary

		expect(session.isExpired).toBe(true);
		expect(onTimeout).toHaveBeenCalled();
	});

	it("elapsed just before timeout does not fire onTimeout", () => {
		const onTimeout = vi.fn();
		const session = createSession({
			timeout: 60_000,
			warningBefore: 5_000,
			onTimeout,
		});

		session.startTracking();
		vi.advanceTimersByTime(59_000);

		expect(session.isExpired).toBe(false);
		expect(onTimeout).not.toHaveBeenCalled();
	});

	it("warning resets when activity occurs before timeout", () => {
		const onWarning = vi.fn();
		const session = createSession({
			timeout: 180_000,
			warningBefore: 60_000,
			onWarning,
		});

		session.startTracking();
		vi.advanceTimersByTime(120_000); // tick at 120s, elapsed=120s >= 120s, warning fires
		expect(onWarning).toHaveBeenCalled();
		expect(session.showWarning).toBe(true);

		window.dispatchEvent(new Event("mousedown")); // activity resets
		expect(session.showWarning).toBe(false);
		expect(session.isExpired).toBe(false);
		session.stopTracking();
	});
});
