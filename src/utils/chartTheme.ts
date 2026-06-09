const EDITORIAL_DEFAULTS = {
	primary: "oklch(0.65 0.10 265)",
	accent: "oklch(0.62 0.13 285)",
	destructive: "oklch(0.62 0.22 25)",
	background: "oklch(0.13 0.01 270)",
};

export function getChartTheme() {
	if (typeof document === "undefined") {
		return {
			primary: EDITORIAL_DEFAULTS.primary,
			accent: EDITORIAL_DEFAULTS.accent,
			destructive: EDITORIAL_DEFAULTS.destructive,
			muted: "oklch(0.65 0.012 270)",
			background: EDITORIAL_DEFAULTS.background,
		};
	}
	const style = getComputedStyle(document.documentElement);
	return {
		primary: style.getPropertyValue("--primary").trim() || EDITORIAL_DEFAULTS.primary,
		accent: style.getPropertyValue("--accent").trim() || EDITORIAL_DEFAULTS.accent,
		destructive: style.getPropertyValue("--destructive").trim() || EDITORIAL_DEFAULTS.destructive,
		muted: style.getPropertyValue("--muted-foreground").trim() || "oklch(0.65 0.012 270)",
		background: style.getPropertyValue("--background").trim() || EDITORIAL_DEFAULTS.background,
	};
}
