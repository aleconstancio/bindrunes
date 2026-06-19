import { createPersistedDataAttribute } from "./createPersistedDataAttribute.svelte";

const THEMES = ["editorial", "dracula", "nord", "catppuccin", "rose-pine", "github"] as const;
export type Theme = (typeof THEMES)[number];

export function createTheme(options?: { default?: Theme }) {
	const state = createPersistedDataAttribute({
		storageKey: "theme",
		attributeName: "data-theme",
		values: THEMES,
		default: options?.default ?? "editorial",
	});

	return {
		get theme() {
			return state.value;
		},
		setTheme(t: Theme) {
			state.setValue(t);
		},
		themes: THEMES,
	};
}
