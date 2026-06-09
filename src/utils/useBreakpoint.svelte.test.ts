import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { useBreakpoint } from "./useBreakpoint.svelte";

describe("useBreakpoint", () => {
	beforeEach(() => {
		Object.defineProperty(window, "innerWidth", {
			value: 1024,
			writable: true,
			configurable: true,
		});
		if (!window.matchMedia) {
			window.matchMedia = () =>
				({
					addEventListener: () => {},
					removeEventListener: () => {},
					matches: false,
					media: "",
					onchange: null,
					addListener: () => {},
					removeListener: () => {},
					dispatchEvent: () => true,
				}) as unknown as MediaQueryList;
		}
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("returns isAbove=true and isBelow=false on SSR (no window)", () => {
		const originalWindow = (globalThis as { window?: unknown }).window;
		// @ts-expect-error test
		delete globalThis.window;
		const bp = useBreakpoint("md");
		expect(bp.isAbove).toBe(true);
		expect(bp.isBelow).toBe(false);
		if (originalWindow !== undefined) {
			(globalThis as { window: unknown }).window = originalWindow;
		}
	});

	it("breakpoint sm (640) - width 500 below", async () => {
		Object.defineProperty(window, "innerWidth", { value: 500, configurable: true });
		const bp = await mountComposable(() => useBreakpoint("sm"));
		expect(bp.isAbove).toBe(false);
		expect(bp.isBelow).toBe(true);
	});

	it("breakpoint sm at 800 above", async () => {
		Object.defineProperty(window, "innerWidth", { value: 800, configurable: true });
		const bp = await mountComposable(() => useBreakpoint("sm"));
		expect(bp.isAbove).toBe(true);
	});

	it("breakpoint md (768) - width 600 below", async () => {
		Object.defineProperty(window, "innerWidth", { value: 600, configurable: true });
		const bp = await mountComposable(() => useBreakpoint("md"));
		expect(bp.isAbove).toBe(false);
	});

	it("breakpoint lg (1024) - width 1200 above", async () => {
		Object.defineProperty(window, "innerWidth", { value: 1200, configurable: true });
		const bp = await mountComposable(() => useBreakpoint("lg"));
		expect(bp.isAbove).toBe(true);
		expect(bp.isBelow).toBe(false);
	});

	it("breakpoint xl (1280) - width 1000 below", async () => {
		Object.defineProperty(window, "innerWidth", { value: 1000, configurable: true });
		const bp = await mountComposable(() => useBreakpoint("xl"));
		expect(bp.isAbove).toBe(false);
	});

	it("breakpoint 2xl (1536) - width 2000 above", async () => {
		Object.defineProperty(window, "innerWidth", { value: 2000, configurable: true });
		const bp = await mountComposable(() => useBreakpoint("2xl"));
		expect(bp.isAbove).toBe(true);
	});

	it("default breakpoint is md", async () => {
		const bp = await mountComposable(() => useBreakpoint());
		expect(bp.isAbove).toBeDefined();
		expect(bp.isBelow).toBeDefined();
	});
});
