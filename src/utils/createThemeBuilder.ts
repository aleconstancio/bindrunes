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

	// Derived state colors
	const destructiveSoft = isLight ? `oklch(0.62 0.22 25 / 0.12)` : `oklch(0.62 0.22 25 / 0.12)`;
	const success = "oklch(0.65 0.2 145)";
	const successForeground = isLight ? "oklch(0.15 0 0)" : "oklch(0.95 0 0)";
	const successSoft = "oklch(0.65 0.2 145 / 0.12)";
	const warning = "oklch(0.80 0.18 85)";
	const warningForeground = "oklch(0.15 0.02 85)";
	const warningSoft = "oklch(0.80 0.18 85 / 0.12)";
	const info = "oklch(0.7 0.12 230)";
	const infoForeground = isLight ? "oklch(0.15 0 0)" : "oklch(0.95 0 0)";
	const infoSoft = "oklch(0.7 0.12 230 / 0.12)";

	// Borders
	const borderStrong = isLight ? `oklch(0 0 0 / 0.2)` : `oklch(1 0 0 / 0.2)`;
	const borderSubtle = isLight ? `oklch(0 0 0 / 0.05)` : `oklch(1 0 0 / 0.05)`;

	// Overlays
	const overlay = "oklch(0 0 0 / 0.55)";
	const overlayStrong = "oklch(0 0 0 / 0.75)";

	// Surfaces
	const cardSolid = isLight ? `oklch(0.97 0.008 ${hue})` : `oklch(0.17 0.008 ${hue})`;
	const surface1 = isLight ? `oklch(0.96 0.008 ${hue})` : `oklch(0.16 0.008 ${hue})`;
	const surface2 = isLight ? `oklch(0.94 0.008 ${hue})` : `oklch(0.19 0.008 ${hue})`;
	const surface3 = isLight ? `oklch(0.92 0.008 ${hue})` : `oklch(0.22 0.008 ${hue})`;

	// Radius scale
	const radiusXs = "0.25rem";
	const radiusSm = "0.375rem";
	const radiusMd = radius;
	const radiusLg = "0.875rem";
	const radiusXl = "1.25rem";

	// Shadows
	const shadowXs = "0 1px 2px oklch(0 0 0 / 0.04)";
	const shadowSm = "0 1px 0 oklch(0 0 0 / 0.04)";
	const shadowMd = "0 1px 0 oklch(0 0 0 / 0.06)";
	const shadowLg = "0 2px 4px oklch(0 0 0 / 0.08)";
	const shadowGlowPrimary = `0 0 15px oklch(from ${primary} l 0.3 h / 0.15)`;
	const shadowGlowDestructive = `0 0 15px oklch(from ${destructive} l 0.3 h / 0.15)`;
	const shadowEmphasisResolved = "var(--shadow-md)";

	// Spacing
	const space0 = "0";
	const space1 = "0.25rem";
	const space2 = "0.5rem";
	const space3 = "0.75rem";
	const space4 = "1rem";
	const space5 = "1.25rem";
	const space6 = "1.5rem";
	const space8 = "2rem";
	const space10 = "3rem";
	const space12 = "4rem";
	const space16 = "5rem";
	const space20 = "6rem";

	// Motion
	const durationInstant = "50ms";
	const durationSnappy = "120ms";
	const durationFluid = "220ms";
	const durationSlow = "360ms";
	const easeStandard = "cubic-bezier(0.2, 0, 0, 1)";
	const easeEmphasized = "cubic-bezier(0.3, 0, 0, 1)";
	const easeDecelerated = "cubic-bezier(0, 0, 0, 1)";
	const easeAccelerated = "cubic-bezier(0.3, 0, 1, 1)";

	// Aesthetic hooks
	const buttonTreatment = "flat";
	const buttonBg = primary;
	const buttonBgDestructive = destructive;
	const cardTreatment = "solid";
	const surfaceTexture = "none";
	const heroTranslate = "8px";
	const shadowEmphasis = "low";

	const tokens: Record<string, string> = {
		// Surfaces
		"--background": background,
		"--foreground": foreground,
		"--card": card,
		"--card-foreground": cardForeground,
		"--card-solid": cardSolid,
		"--surface-1": surface1,
		"--surface-2": surface2,
		"--surface-3": surface3,
		"--muted": muted,
		"--muted-foreground": mutedForeground,
		"--secondary": secondary,
		"--secondary-foreground": secondaryForeground,
		// Accents
		"--primary": primary,
		"--primary-foreground": primaryForeground,
		"--accent": accent,
		"--accent-foreground": accentForeground,
		// State colors
		"--destructive": destructive,
		"--destructive-foreground": destructiveForeground,
		"--destructive-soft": destructiveSoft,
		"--success": success,
		"--success-foreground": successForeground,
		"--success-soft": successSoft,
		"--warning": warning,
		"--warning-foreground": warningForeground,
		"--warning-soft": warningSoft,
		"--info": info,
		"--info-foreground": infoForeground,
		"--info-soft": infoSoft,
		// Borders & inputs
		"--border": border,
		"--border-strong": borderStrong,
		"--border-subtle": borderSubtle,
		"--input": input,
		"--ring": ring,
		// Overlays
		"--overlay": overlay,
		"--overlay-strong": overlayStrong,
		// Glass
		"--glass-surface": glassSurface,
		"--glass-border": glassBorder,
		"--glass-blur": glassBlur,
		// Sidebar
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
		// Radius scale
		"--radius-xs": radiusXs,
		"--radius-sm": radiusSm,
		"--radius": radius,
		"--radius-md": radiusMd,
		"--radius-lg": radiusLg,
		"--radius-xl": radiusXl,
		// Component-specific
		"--card-padding": "1rem",
		// Shadows
		"--shadow-xs": shadowXs,
		"--shadow-sm": shadowSm,
		"--shadow-md": shadowMd,
		"--shadow-lg": shadowLg,
		"--shadow-glow-primary": shadowGlowPrimary,
		"--shadow-glow-destructive": shadowGlowDestructive,
		"--shadow-emphasis-resolved": shadowEmphasisResolved,
		// Motion durations
		"--duration-instant": durationInstant,
		"--duration-snappy": durationSnappy,
		"--duration-fluid": durationFluid,
		"--duration-slow": durationSlow,
		// Motion easings
		"--ease-standard": easeStandard,
		"--ease-emphasized": easeEmphasized,
		"--ease-decelerated": easeDecelerated,
		"--ease-accelerated": easeAccelerated,
		// Spacing scale
		"--space-0": space0,
		"--space-1": space1,
		"--space-2": space2,
		"--space-3": space3,
		"--space-4": space4,
		"--space-5": space5,
		"--space-6": space6,
		"--space-8": space8,
		"--space-10": space10,
		"--space-12": space12,
		"--space-16": space16,
		"--space-20": space20,
		// Aesthetic hooks
		"--button-treatment": buttonTreatment,
		"--button-bg": buttonBg,
		"--button-bg-destructive": buttonBgDestructive,
		"--card-treatment": cardTreatment,
		"--surface-texture": surfaceTexture,
		"--hero-translate": heroTranslate,
		"--shadow-emphasis": shadowEmphasis,
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
