export const colors = {
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
} as const;

export const fontFamily = {
	sans: ["Inter", "system-ui", "sans-serif"],
	display: ["Inter Display", "Inter", "system-ui", "sans-serif"],
	mono: ["JetBrains Mono", "ui-monospace", "SF Mono", "monospace"],
} as const;

export const borderRadius = {
	DEFAULT: "var(--radius)",
	xs: "var(--radius-xs)",
	sm: "var(--radius-sm)",
	md: "var(--radius-md)",
	lg: "var(--radius-lg)",
	xl: "var(--radius-xl)",
	pill: "var(--radius-pill)",
	full: "var(--radius-full)",
} as const;

export const boxShadow = {
	xs: "var(--shadow-xs)",
	sm: "var(--shadow-sm)",
	DEFAULT: "var(--shadow-sm)",
	md: "var(--shadow-md)",
	lg: "var(--shadow-lg)",
	xl: "var(--shadow-xl)",
	"2xl": "var(--shadow-2xl)",
	"glow-primary": "var(--shadow-glow-primary)",
	"glow-accent": "var(--shadow-glow-accent)",
	"glow-destructive": "var(--shadow-glow-destructive)",
	"glow-success": "var(--shadow-glow-success)",
	"glow-warning": "var(--shadow-glow-warning)",
	"glow-info": "var(--shadow-glow-info)",
	"emphasis-resolved": "var(--shadow-emphasis-resolved)",
	"inset-subtle": "var(--shadow-inset-subtle)",
} as const;

export const transitionDuration = {
	instant: "var(--duration-instant)",
	snappy: "var(--duration-snappy)",
	fluid: "var(--duration-fluid)",
	slow: "var(--duration-slow)",
} as const;

export const transitionTimingFunction = {
	standard: "var(--ease-standard)",
	emphasized: "var(--ease-emphasized)",
	decelerated: "var(--ease-decelerated)",
	accelerated: "var(--ease-accelerated)",
	spring: "var(--ease-spring)",
} as const;

export const zIndex = {
	base: "0",
	raised: "10",
	sidebar: "var(--z-sidebar)",
	overlay: "var(--z-overlay)",
	omnibar: "var(--z-omnibar)",
	popover: "var(--z-popover)",
	toast: "var(--z-toast)",
	tooltip: "var(--z-tooltip)",
} as const;

export const spacing = {
	"card-padding": "var(--card-padding, 1rem)",
} as const;

export const blur = {
	subtle: "var(--blur-subtle)",
	medium: "var(--blur-medium)",
	heavy: "var(--blur-heavy)",
	ultra: "var(--blur-ultra)",
} as const;

export const transitionDelay = {
	none: "var(--delay-none)",
	sm: "var(--delay-sm)",
	md: "var(--delay-md)",
	lg: "var(--delay-lg)",
	xl: "var(--delay-xl)",
} as const;
