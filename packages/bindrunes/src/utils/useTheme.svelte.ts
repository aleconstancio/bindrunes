import { mode, setMode, toggleMode } from "mode-watcher";
import { createPersistedDataAttribute } from "./createPersistedDataAttribute.svelte";
import { isBrowser } from "./isBrowser";

const THEMES = ["editorial", "dracula", "nord", "catppuccin", "rose-pine", "github"] as const;
export type Theme = (typeof THEMES)[number];

export function useTheme(options?: { default?: Theme }) {
	const state = createPersistedDataAttribute({
		storageKey: "theme",
		attributeName: "data-theme",
		values: THEMES,
		default: options?.default ?? "editorial",
	});

	let currentMode = $state<"light" | "dark" | undefined>(undefined);

	if (isBrowser) {
		mode.subscribe((v) => {
			currentMode = v;
		});
	}

	return {
		get theme() {
			return state.value;
		},
		setTheme(t: Theme) {
			state.setValue(t);
		},
		themes: THEMES,
		get isDark() {
			return currentMode === "dark";
		},
		get mode() {
			return currentMode;
		},
		toggleMode,
		setMode: (m: "light" | "dark") => setMode(m),
	};
}
