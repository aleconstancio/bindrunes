import {
	blur,
	borderRadius,
	boxShadow,
	colors,
	fontFamily,
	spacing,
	transitionDelay,
	transitionDuration,
	transitionTimingFunction,
	zIndex,
} from "@bindrunes/tokens/tailwind-map";
import type { Config } from "tailwindcss";

const urupeUiConfig = {
	theme: {
		extend: {
			colors,
			fontFamily,
			borderRadius,
			boxShadow,
			transitionDuration,
			transitionTimingFunction,
			zIndex,
			spacing,
			blur,
			transitionDelay,
		},
	},
} satisfies Config;

function urupeUiPlugin({
	addUtilities,
}: {
	addUtilities: (utilities: Record<string, Record<string, string>>) => void;
}) {
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
			background: "var(--gradient-text-primary)",
			"-webkit-background-clip": "text",
			"-webkit-text-fill-color": "transparent",
		},
		".text-gradient-gold": {
			background: "var(--gradient-text-accent)",
			"-webkit-background-clip": "text",
			"-webkit-text-fill-color": "transparent",
		},
		".mono": {
			"font-family": 'var(--font-mono, "JetBrains Mono", ui-monospace, monospace)',
		},
		".animate-pulse-glow": {
			animation: "urupe-ui-pulse-glow 3s infinite ease-in-out",
		},
		".section-reveal": {
			animation: "fade-slide-in 0.7s var(--ease-standard, cubic-bezier(0.2, 0, 0, 1)) forwards",
		},
		".bg-gradient-primary": {
			background: "var(--gradient-primary)",
		},
		".bg-gradient-accent": {
			background: "var(--gradient-accent)",
		},
		".bg-gradient-hero": {
			background: "var(--gradient-hero)",
		},
		".bg-gradient-surface": {
			background: "var(--gradient-surface)",
		},
		".icon-circle-sm": {
			display: "inline-flex",
			"align-items": "center",
			"justify-content": "center",
			width: "2rem",
			height: "2rem",
			"border-radius": "0.5rem",
		},
		".icon-circle-md": {
			display: "inline-flex",
			"align-items": "center",
			"justify-content": "center",
			width: "2.5rem",
			height: "2.5rem",
			"border-radius": "0.5rem",
		},
		".icon-circle-lg": {
			display: "inline-flex",
			"align-items": "center",
			"justify-content": "center",
			width: "3rem",
			height: "3rem",
			"border-radius": "0.75rem",
		},
		".hover-lift": {
			transition: "transform 0.2s ease, box-shadow 0.2s ease",
		},
		".hover-lift:hover": {
			transform: "translateY(-2px)",
			"box-shadow": "var(--shadow-lg)",
		},
	});
}

const plugin = Object.assign(urupeUiPlugin, {
	config: urupeUiConfig,
});

export default plugin;
