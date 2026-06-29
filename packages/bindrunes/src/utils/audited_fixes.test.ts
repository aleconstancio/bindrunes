import { mode } from "mode-watcher";
import { describe, expect, it, vi } from "vitest";
import { getCache } from "../utils/queryCache";

// Mock mode-watcher
vi.mock("mode-watcher", () => {
	let subscriber: ((v: string) => void) | null = null;
	return {
		mode: {
			subscribe: (fn: (v: string) => void) => {
				subscriber = fn;
				fn("light");
				return () => {
					subscriber = null;
				};
			},
			// simulate mode-watcher store changes
			setForTest: (val: string) => {
				if (subscriber) subscriber(val);
			},
		},
		toggleMode: vi.fn(),
		setMode: vi.fn(),
	};
});

describe("Audited Fixes tests", () => {
	it("should react to dark mode store changes", () => {
		let currentMode: string | undefined;
		mode.subscribe((v: string | undefined) => {
			currentMode = v;
		});

		expect(currentMode).toBe("light");

		// Trigger update
		(mode as any).setForTest("dark");
		expect(currentMode).toBe("dark");
	});

	it("should provide isolated map on server", () => {
		// Simulate server environment by temporarily setting window to undefined
		const originalWindow = global.window;
		try {
			(global as any).window = undefined;
			const cache1 = getCache();
			const cache2 = getCache();
			// They should be different instances because it's on the server without Svelte context
			expect(cache1).not.toBe(cache2);
		} finally {
			global.window = originalWindow;
		}
	});
});
