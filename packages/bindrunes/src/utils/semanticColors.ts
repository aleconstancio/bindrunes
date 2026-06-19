export const semanticColors = {
	success: {
		bg: "bg-success-soft",
		text: "text-success",
		border: "border-success/30",
		cssVar: "var(--success)",
		dot: "bg-success",
	},
	warning: {
		bg: "bg-warning-soft",
		text: "text-warning",
		border: "border-warning/30",
		cssVar: "var(--warning)",
		dot: "bg-warning",
	},
	destructive: {
		bg: "bg-destructive-soft",
		text: "text-destructive",
		border: "border-destructive/30",
		cssVar: "var(--destructive)",
		dot: "bg-destructive",
	},
	info: {
		bg: "bg-info-soft",
		text: "text-info",
		border: "border-info/30",
		cssVar: "var(--info)",
		dot: "bg-info",
	},
	neutral: {
		bg: "bg-muted",
		text: "text-muted-foreground",
		border: "border-border",
		cssVar: "var(--muted-foreground)",
		dot: "bg-muted-foreground",
	},
} as const;

export type SemanticColor = keyof typeof semanticColors;
