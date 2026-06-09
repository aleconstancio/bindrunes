import { createStorage } from "./createStorage";

const THEMES = ["editorial", "dracula", "nord", "catppuccin", "rose-pine", "github"] as const;
export type Theme = (typeof THEMES)[number];

export function createTheme(options?: { default?: Theme }) {
	const storage = createStorage("bindrunes");
	const defaultTheme = options?.default ?? "editorial";
	let theme = $state<Theme>((storage.get<string>("theme") as Theme) ?? defaultTheme);

	$effect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		storage.set("theme", theme);
	});

	return {
		get theme() {
			return theme;
		},
		setTheme(t: Theme) {
			theme = t;
		},
		themes: THEMES,
	};
}
