import { type App, type InjectionKey, inject, type Ref, ref, watch } from "vue";

type Theme = "editorial" | "dracula" | "nord" | "catppuccin" | "rose-pine" | "github";
type Aesthetic = "minimal" | "glass" | "bento" | "expressive" | "neon" | "brutalist" | "organic";
type Density = "compact" | "comfortable" | "spacious";

export interface BindrunesState {
	theme: Ref<Theme>;
	aesthetic: Ref<Aesthetic>;
	density: Ref<Density>;
	setTheme: (t: Theme) => void;
	setAesthetic: (a: Aesthetic) => void;
	setDensity: (d: Density) => void;
}

export const BindrunesKey: InjectionKey<BindrunesState> = Symbol("bindrunes");

export interface BindrunesPluginOptions {
	theme?: Theme;
	aesthetic?: Aesthetic;
	density?: Density;
}

export function createBindrunesPlugin(options?: BindrunesPluginOptions) {
	const theme = ref<Theme>(options?.theme ?? "editorial");
	const aesthetic = ref<Aesthetic>(options?.aesthetic ?? "minimal");
	const density = ref<Density>(options?.density ?? "comfortable");

	watch(
		[theme, aesthetic, density],
		([t, a, d]) => {
			const root = document.documentElement;
			root.setAttribute("data-theme", t);
			root.setAttribute("data-aesthetic", a);
			root.setAttribute("data-density", d);
		},
		{ immediate: true },
	);

	return {
		install(app: App) {
			app.provide(BindrunesKey, {
				theme,
				aesthetic,
				density,
				setTheme: (t: Theme) => {
					theme.value = t;
				},
				setAesthetic: (a: Aesthetic) => {
					aesthetic.value = a;
				},
				setDensity: (d: Density) => {
					density.value = d;
				},
			});
		},
	};
}

export function useBindrunes(): BindrunesState {
	const state = inject(BindrunesKey);
	if (!state) throw new Error("useBindrunes must be used within a BindrunesProvider");
	return state;
}
