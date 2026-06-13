import { createThemeBuilder } from "./createThemeBuilder";
import { DRACULA_DEFAULTS } from "./theme-defaults";

type ExtendThemeOptions = {
	primary?: string;
	accent?: string;
	destructive?: string;
	background?: string;
	radius?: string;
	glassBlur?: string;
};

const presetTokens: Record<string, Record<string, string>> = {
	editorial: {
		primary: "oklch(0.65 0.10 265)",
		accent: "oklch(0.62 0.13 285)",
		destructive: "oklch(0.62 0.22 25)",
		background: "oklch(0.13 0.01 270)",
	},
	dracula: { ...DRACULA_DEFAULTS },
	nord: {
		primary: "oklch(0.78 0.10 230)",
		accent: "oklch(0.74 0.08 210)",
		destructive: "oklch(0.62 0.22 25)",
		background: "oklch(0.18 0.01 250)",
	},
	catppuccin: {
		primary: "oklch(0.80 0.14 280)",
		accent: "oklch(0.78 0.18 300)",
		destructive: "oklch(0.65 0.20 20)",
		background: "oklch(0.16 0.01 290)",
	},
	"rose-pine": {
		primary: "oklch(0.72 0.12 15)",
		accent: "oklch(0.70 0.10 350)",
		destructive: "oklch(0.62 0.22 25)",
		background: "oklch(0.15 0.01 30)",
	},
	github: {
		primary: "oklch(0.65 0.18 250)",
		accent: "oklch(0.60 0.14 240)",
		destructive: "oklch(0.65 0.22 25)",
		background: "oklch(0.20 0.01 250)",
	},
};

// Legacy forwards — wrap old names to their replacements
presetTokens.akashic = presetTokens.nord;
presetTokens.martian = presetTokens.dracula;
presetTokens.alchemy = presetTokens.github;
presetTokens.druidic = presetTokens["rose-pine"];
presetTokens.obsidian = presetTokens.editorial;
presetTokens.contrast = presetTokens.github;

export function extendTheme(baseTheme: string, overrides: ExtendThemeOptions) {
	const base = presetTokens[baseTheme];
	if (!base) {
		console.warn(`Unknown theme: ${baseTheme}. Available: ${Object.keys(presetTokens).join(", ")}`);
		return createThemeBuilder({
			primary: overrides.primary ?? DRACULA_DEFAULTS.primary,
			...overrides,
		});
	}

	return createThemeBuilder({
		primary: overrides.primary ?? base.primary,
		accent: overrides.accent ?? base.accent,
		destructive: overrides.destructive ?? base.destructive,
		background: overrides.background ?? base.background,
		radius: overrides.radius,
		glassBlur: overrides.glassBlur,
	});
}
