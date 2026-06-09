import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const PRESET = readFileSync(join(__dirname, "..", "styles", "preset.css"), "utf-8");
const TAILWIND = readFileSync(join(__dirname, "..", "styles", "tokens", "tailwind.css"), "utf-8");
const ROOT = readFileSync(join(__dirname, "..", "styles", "tokens", "root.css"), "utf-8");
const PROPERTY = readFileSync(join(__dirname, "..", "styles", "tokens", "property.css"), "utf-8");

// Combine all token files for full-contract assertions
const ALL = PRESET + TAILWIND + ROOT + PROPERTY;

describe("preset.css — v1.0 token contract", () => {
	describe("color tokens (@theme inline block)", () => {
		const requiredColorTokens = [
			"--color-info",
			"--color-info-foreground",
			"--color-info-soft",
			"--color-success-soft",
			"--color-warning-soft",
			"--color-destructive-soft",
			"--color-overlay",
			"--color-overlay-strong",
			"--color-border-strong",
			"--color-border-subtle",
			"--color-card-solid",
			"--color-surface-1",
			"--color-surface-2",
			"--color-surface-3",
		];

		for (const token of requiredColorTokens) {
			it(`declares ${token}`, () => {
				expect(ALL).toMatch(new RegExp(`${token}:\\s*var\\(--`));
			});
		}
	});

	describe("font tokens", () => {
		const requiredFontTokens = ["--font-display", "--font-mono"];

		for (const token of requiredFontTokens) {
			it(`declares ${token}`, () => {
				expect(ALL).toMatch(new RegExp(`${token}:`));
			});
		}
	});

	describe("typography scale (Tailwind v4 convention: --text-X, --text-X--line-height, etc.)", () => {
		const requiredTextScaleTokens = [
			"--text-display-1",
			"--text-display-1--line-height",
			"--text-display-1--letter-spacing",
			"--text-display-1--font-weight",
			"--text-headline-1",
			"--text-headline-2",
			"--text-headline-3",
			"--text-title-1",
			"--text-title-2",
			"--text-body-md",
			"--text-body-sm",
			"--text-label-md",
			"--text-label-sm",
			"--text-mono-md",
			"--text-mono-sm",
			"--text-mono-xs",
		];

		for (const token of requiredTextScaleTokens) {
			it(`declares ${token}`, () => {
				expect(ALL).toMatch(new RegExp(`${token}:`));
			});
		}
	});

	describe("spacing scale (:root defaults)", () => {
		const requiredSpaceTokens = [
			"--space-0",
			"--space-1",
			"--space-2",
			"--space-3",
			"--space-4",
			"--space-5",
			"--space-6",
			"--space-8",
			"--space-10",
			"--space-12",
			"--space-16",
			"--space-20",
		];

		for (const token of requiredSpaceTokens) {
			it(`declares ${token}`, () => {
				expect(ALL).toMatch(new RegExp(`${token}:`));
			});
		}
	});

	describe("radius scale", () => {
		const requiredRadiusTokens = [
			"--radius-xs",
			"--radius-sm",
			"--radius",
			"--radius-md",
			"--radius-lg",
			"--radius-xl",
		];

		for (const token of requiredRadiusTokens) {
			it(`declares ${token}`, () => {
				expect(ALL).toMatch(new RegExp(`${token}:`));
			});
		}
	});

	describe("shadow scale", () => {
		const requiredShadowTokens = [
			"--shadow-xs",
			"--shadow-sm",
			"--shadow-md",
			"--shadow-lg",
			"--shadow-glow-primary",
			"--shadow-glow-destructive",
			"--shadow-inset-subtle",
		];

		for (const token of requiredShadowTokens) {
			it(`declares ${token}`, () => {
				expect(ALL).toMatch(new RegExp(`${token}:`));
			});
		}
	});

	describe("motion scale", () => {
		const requiredDurationTokens = [
			"--duration-instant",
			"--duration-snappy",
			"--duration-fluid",
			"--duration-slow",
		];
		const requiredEaseTokens = [
			"--ease-standard",
			"--ease-emphasized",
			"--ease-decelerated",
			"--ease-accelerated",
			"--ease-spring",
		];

		for (const token of requiredDurationTokens) {
			it(`declares ${token}`, () => {
				expect(ALL).toMatch(new RegExp(`${token}:`));
			});
		}
		for (const token of requiredEaseTokens) {
			it(`declares ${token}`, () => {
				expect(ALL).toMatch(new RegExp(`${token}:`));
			});
		}
	});

	describe("container scale", () => {
		const requiredContainerTokens = [
			"--container-prose",
			"--container-sm",
			"--container-md",
			"--container-lg",
			"--container-xl",
			"--container-2xl",
		];

		for (const token of requiredContainerTokens) {
			it(`declares ${token}`, () => {
				expect(ALL).toMatch(new RegExp(`${token}:`));
			});
		}
	});
});
