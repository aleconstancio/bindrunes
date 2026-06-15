import { describe, expect, it } from "vitest";
import {
	checkContrast,
	contrastRatio,
	oklchContrast,
	parseOklch,
	relativeLuminance,
} from "./contrastCheck";

describe("parseOklch", () => {
	it("parses standard oklch string", () => {
		const result = parseOklch("oklch(0.65 0.1 265)");
		expect(result).toEqual({ L: 0.65, C: 0.1, H: 265 });
	});

	it("parses oklch with alpha", () => {
		const result = parseOklch("oklch(0.62 0.22 25 / 0.12)");
		expect(result).toEqual({ L: 0.62, C: 0.22, H: 25 });
	});

	it("parses neutral oklch", () => {
		const result = parseOklch("oklch(0.13 0.01 270)");
		expect(result).toEqual({ L: 0.13, C: 0.01, H: 270 });
	});

	it("returns null for non-oklch string", () => {
		expect(parseOklch("#ff0000")).toBeNull();
		expect(parseOklch("rgb(0, 0, 0)")).toBeNull();
		expect(parseOklch("")).toBeNull();
	});
});

describe("relativeLuminance", () => {
	it("returns ~1 for white", () => {
		// White in linear sRGB: r=1, g=1, b=1
		const lum = relativeLuminance(1, 1, 1);
		expect(lum).toBeCloseTo(1.0, 1);
	});

	it("returns 0 for black", () => {
		const lum = relativeLuminance(0, 0, 0);
		expect(lum).toBe(0);
	});

	it("returns ~0.2126 for pure red (linear)", () => {
		const lum = relativeLuminance(1, 0, 0);
		expect(lum).toBeCloseTo(0.2126, 3);
	});
});

describe("contrastRatio", () => {
	it("returns 1 for identical luminance", () => {
		expect(contrastRatio(0.5, 0.5)).toBeCloseTo(1, 1);
	});

	it("returns 21:1 for white vs black", () => {
		const ratio = contrastRatio(1, 0);
		expect(ratio).toBeCloseTo(21, 0);
	});

	it("returns > 1 for lighter vs darker", () => {
		const ratio = contrastRatio(0.8, 0.2);
		expect(ratio).toBeGreaterThan(1);
	});
});

describe("oklchContrast", () => {
	it("returns high contrast for white text on black bg", () => {
		const ratio = oklchContrast("oklch(1 0 0)", "oklch(0 0 0)");
		expect(ratio).toBeCloseTo(21, 0);
	});

	it("returns null for invalid input", () => {
		expect(oklchContrast("invalid", "oklch(0 0 0)")).toBeNull();
	});
});

describe("checkContrast", () => {
	it("passes AA for high-contrast pair", () => {
		const result = checkContrast("oklch(1 0 0)", "oklch(0 0 0)");
		expect(result).not.toBeNull();
		expect(result!.passesAA).toBe(true);
		expect(result!.passesAAA).toBe(true);
		expect(result!.ratio).toBeGreaterThan(15);
	});

	it("fails AA for low-contrast pair", () => {
		// Two very similar light grays
		const result = checkContrast("oklch(0.95 0.005 270)", "oklch(0.93 0.005 270)");
		expect(result).not.toBeNull();
		expect(result!.passesAA).toBe(false);
	});

	it("large text has lower threshold (3:1)", () => {
		// A color pair that fails normal AA (4.5:1) but passes large AA (3:1)
		// oklch L=0.35 on near-white should be ~4:1
		const result = checkContrast("oklch(0.35 0.01 270)", "oklch(0.98 0.005 270)", true);
		expect(result).not.toBeNull();
		expect(result!.passesAALarge).toBe(true);
		expect(result!.passesAA).toBe(false);
	});

	it("returns null for unparseable input", () => {
		expect(checkContrast("not-oklch", "oklch(0 0 0)")).toBeNull();
	});
});
