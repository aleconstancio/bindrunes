export interface DemoNavLink {
	label: string;
	href: string;
}

export interface DemoFooterLink {
	label: string;
	href: string;
}

export interface DemoFooterConfig {
	links?: DemoFooterLink[];
	copyright?: string;
	bottomLinks?: DemoFooterLink[];
}

export type ShellMode = "default" | "landing" | "none";
export type ThemePreset = "editorial" | "dracula" | "nord" | "catppuccin" | "rose-pine" | "github";
export type AestheticPreset = "minimal" | "glass" | "bento" | "expressive";
export type DensityPreset = "compact" | "comfortable" | "spacious";
