// Pure function — no Svelte runes, no browser APIs
// Safe for SvelteKit +page.server.ts, +layout.server.ts, hooks, edge functions

const THEMES: Record<string, Record<string, string>> = {
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
		"--primary": "oklch(0.75 0.21 310)",
		"--accent": "oklch(0.72 0.30 340)",
		"--destructive": "oklch(0.65 0.24 30)",
		"--background": "oklch(0.05 0.01 290)",
		"--foreground": "oklch(0.95 0.01 290)",
		"--card-solid": "oklch(0.1 0.015 290)",
		"--border": "oklch(1 0 0 / 0.08)",
		"--ring": "oklch(0.75 0.21 310)",
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
