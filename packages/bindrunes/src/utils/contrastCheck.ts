// src/utils/contrastCheck.ts
//
// WCAG 2.1 contrast ratio checker for OKLCH color tokens.
// Converts OKLCH → linear sRGB → relative luminance → contrast ratio.

/**
 * Parse an oklch(...) string into { L, C, H }.
 * Handles: oklch(0.65 0.1 265), oklch(0.62 0.22 25 / 0.12)
 */
export function parseOklch(str: string): { L: number; C: number; H: number } | null {
	const match = str.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*[\d.]+)?\s*\)/);
	if (!match) return null;
	return {
		L: Number.parseFloat(match[1] ?? "0"),
		C: Number.parseFloat(match[2] ?? "0"),
		H: Number.parseFloat(match[3] ?? "0"),
	};
}

/**
 * OKLCH → linear sRGB (each channel 0-1).
 * Based on the OKLCH → XYZ D65 → linear sRGB pipeline.
 */
export function oklchToLinearSrgb(
	L: number,
	C: number,
	H: number,
): { r: number; g: number; b: number } {
	const hRad = (H * Math.PI) / 180;
	const a = C * Math.cos(hRad);
	const bCoord = C * Math.sin(hRad);

	const l_ = L + 0.3963377774 * a + 0.2158037573 * bCoord;
	const m_ = L - 0.1055613458 * a - 0.0638541728 * bCoord;
	const s_ = L - 0.0894841775 * a - 1.291485548 * bCoord;

	const l = l_ * l_ * l_;
	const m = m_ * m_ * m_;
	const s = s_ * s_ * s_;

	const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
	const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
	const b = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

	return { r, g, b };
}

/**
 * Linear sRGB channel → sRGB channel (gamma-compressed, 0-1).
 */
function linearToSrgb(c: number): number {
	if (c <= 0.0031308) return 12.92 * c;
	return 1.055 * c ** (1 / 2.4) - 0.055;
}

/**
 * Compute relative luminance from linear sRGB values.
 * Each channel should be in the linear 0-1 range (already decoded from OKLCH).
 */
export function relativeLuminance(r: number, g: number, b: number): number {
	const sr = linearToSrgb(Math.max(0, Math.min(1, r)));
	const sg = linearToSrgb(Math.max(0, Math.min(1, g)));
	const sb = linearToSrgb(Math.max(0, Math.min(1, b)));

	// Rec. 709 coefficients
	return 0.2126 * sr + 0.7152 * sg + 0.0722 * sb;
}

/**
 * WCAG 2.1 contrast ratio between two relative luminance values.
 * Returns a value >= 1 (lighter / darker).
 */
export function contrastRatio(lum1: number, lum2: number): number {
	const lighter = Math.max(lum1, lum2);
	const darker = Math.min(lum1, lum2);
	return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Compute contrast ratio from two OKLCH color strings.
 */
export function oklchContrast(fg: string, bg: string): number | null {
	const fgParsed = parseOklch(fg);
	const bgParsed = parseOklch(bg);
	if (!fgParsed || !bgParsed) return null;

	const fgRgb = oklchToLinearSrgb(fgParsed.L, fgParsed.C, fgParsed.H);
	const bgRgb = oklchToLinearSrgb(bgParsed.L, bgParsed.C, bgParsed.H);

	const fgLum = relativeLuminance(fgRgb.r, fgRgb.g, fgRgb.b);
	const bgLum = relativeLuminance(bgRgb.r, bgRgb.g, bgRgb.b);

	return contrastRatio(fgLum, bgLum);
}

export interface ContrastResult {
	foreground: string;
	background: string;
	ratio: number;
	passesAA: boolean;
	passesAALarge: boolean;
	passesAAA: boolean;
}

/**
 * Check WCAG contrast for a foreground/background OKLCH pair.
 *
 * Always reports:
 *   - `passesAA`: normal text threshold (4.5:1)
 *   - `passesAALarge`: large text threshold (3:1)
 *   - `passesAAA`: normal text AAA (7:1) when largeText=false,
 *                  large text AAA (4.5:1) when largeText=true
 */
export function checkContrast(fg: string, bg: string, largeText = false): ContrastResult | null {
	const ratio = oklchContrast(fg, bg);
	if (ratio === null) return null;

	const aaaThreshold = largeText ? 4.5 : 7;

	return {
		foreground: fg,
		background: bg,
		ratio: Math.round(ratio * 100) / 100,
		passesAA: ratio >= 4.5,
		passesAALarge: ratio >= 3,
		passesAAA: ratio >= aaaThreshold,
	};
}
