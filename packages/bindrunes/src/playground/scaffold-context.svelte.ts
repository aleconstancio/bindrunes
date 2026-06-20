import { createMetaContext, useMetaContext } from "../../utils/createMetaContext.svelte";
import type {
	AestheticPreset,
	DemoFooterConfig,
	DemoNavLink,
	DensityPreset,
	ShellMode,
	ThemePreset,
} from "./scaffold-types";

const KEY = Symbol("scaffold");

export interface DemoState {
	readonly title: string;
	readonly description: string;
	readonly nav: DemoNavLink[];
	readonly footer: DemoFooterConfig;
	readonly shell: ShellMode;
	readonly theme: ThemePreset;
	readonly aesthetic: AestheticPreset;
	readonly density: DensityPreset;
	readonly showThemeToggle: boolean;
}

export function createDemoState(config: {
	title?: string;
	description?: string;
	nav?: DemoNavLink[];
	footer?: DemoFooterConfig;
	shell?: ShellMode;
	theme?: ThemePreset;
	aesthetic?: AestheticPreset;
	density?: DensityPreset;
	showThemeToggle?: boolean;
}): DemoState {
	const state: DemoState = {
		get title() {
			return config.title ?? "bindrunes Demo";
		},
		get description() {
			return config.description ?? "Component demo for bindrunes";
		},
		get nav() {
			return config.nav ?? [];
		},
		get footer() {
			return config.footer ?? {};
		},
		get shell() {
			return config.shell ?? "default";
		},
		get theme() {
			return config.theme ?? "editorial";
		},
		get aesthetic() {
			return config.aesthetic ?? "editorial";
		},
		get density() {
			return config.density ?? "comfortable";
		},
		get showThemeToggle() {
			return config.showThemeToggle ?? true;
		},
	};

	return createMetaContext(KEY, () => state);
}

export function useDemo(): DemoState {
	return useMetaContext<DemoState>(KEY);
}
