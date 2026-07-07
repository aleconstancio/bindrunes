import { DRACULA_DEFAULTS } from "./theme-defaults";

export const THEME_TOKENS: Record<string, Record<string, string>> = {
	editorial: {
		"--primary": "oklch(0.65 0.10 265)",
		"--accent": "oklch(0.62 0.13 285)",
		"--destructive": "oklch(0.62 0.22 25)",
		"--background": "oklch(0.13 0.01 270)",
		"--foreground": "oklch(0.96 0.005 270)",
		"--card-solid": "oklch(0.17 0.008 270)",
		"--border": "oklch(1 0 0 / 0.08)",
		"--ring": "oklch(0.65 0.10 265)",
	},
	dracula: {
		"--primary": DRACULA_DEFAULTS.primary,
		"--accent": DRACULA_DEFAULTS.accent,
		"--destructive": DRACULA_DEFAULTS.destructive,
		"--background": DRACULA_DEFAULTS.background,
		"--foreground": "oklch(0.95 0.01 290)",
		"--card-solid": "oklch(0.1 0.015 290)",
		"--border": "oklch(1 0 0 / 0.08)",
		"--ring": DRACULA_DEFAULTS.primary,
	},
	nord: {
		"--primary": "oklch(0.78 0.10 230)",
		"--accent": "oklch(0.74 0.08 210)",
		"--destructive": "oklch(0.62 0.22 25)",
		"--background": "oklch(0.18 0.01 250)",
		"--foreground": "oklch(0.93 0.01 250)",
		"--card-solid": "oklch(0.22 0.012 250)",
		"--border": "oklch(1 0 0 / 0.08)",
		"--ring": "oklch(0.78 0.10 230)",
	},
	catppuccin: {
		"--primary": "oklch(0.80 0.14 280)",
		"--accent": "oklch(0.78 0.18 300)",
		"--destructive": "oklch(0.65 0.20 20)",
		"--background": "oklch(0.16 0.01 290)",
		"--foreground": "oklch(0.92 0.02 290)",
		"--card-solid": "oklch(0.2 0.015 290)",
		"--border": "oklch(1 0 0 / 0.08)",
		"--ring": "oklch(0.8 0.14 280)",
	},
	"rose-pine": {
		"--primary": "oklch(0.72 0.12 15)",
		"--accent": "oklch(0.70 0.10 350)",
		"--destructive": "oklch(0.62 0.22 25)",
		"--background": "oklch(0.15 0.01 30)",
		"--foreground": "oklch(0.92 0.008 30)",
		"--card-solid": "oklch(0.19 0.01 30)",
		"--border": "oklch(1 0 0 / 0.08)",
		"--ring": "oklch(0.72 0.12 15)",
	},
	github: {
		"--primary": "oklch(0.65 0.18 250)",
		"--accent": "oklch(0.60 0.14 240)",
		"--destructive": "oklch(0.65 0.22 25)",
		"--background": "oklch(0.20 0.01 250)",
		"--foreground": "oklch(0.97 0.005 250)",
		"--card-solid": "oklch(0.24 0.012 250)",
		"--border": "oklch(1 0 0 / 0.1)",
		"--ring": "oklch(0.65 0.18 250)",
	},
};

const nord = THEME_TOKENS.nord;
const dracula = THEME_TOKENS.dracula;
const github = THEME_TOKENS.github;
const rosePine = THEME_TOKENS["rose-pine"];
const editorial = THEME_TOKENS.editorial;

if (nord) THEME_TOKENS.akashic = nord;
if (dracula) THEME_TOKENS.martian = dracula;
if (github) THEME_TOKENS.alchemy = github;
if (rosePine) THEME_TOKENS.druidic = rosePine;
if (editorial) THEME_TOKENS.obsidian = editorial;
if (github) THEME_TOKENS.contrast = github;
