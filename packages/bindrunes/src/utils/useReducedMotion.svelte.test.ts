import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { useReducedMotion } from "./useReducedMotion.svelte";

describe("useReducedMotion", () => {
	beforeEach(() => {
		if (!window.matchMedia) {
			window.matchMedia = () =>
				({
					addEventListener: vi.fn(),
					removeEventListener: vi.fn(),
					matches: false,
					media: "(prefers-reduced-motion: reduce)",
					onchange: null,
					addListener: vi.fn(),
					removeListener: vi.fn(),
					dispatchEvent: () => true,
				}) as unknown as MediaQueryList;
		}
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("returns false by default (no reduced motion)", async () => {
		vi.spyOn(window, "matchMedia").mockImplementation(
			() =>
				({
					addEventListener: vi.fn(),
					removeEventListener: vi.fn(),
					matches: false,
					media: "(prefers-reduced-motion: reduce)",
					onchange: null,
					dispatchEvent: () => true,
				}) as unknown as MediaQueryList,
		);

		const motion = await mountComposable(() => useReducedMotion());
		expect(motion.current).toBe(false);
	});

	it("returns true when prefers-reduced-motion is reduce", async () => {
		vi.spyOn(window, "matchMedia").mockImplementation(
			() =>
				({
					addEventListener: vi.fn(),
					removeEventListener: vi.fn(),
					matches: true,
					media: "(prefers-reduced-motion: reduce)",
					onchange: null,
					dispatchEvent: () => true,
				}) as unknown as MediaQueryList,
		);

		const motion = await mountComposable(() => useReducedMotion());
		expect(motion.current).toBe(true);
	});
});
