// Pure function — no Svelte runes, no browser APIs
// Safe for SvelteKit +page.server.ts, +layout.server.ts, hooks, edge functions

import { THEME_TOKENS } from "./theme-tokens";

const THEMES = THEME_TOKENS;

const DENSITY: Record<string, Record<string, string>> = {
	compact: {
		"--space-1": "0.2rem",
		"--space-2": "0.4rem",
		"--space-3": "0.6rem",
		"--space-4": "0.8rem",
		"--space-6": "1.2rem",
		"--space-8": "1.6rem",
	},
	comfortable: {
		"--space-1": "0.25rem",
		"--space-2": "0.5rem",
		"--space-3": "0.75rem",
		"--space-4": "1rem",
		"--space-6": "1.5rem",
		"--space-8": "2rem",
	},
	spacious: {
		"--space-1": "0.3125rem",
		"--space-2": "0.625rem",
		"--space-3": "0.9375rem",
		"--space-4": "1.25rem",
		"--space-6": "1.875rem",
		"--space-8": "2.5rem",
	},
};

type Options = {
	density?: "compact" | "comfortable" | "spacious";
	overrides?: Record<string, string>;
};

export function createServerTheme(name: string, options: Options = {}) {
	const base = THEMES[name] ?? THEMES.editorial;
	const density = DENSITY[options.density ?? "comfortable"];
	const tokens = { ...density, ...base, ...options.overrides };

	function toCSS(selector?: string): string {
		const sel = selector ?? `[data-theme="${name}"]`;
		const body = Object.entries(tokens)
			.map(([k, v]) => `  ${k}: ${v};`)
			.join("\n");
		return `${sel} {\n${body}\n}`;
	}

	return { tokens, toCSS };
}
