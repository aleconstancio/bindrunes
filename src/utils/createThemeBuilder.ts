import { DRACULA_DEFAULTS } from "./theme-defaults";

type ThemeBuilderOptions = {
	primary: string; // OKLCH color string
	accent?: string; // defaults to primary with shifted hue
	destructive?: string; // defaults to oklch(0.65 0.24 30)
	background?: string; // defaults to derived
	radius?: string; // defaults to 0.625rem
	glassBlur?: string; // defaults to 16px
	mode?: "light" | "dark"; // defaults to 'dark'
};

function deriveFromPrimary(primary: string, lightnessOffset: number, chromaScale: number): string {
	// Parse OKLCH: oklch(L C H)
	const match = primary.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
	if (!match) return primary;
	const l = Math.max(0, Math.min(1, parseFloat(match[1]) + lightnessOffset));
	const c = parseFloat(match[2]) * chromaScale;
	const h = parseFloat(match[3]);
	return `oklch(${l.toFixed(2)} ${c.toFixed(3)} ${h})`;
}

export function createThemeBuilder(options: ThemeBuilderOptions) {
	const isLight = options.mode === "light";
	const primary = options.primary;
	const accent = options.accent ?? deriveFromPrimary(primary, -0.03, 1.2);
	const destructive = options.destructive ?? DRACULA_DEFAULTS.destructive;

	// Extract hue if possible to use for pure color-shifted bases
	const match = primary.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
	const hue = match ? match[3] : "290";

	const background =
		options.background ?? (isLight ? `oklch(0.98 0.01 ${hue})` : `oklch(0.05 0.01 ${hue})`);

	const foreground = isLight ? `oklch(0.15 0.02 ${hue})` : `oklch(0.95 0.01 ${hue})`;

	const radius = options.radius ?? "0.625rem";
	const glassBlur = options.glassBlur ?? "16px";

	// Derive other tokens based on mode
	const card = isLight ? `oklch(1 0 0 / 0.80)` : `oklch(1 0 0 / 0.06)`;

	const cardForeground = foreground;

	const muted = isLight ? `oklch(0 0 0 / 0.04)` : `oklch(1 0 0 / 0.04)`;

	const mutedForeground = isLight ? `oklch(0.45 0.02 ${hue})` : `oklch(0.55 0.03 ${hue})`;

	const secondary = isLight ? `oklch(0 0 0 / 0.06)` : `oklch(1 0 0 / 0.08)`;

	const secondaryForeground = foreground;

	const primaryForeground = isLight ? `oklch(0.99 0 0)` : deriveFromPrimary(primary, -0.55, 0.1);

	const accentForeground = isLight ? `oklch(0.99 0 0)` : deriveFromPrimary(accent, -0.55, 0.1);

	const destructiveForeground = "oklch(0.95 0 0)";

	const border = isLight ? `oklch(0 0 0 / 0.08)` : `oklch(1 0 0 / 0.08)`;

	const input = isLight ? `oklch(0 0 0 / 0.04)` : `oklch(1 0 0 / 0.06)`;

	const ring = primary;
	const glassSurface = isLight ? `oklch(1 0 0 / 0.70)` : `oklch(0 0 0 / 0.40)`;

	const glassBorder = border;

	const tokens = {
		"--background": background,
		"--foreground": foreground,
		"--card": card,
		"--card-foreground": cardForeground,
		"--muted": muted,
		"--muted-foreground": mutedForeground,
		"--secondary": secondary,
		"--secondary-foreground": secondaryForeground,
		"--primary": primary,
		"--primary-foreground": primaryForeground,
		"--accent": accent,
		"--accent-foreground": accentForeground,
		"--destructive": destructive,
		"--destructive-foreground": destructiveForeground,
		"--border": border,
		"--input": input,
		"--ring": ring,
		"--glass-surface": glassSurface,
		"--glass-border": glassBorder,
		"--success": "oklch(0.65 0.2 145)",
		"--success-foreground": isLight ? "oklch(0.15 0 0)" : "oklch(0.95 0 0)",
		"--warning": "oklch(0.80 0.18 85)",
		"--warning-foreground": "oklch(0.15 0.02 85)",
		"--sidebar-background": isLight ? `oklch(0.98 0.01 ${hue})` : `oklch(0.05 0.01 ${hue})`,
		"--sidebar-foreground": foreground,
		"--sidebar-primary": primary,
		"--sidebar-primary-foreground": primaryForeground,
		"--sidebar-secondary": isLight ? `oklch(0 0 0 / 0.06)` : `oklch(1 0 0 / 0.08)`,
		"--sidebar-secondary-foreground": foreground,
		"--sidebar-accent": isLight ? `oklch(0 0 0 / 0.04)` : `oklch(1 0 0 / 0.06)`,
		"--sidebar-accent-foreground": foreground,
		"--sidebar-border": border,
		"--sidebar-ring": ring,
		"--radius": radius,
		"--glass-blur": glassBlur,
	};

	const cssText = Object.entries(tokens)
		.map(([key, value]) => `  ${key}: ${value};`)
		.join("\n");

	function apply(target: HTMLElement = document.documentElement) {
		for (const [key, value] of Object.entries(tokens)) {
			target.style.setProperty(key, value);
		}
	}

	function toCSS(selector = ":root"): string {
		return `${selector} {\n${cssText}\n}`;
	}

	return {
		tokens,
		cssText,
		apply,
		toCSS,
	};
}
