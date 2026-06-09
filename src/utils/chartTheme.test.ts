import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getChartTheme } from "./chartTheme";

const EDITORIAL_DEFAULTS = {
	primary: "oklch(0.65 0.10 265)",
	accent: "oklch(0.62 0.13 285)",
	destructive: "oklch(0.62 0.22 25)",
	background: "oklch(0.13 0.01 270)",
};

describe("getChartTheme (SSR branch)", () => {
	const originalDocument = (globalThis as { document?: unknown }).document;

	beforeEach(() => {
		// @ts-expect-error test
		delete globalThis.document;
	});

	afterEach(() => {
		(globalThis as { document?: unknown }).document = originalDocument;
	});

	it("returns primary, accent, destructive, muted, background", () => {
		const theme = getChartTheme();
		expect(theme).toHaveProperty("primary");
		expect(theme).toHaveProperty("accent");
		expect(theme).toHaveProperty("destructive");
		expect(theme).toHaveProperty("muted");
		expect(theme).toHaveProperty("background");
	});

	it("uses EDITORIAL_DEFAULTS for primary/accent/destructive/background", () => {
		const theme = getChartTheme();
		expect(theme.primary).toBe(EDITORIAL_DEFAULTS.primary);
		expect(theme.accent).toBe(EDITORIAL_DEFAULTS.accent);
		expect(theme.destructive).toBe(EDITORIAL_DEFAULTS.destructive);
		expect(theme.background).toBe(EDITORIAL_DEFAULTS.background);
	});

	it("uses oklch fallback for muted", () => {
		const theme = getChartTheme();
		expect(theme.muted).toBe("oklch(0.65 0.012 270)");
	});
});

describe("getChartTheme (browser branch)", () => {
	beforeEach(() => {
		// Set CSS custom properties on real documentElement
		document.documentElement.style.setProperty("--primary", "oklch(0.9 0.1 200)");
		document.documentElement.style.setProperty("--accent", "oklch(0.8 0.2 50)");
		document.documentElement.style.setProperty("--destructive", "oklch(0.7 0.3 0)");
		document.documentElement.style.setProperty("--muted-foreground", "oklch(0.5 0.05 100)");
		document.documentElement.style.setProperty("--background", "oklch(0.1 0.01 0)");
	});

	afterEach(() => {
		document.documentElement.removeAttribute("style");
	});

	it("reads CSS variables from documentElement", () => {
		const theme = getChartTheme();
		expect(theme.primary).toBe("oklch(0.9 0.1 200)");
		expect(theme.accent).toBe("oklch(0.8 0.2 50)");
		expect(theme.destructive).toBe("oklch(0.7 0.3 0)");
		expect(theme.muted).toBe("oklch(0.5 0.05 100)");
		expect(theme.background).toBe("oklch(0.1 0.01 0)");
	});

	it("falls back to defaults when CSS variables are missing", () => {
		document.documentElement.removeAttribute("style");
		const theme = getChartTheme();
		expect(theme.primary).toBe(EDITORIAL_DEFAULTS.primary);
		expect(theme.accent).toBe(EDITORIAL_DEFAULTS.accent);
		expect(theme.destructive).toBe(EDITORIAL_DEFAULTS.destructive);
		expect(theme.background).toBe(EDITORIAL_DEFAULTS.background);
	});
});
