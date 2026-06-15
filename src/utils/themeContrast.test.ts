import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { type ContrastResult, checkContrast, parseOklch } from "./contrastCheck";

const STYLES_DIR = join(import.meta.dirname, "../styles");

function loadThemeCss(name: string): string {
	return readFileSync(join(STYLES_DIR, "themes", `${name}.css`), "utf8");
}

/**
 * Split a theme CSS file into dark and light token maps.
 * Dark = first block ([data-theme="..."]), Light = second block (:root:not(.dark)[data-theme="..."])
 */
function splitThemeModes(css: string): {
	dark: Record<string, string>;
	light: Record<string, string>;
} {
	// biome-ignore lint: regex contains special chars that need escaping
	const re = new RegExp("--([\\w-]+):\\s*(oklch\\([^;]+\\));", "g");

	// Split at :root:not(.dark)
	const parts = css.split(":root:not(.dark)");
	const darkSection = parts[0] ?? "";
	const lightSection = parts[1] ?? "";

	function extract(section: string): Record<string, string> {
		const tokens: Record<string, string> = {};
		for (const match of section.matchAll(re)) {
			tokens[match[1]] = match[2].trim();
		}
		return tokens;
	}

	return {
		dark: extract(darkSection),
		light: extract(lightSection),
	};
}

const THEMES = ["editorial", "dracula", "nord", "catppuccin", "rose-pine", "github"];

// Pairs that must pass WCAG AA for normal text (4.5:1)
const REQUIRED_PAIRS = [
	{ fg: "foreground", bg: "background", label: "Body text on background" },
	{ fg: "card-foreground", bg: "card-solid", label: "Card text on card bg" },
	{ fg: "primary-foreground", bg: "primary", label: "Text on primary button" },
	{ fg: "destructive-foreground", bg: "destructive", label: "Text on destructive button" },
	{ fg: "success-foreground", bg: "success", label: "Text on success" },
	{ fg: "warning-foreground", bg: "warning", label: "Text on warning" },
	{ fg: "info-foreground", bg: "info", label: "Text on info" },
	{ fg: "muted-foreground", bg: "background", label: "Muted text on background" },
];

// Pairs that must pass WCAG AA for large text (3:1)
const REQUIRED_PAIRS_LARGE = [
	{ fg: "muted-foreground", bg: "background", label: "Muted text on background (large)" },
];

interface ThemePairResult {
	pair: string;
	fgToken: string;
	bgToken: string;
	fgValue: string;
	bgValue: string;
	result: ContrastResult;
}

function auditTokens(tokens: Record<string, string>): ThemePairResult[] {
	const failures: ThemePairResult[] = [];

	for (const pair of REQUIRED_PAIRS) {
		const fgVal = tokens[pair.fg];
		const bgVal = tokens[pair.bg];
		if (!fgVal || !bgVal) continue;
		if (!parseOklch(fgVal) || !parseOklch(bgVal)) continue;

		const result = checkContrast(fgVal, bgVal, false);
		if (!result) continue;

		if (!result.passesAA) {
			failures.push({
				pair: pair.label,
				fgToken: pair.fg,
				bgToken: pair.bg,
				fgValue: fgVal,
				bgValue: bgVal,
				result,
			});
		}
	}

	for (const pair of REQUIRED_PAIRS_LARGE) {
		const fgVal = tokens[pair.fg];
		const bgVal = tokens[pair.bg];
		if (!fgVal || !bgVal) continue;
		if (!parseOklch(fgVal) || !parseOklch(bgVal)) continue;

		const result = checkContrast(fgVal, bgVal, true);
		if (!result) continue;

		if (!result.passesAALarge) {
			failures.push({
				pair: `${pair.label} (FAILS 3:1)`,
				fgToken: pair.fg,
				bgToken: pair.bg,
				fgValue: fgVal,
				bgValue: bgVal,
				result,
			});
		}
	}

	return failures;
}

function formatFailures(failures: ThemePairResult[]): string {
	return failures
		.map(
			(f) =>
				`  ${f.pair}: ${f.fgToken}(${f.fgValue}) on ${f.bgToken}(${f.bgValue}) = ${f.result.ratio}:1`,
		)
		.join("\n");
}

describe("WCAG contrast audit — all themes", () => {
	for (const theme of THEMES) {
		describe(theme, () => {
			const css = loadThemeCss(theme);
			const { dark, light } = splitThemeModes(css);

			it("dark mode passes WCAG AA", () => {
				const failures = auditTokens(dark);
				if (failures.length > 0) {
					expect.fail(`Dark mode WCAG AA failures:\n${formatFailures(failures)}`);
				}
			});

			it("light mode passes WCAG AA", () => {
				const failures = auditTokens(light);
				if (failures.length > 0) {
					expect.fail(`Light mode WCAG AA failures:\n${formatFailures(failures)}`);
				}
			});
		});
	}
});
