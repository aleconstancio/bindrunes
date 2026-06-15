#!/usr/bin/env node
// scripts/fix-contrast.mjs
// Final WCAG AA contrast fixes. L=0.30 for chromatic colors on near-white gives ~4.6:1+.

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const THEMES_DIR = new URL("../src/styles/themes", import.meta.url).pathname;

const FIXES = {
	editorial: {
		dark: { "--destructive-foreground": "oklch(0.15 0 0)" },
		light: {
			"--primary": "oklch(0.30 0.1 265)",
			"--success": "oklch(0.30 0.16 145)",
			"--warning": "oklch(0.30 0.16 80)",
			"--info": "oklch(0.30 0.12 230)",
			"--muted-foreground": "oklch(0.28 0.008 270)",
		},
	},
	dracula: {
		dark: {
			"--destructive-foreground": "oklch(0.15 0 0)",
			"--success-foreground": "oklch(0.15 0 0)",
			"--info-foreground": "oklch(0.15 0 0)",
		},
		light: {
			"--primary": "oklch(0.30 0.21 310)",
			"--destructive": "oklch(0.30 0.24 30)",
			"--info": "oklch(0.30 0.12 230)",
			"--muted-foreground": "oklch(0.28 0.02 290)",
		},
	},
	nord: {
		dark: { "--destructive-foreground": "oklch(0.15 0 0)" },
		light: {
			"--primary": "oklch(0.30 0.1 230)",
			"--success": "oklch(0.30 0.16 145)",
			"--warning": "oklch(0.30 0.16 80)",
			"--info": "oklch(0.30 0.12 230)",
			"--muted-foreground": "oklch(0.28 0.02 250)",
		},
	},
	catppuccin: {
		dark: { "--destructive-foreground": "oklch(0.15 0 0)" },
		light: {
			"--primary": "oklch(0.30 0.14 280)",
			"--success": "oklch(0.30 0.16 145)",
			"--warning": "oklch(0.30 0.16 80)",
			"--info": "oklch(0.30 0.12 230)",
			"--muted-foreground": "oklch(0.28 0.02 290)",
		},
	},
	"rose-pine": {
		dark: { "--destructive-foreground": "oklch(0.15 0 0)" },
		light: {
			"--primary": "oklch(0.30 0.12 15)",
			"--success": "oklch(0.30 0.16 145)",
			"--warning": "oklch(0.30 0.16 80)",
			"--info": "oklch(0.30 0.1 230)",
			"--muted-foreground": "oklch(0.28 0.01 30)",
		},
	},
	github: {
		dark: {
			"--primary-foreground": "oklch(0.15 0 0)",
			"--destructive-foreground": "oklch(0.15 0 0)",
			"--success-foreground": "oklch(0.15 0 0)",
			"--info-foreground": "oklch(0.15 0 0)",
			"--muted-foreground": "oklch(0.45 0.01 250)",
		},
		light: {
			"--primary": "oklch(0.30 0.18 250)",
			"--success": "oklch(0.30 0.2 145)",
			"--warning": "oklch(0.30 0.18 75)",
			"--info": "oklch(0.30 0.14 230)",
			"--muted-foreground": "oklch(0.28 0.005 250)",
		},
	},
};

function applyFixes(css, fixes) {
	const darkLightSplit = css.split(":root:not(.dark)");
	if (darkLightSplit.length !== 2) return css;

	let [darkSection, lightSection] = darkLightSplit;

	for (const section of ["dark", "light"]) {
		const tokens = fixes[section];
		if (!tokens) continue;
		const target = section === "dark" ? darkSection : lightSection;
		for (const [token, value] of Object.entries(tokens)) {
			const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			const re = new RegExp(`(${escaped}:\\s*)([^;]+)(;)`);
			if (re.test(target)) {
				if (section === "dark") {
					darkSection = darkSection.replace(re, `$1${value}$3`);
				} else {
					lightSection = lightSection.replace(re, `$1${value}$3`);
				}
				console.log(`  ${section}: ${token} → ${value}`);
			}
		}
	}

	return `${darkSection}:root:not(.dark)${lightSection}`;
}

for (const [theme, fixes] of Object.entries(FIXES)) {
	const filePath = join(THEMES_DIR, `${theme}.css`);
	const css = readFileSync(filePath, "utf8");
	console.log(`Fixing ${theme}...`);
	writeFileSync(filePath, applyFixes(css, fixes), "utf8");
}
