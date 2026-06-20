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
});
