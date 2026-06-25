import { DRACULA_DEFAULTS } from "./theme-defaults";
import { THEME_TOKENS } from "./theme-tokens";

type CreateThemeOptions =
	| { name: string; tokens: Record<string, string> }
	| { base: string; tokens: Record<string, string> };

function deriveFromPrimary(primary: string, lightnessOffset: number, chromaScale: number): string {
	const match = primary.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
	if (!match) return primary;
	const l = Math.max(0, Math.min(1, parseFloat(match[1]) + lightnessOffset));
	const c = parseFloat(match[2]) * chromaScale;
	const h = parseFloat(match[3]);
	return `oklch(${l.toFixed(2)} ${c.toFixed(3)} ${h})`;
}

const presetTokens = THEME_TOKENS;

export function createTheme(options: CreateThemeOptions) {
	const primary = options.tokens["--primary"];
	const accent = options.tokens["--accent"] ?? deriveFromPrimary(primary, -0.03, 1.2);
	const destructive = options.tokens["--destructive"] ?? DRACULA_DEFAULTS.destructive;

	const match = primary.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
	const hue = match ? match[3] : "290";

	let background = options.tokens["--background"];
	if (!background) {
		if ("base" in options) {
			const base = presetTokens[options.base];
			background = base?.["--background"] ?? `oklch(0.05 0.01 ${hue})`;
		} else {
			background = `oklch(0.05 0.01 ${hue})`;
		}
	}

	const foreground = `oklch(0.95 0.01 ${hue})`;
	const radius = options.tokens["--radius"] ?? "0.625rem";
	const glassBlur = options.tokens["--glass-blur"] ?? "16px";

	const card = `oklch(1 0 0 / 0.06)`;
	const cardForeground = foreground;
	const muted = `oklch(1 0 0 / 0.04)`;
	const mutedForeground = `oklch(0.55 0.03 ${hue})`;
	const secondary = `oklch(1 0 0 / 0.08)`;
	const secondaryForeground = foreground;
	const primaryForeground = deriveFromPrimary(primary, -0.55, 0.1);
	const accentForeground = deriveFromPrimary(accent, -0.55, 0.1);
	const destructiveForeground = "oklch(0.95 0 0)";
	const border = `oklch(1 0 0 / 0.08)`;
	const input = `oklch(1 0 0 / 0.06)`;
	const ring = primary;
	const glassSurface = `oklch(0 0 0 / 0.40)`;
	const glassBorder = border;

	const destructiveSoft = `oklch(0.62 0.22 25 / 0.12)`;
	const success = "oklch(0.65 0.2 145)";
	const successForeground = "oklch(0.95 0 0)";
	const successSoft = "oklch(0.65 0.2 145 / 0.12)";
	const warning = "oklch(0.80 0.18 85)";
	const warningForeground = "oklch(0.15 0.02 85)";
	const warningSoft = "oklch(0.80 0.18 85 / 0.12)";
	const info = "oklch(0.7 0.12 230)";
	const infoForeground = "oklch(0.95 0 0)";
	const infoSoft = "oklch(0.7 0.12 230 / 0.12)";

	const borderStrong = `oklch(1 0 0 / 0.2)`;
	const borderSubtle = `oklch(1 0 0 / 0.05)`;
	const overlay = "oklch(0 0 0 / 0.55)";
	const overlayStrong = "oklch(0 0 0 / 0.75)";

	const cardSolid = `oklch(0.17 0.008 ${hue})`;
	const surface1 = `oklch(0.16 0.008 ${hue})`;
	const surface2 = `oklch(0.19 0.008 ${hue})`;
	const surface3 = `oklch(0.22 0.008 ${hue})`;

	const radiusXs = "0.25rem";
	const radiusSm = "0.375rem";
	const radiusMd = radius;
	const radiusLg = "0.875rem";
	const radiusXl = "1.25rem";

	const shadowXs = "0 1px 2px oklch(0 0 0 / 0.04)";
	const shadowSm = "0 1px 0 oklch(0 0 0 / 0.04)";
	const shadowMd = "0 1px 0 oklch(0 0 0 / 0.06)";
	const shadowLg = "0 2px 4px oklch(0 0 0 / 0.08)";
	const shadowGlowPrimary = `0 0 15px oklch(from ${primary} l 0.3 h / 0.15)`;
	const shadowGlowDestructive = `0 0 15px oklch(from ${destructive} l 0.3 h / 0.15)`;
	const shadowEmphasisResolved = "var(--shadow-md)";

	const shadowXl = "0 8px 16px -4px oklch(0 0 0 / 0.12)";
	const shadow2xl = "0 16px 32px -8px oklch(0 0 0 / 0.18)";
	const shadowGlowAccent = `0 0 15px oklch(from ${accent} l 0.3 h / 0.15)`;
	const shadowGlowSuccess = "0 0 15px oklch(from oklch(0.65 0.2 145) l 0.3 h / 0.15)";
	const shadowGlowWarning = "0 0 15px oklch(from oklch(0.80 0.18 85) l 0.3 h / 0.15)";
	const shadowGlowInfo = "0 0 15px oklch(from oklch(0.7 0.12 230) l 0.3 h / 0.15)";

	const gradientAngle = "135deg";
	const gradientPrimary = `linear-gradient(${gradientAngle}, ${primary} 0%, ${deriveFromPrimary(primary, -0.08, 1)} 100%)`;
	const gradientAccent = `linear-gradient(${gradientAngle}, ${primary} 0%, ${accent} 100%)`;
	const gradientDestructive = `linear-gradient(${gradientAngle}, ${destructive} 0%, ${deriveFromPrimary(destructive, -0.08, 1)} 100%)`;
	const gradientSurface = "none";
	const gradientHero = "none";
	const gradientCard = "none";
	const gradientSidebar = "none";
	const gradientTextPrimary = `linear-gradient(${gradientAngle}, ${foreground} 30%, ${primary} 100%)`;
	const gradientTextAccent = `linear-gradient(${gradientAngle}, ${foreground} 30%, ${accent} 100%)`;

	const blurSubtle = "4px";
	const blurMedium = "8px";
	const blurHeavy = glassBlur;
	const blurUltra = "24px";

	const radiusPill = "9999px";
	const radiusFull = "50%";

	const textLineHeightTight = "1.2";
	const textLineHeightNormal = "1.5";
	const textLineHeightRelaxed = "1.65";
	const textLetterSpacingTight = "-0.02em";
	const textLetterSpacingNormal = "0";
	const textLetterSpacingWide = "0.02em";
	const textLetterSpacingWider = "0.05em";

	const delayNone = "0ms";
	const delaySm = "50ms";
	const delayMd = "100ms";
	const delayLg = "200ms";
	const delayXl = "400ms";

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

	const durationInstant = "50ms";
	const durationSnappy = "120ms";
	const durationFluid = "220ms";
	const durationSlow = "360ms";
	const easeStandard = "cubic-bezier(0.2, 0, 0, 1)";
	const easeEmphasized = "cubic-bezier(0.3, 0, 0, 1)";
	const easeDecelerated = "cubic-bezier(0, 0, 0, 1)";
	const easeAccelerated = "cubic-bezier(0.3, 0, 1, 1)";

	const tokens: Record<string, string> = {
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
		"--primary": primary,
		"--primary-foreground": primaryForeground,
		"--accent": accent,
		"--accent-foreground": accentForeground,
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
		"--border": border,
		"--border-strong": borderStrong,
		"--border-subtle": borderSubtle,
		"--input": input,
		"--ring": ring,
		"--overlay": overlay,
		"--overlay-strong": overlayStrong,
		"--glass-surface": glassSurface,
		"--glass-border": glassBorder,
		"--glass-blur": glassBlur,
		"--sidebar-background": `oklch(0.05 0.01 ${hue})`,
		"--sidebar-foreground": foreground,
		"--sidebar-primary": primary,
		"--sidebar-primary-foreground": primaryForeground,
		"--sidebar-secondary": `oklch(1 0 0 / 0.08)`,
		"--sidebar-secondary-foreground": foreground,
		"--sidebar-accent": `oklch(1 0 0 / 0.06)`,
		"--sidebar-accent-foreground": foreground,
		"--sidebar-border": border,
		"--sidebar-ring": ring,
		"--radius-xs": radiusXs,
		"--radius-sm": radiusSm,
		"--radius": radius,
		"--radius-md": radiusMd,
		"--radius-lg": radiusLg,
		"--radius-xl": radiusXl,
		"--card-padding": "1rem",
		"--shadow-xs": shadowXs,
		"--shadow-sm": shadowSm,
		"--shadow-md": shadowMd,
		"--shadow-lg": shadowLg,
		"--shadow-glow-primary": shadowGlowPrimary,
		"--shadow-glow-destructive": shadowGlowDestructive,
		"--shadow-emphasis-resolved": shadowEmphasisResolved,
		"--shadow-xl": shadowXl,
		"--shadow-2xl": shadow2xl,
		"--shadow-glow-accent": shadowGlowAccent,
		"--shadow-glow-success": shadowGlowSuccess,
		"--shadow-glow-warning": shadowGlowWarning,
		"--shadow-glow-info": shadowGlowInfo,
		"--duration-instant": durationInstant,
		"--duration-snappy": durationSnappy,
		"--duration-fluid": durationFluid,
		"--duration-slow": durationSlow,
		"--ease-standard": easeStandard,
		"--ease-emphasized": easeEmphasized,
		"--ease-decelerated": easeDecelerated,
		"--ease-accelerated": easeAccelerated,
		"--gradient-angle": gradientAngle,
		"--gradient-primary": gradientPrimary,
		"--gradient-accent": gradientAccent,
		"--gradient-destructive": gradientDestructive,
		"--gradient-surface": gradientSurface,
		"--gradient-hero": gradientHero,
		"--gradient-card": gradientCard,
		"--gradient-sidebar": gradientSidebar,
		"--gradient-text-primary": gradientTextPrimary,
		"--gradient-text-accent": gradientTextAccent,
		"--bg-gradient-hero": gradientHero,
		"--bg-gradient-card": gradientCard,
		"--bg-gradient-sidebar": gradientSidebar,
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
		"--blur-subtle": blurSubtle,
		"--blur-medium": blurMedium,
		"--blur-heavy": blurHeavy,
		"--blur-ultra": blurUltra,
		"--radius-pill": radiusPill,
		"--radius-full": radiusFull,
		"--text-line-height-tight": textLineHeightTight,
		"--text-line-height-normal": textLineHeightNormal,
		"--text-line-height-relaxed": textLineHeightRelaxed,
		"--text-letter-spacing-tight": textLetterSpacingTight,
		"--text-letter-spacing-normal": textLetterSpacingNormal,
		"--text-letter-spacing-wide": textLetterSpacingWide,
		"--text-letter-spacing-wider": textLetterSpacingWider,
		"--delay-none": delayNone,
		"--delay-sm": delaySm,
		"--delay-md": delayMd,
		"--delay-lg": delayLg,
		"--delay-xl": delayXl,
		"--button-treatment": "flat",
		"--button-bg": primary,
		"--button-bg-destructive": destructive,
		"--card-treatment": "solid",
		"--surface-texture": "none",
		"--hero-translate": "8px",
		"--shadow-emphasis": "low",
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
