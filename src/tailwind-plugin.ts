// src/tailwind-plugin.ts
//
// This plugin provides bindrunes design tokens and utility classes for Tailwind CSS v4.
// Most token bindings (color, font, shadow, ease) are also declared in
// src/styles/preset.css via @theme inline — the plugin duplicates them so consumers
// using the plugin WITHOUT importing preset.css still get working utilities.
//
// v1.0 changes:
//   - Added new color tokens (info, soft-state, overlay, border-strong/subtle, surfaces)
//   - Added font-display, font-mono
//   - Added transitionDuration: instant
//   - Renamed thoth-* keyframe references to bindrunes-* (to be done in utilities.css)
//   - Updated mono utility to use --font-mono
import type { Config } from "tailwindcss";

const plugin = {
	name: "bindrunes",
	config: {
		theme: {
			extend: {
				colors: {
					background: "var(--background)",
					foreground: "var(--foreground)",
					card: {
						DEFAULT: "var(--card)",
						foreground: "var(--card-foreground)",
						solid: "var(--card-solid)",
					},
					"surface-1": "var(--surface-1)",
					"surface-2": "var(--surface-2)",
					"surface-3": "var(--surface-3)",
					primary: {
						DEFAULT: "var(--primary)",
						foreground: "var(--primary-foreground)",
					},
					secondary: {
						DEFAULT: "var(--secondary)",
						foreground: "var(--secondary-foreground)",
					},
					muted: {
						DEFAULT: "var(--muted)",
						foreground: "var(--muted-foreground)",
					},
					accent: {
						DEFAULT: "var(--accent)",
						foreground: "var(--accent-foreground)",
					},
					destructive: {
						DEFAULT: "var(--destructive)",
						foreground: "var(--destructive-foreground)",
						soft: "var(--destructive-soft)",
					},
					success: {
						DEFAULT: "var(--success)",
						foreground: "var(--success-foreground)",
						soft: "var(--success-soft)",
					},
					warning: {
						DEFAULT: "var(--warning)",
						foreground: "var(--warning-foreground)",
						soft: "var(--warning-soft)",
					},
					info: {
						DEFAULT: "var(--info)",
						foreground: "var(--info-foreground)",
						soft: "var(--info-soft)",
					},
					border: "var(--border)",
					"border-strong": "var(--border-strong)",
					"border-subtle": "var(--border-subtle)",
					input: "var(--input)",
					ring: "var(--ring)",
					overlay: "var(--overlay)",
					"overlay-strong": "var(--overlay-strong)",
					"glass-surface": "var(--glass-surface)",
					"glass-border": "var(--glass-border)",
					sidebar: {
						DEFAULT: "var(--sidebar-background)",
						foreground: "var(--sidebar-foreground)",
						primary: "var(--sidebar-primary)",
						"primary-foreground": "var(--sidebar-primary-foreground)",
						accent: "var(--sidebar-accent)",
						"accent-foreground": "var(--sidebar-accent-foreground)",
						border: "var(--sidebar-border)",
						ring: "var(--sidebar-ring)",
					},
				},
				fontFamily: {
					sans: ["Inter", "system-ui", "sans-serif"],
					display: ["Inter Display", "Inter", "system-ui", "sans-serif"],
					mono: ["JetBrains Mono", "ui-monospace", "SF Mono", "monospace"],
				},
				borderRadius: {
					DEFAULT: "var(--radius)",
					xs: "var(--radius-xs)",
					sm: "var(--radius-sm)",
					md: "var(--radius-md)",
					lg: "var(--radius-lg)",
					xl: "var(--radius-xl)",
				},
				boxShadow: {
					xs: "var(--shadow-xs)",
					sm: "var(--shadow-sm)",
					DEFAULT: "var(--shadow-sm)",
					md: "var(--shadow-md)",
					lg: "var(--shadow-lg)",
					"glow-primary": "var(--shadow-glow-primary)",
					"glow-destructive": "var(--shadow-glow-destructive)",
					"inset-subtle": "var(--shadow-inset-subtle)",
				},
				transitionDuration: {
					instant: "var(--duration-instant)",
					snappy: "var(--duration-snappy)",
					fluid: "var(--duration-fluid)",
					slow: "var(--duration-slow)",
				},
				transitionTimingFunction: {
					standard: "var(--ease-standard)",
					emphasized: "var(--ease-emphasized)",
					decelerated: "var(--ease-decelerated)",
					accelerated: "var(--ease-accelerated)",
					spring: "var(--ease-spring)",
				},
				zIndex: {
					base: "0",
					raised: "10",
					sidebar: "var(--z-sidebar)",
					overlay: "var(--z-overlay)",
					popover: "35",
					toast: "var(--z-toast)",
					omnibar: "var(--z-omnibar)",
					tooltip: "60",
				},
			},
		},
		plugins: [
			({ addUtilities }: { addUtilities: (utilities: Record<string, any>) => void }) => {
				addUtilities({
					".glass-panel": {
						background: "var(--glass-surface, oklch(1 0 0 / 0.04))",
						"backdrop-filter": "blur(var(--glass-blur, 16px))",
						"-webkit-backdrop-filter": "blur(var(--glass-blur, 16px))",
						border: "1px solid var(--glass-border, oklch(1 0 0 / 0.08))",
						"border-radius": "var(--radius, 0.5rem)",
						transition:
							"border-color var(--duration-snappy, 120ms), background-color var(--duration-snappy, 120ms), box-shadow var(--duration-snappy, 120ms), transform var(--duration-snappy, 120ms)",
					},
					".glass-interactive": {
						cursor: "pointer",
					},
					".glass-interactive:hover": {
						"box-shadow": "0 0 30px oklch(from var(--primary, oklch(0.65 0.10 265)) l c h / 0.20)",
						transform: "translateY(-2px)",
					},
					".text-gradient-violet": {
						background:
							"linear-gradient(135deg, var(--foreground, oklch(0.96 0.005 270)) 30%, var(--primary, oklch(0.65 0.10 265)) 100%)",
						"-webkit-background-clip": "text",
						"-webkit-text-fill-color": "transparent",
					},
					".text-gradient-gold": {
						background:
							"linear-gradient(135deg, var(--foreground, oklch(0.96 0.005 270)) 30%, var(--warning, oklch(0.80 0.16 80)) 100%)",
						"-webkit-background-clip": "text",
						"-webkit-text-fill-color": "transparent",
					},
					".mono": {
						"font-family": 'var(--font-mono, "JetBrains Mono", ui-monospace, monospace)',
					},
					".animate-pulse-glow": {
						animation: "bindrunes-pulse-glow 3s infinite ease-in-out",
					},
					".section-reveal": {
						animation:
							"fade-slide-in 0.7s var(--ease-standard, cubic-bezier(0.2, 0, 0, 1)) forwards",
					},
				});
			},
		],
	} satisfies Config,
};

export default plugin;
