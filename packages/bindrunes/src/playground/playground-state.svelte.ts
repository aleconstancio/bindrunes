// packages/bindrunes/src/playground/playground-state.svelte.ts

import { isBrowser } from "../utils/isBrowser";

export interface PlaygroundState {
	component: string;
	props: Record<string, unknown>;
	theme: string;
	aesthetic: string;
	density: string;
	previewMode: "desktop" | "tablet" | "mobile";
}

function encodeState(state: PlaygroundState): string {
	const params = new URLSearchParams();
	params.set("c", state.component);
	params.set("t", state.theme);
	params.set("a", state.aesthetic);
	params.set("d", state.density);
	params.set("p", state.previewMode);

	const propsJson = JSON.stringify(state.props);
	if (propsJson !== "{}") {
		params.set("props", btoa(propsJson));
	}

	return params.toString();
}

function decodeState(search: string): Partial<PlaygroundState> {
	const params = new URLSearchParams(search);
	const state: Partial<PlaygroundState> = {};

	const c = params.get("c");
	const t = params.get("t");
	const a = params.get("a");
	const d = params.get("d");
	const p = params.get("p");
	const props = params.get("props");

	if (c) state.component = c;
	if (t) state.theme = t;
	if (a) state.aesthetic = a;
	if (d) state.density = d;
	if (p) state.previewMode = p as PlaygroundState["previewMode"];

	if (props) {
		try {
			state.props = JSON.parse(atob(props));
		} catch {
			state.props = {};
		}
	}

	return state;
}

export function createPlaygroundState(defaults: Partial<PlaygroundState> = {}) {
	let state = $state<PlaygroundState>({
		component: defaults.component ?? "Button",
		props: defaults.props ?? {},
		theme: defaults.theme ?? "editorial",
		aesthetic: defaults.aesthetic ?? "minimal",
		density: defaults.density ?? "comfortable",
		previewMode: defaults.previewMode ?? "desktop",
	});

	if (isBrowser) {
		const urlState = decodeState(window.location.search);
		if (urlState.component) state.component = urlState.component;
		if (urlState.props) state.props = urlState.props;
		if (urlState.theme) state.theme = urlState.theme;
		if (urlState.aesthetic) state.aesthetic = urlState.aesthetic;
		if (urlState.density) state.density = urlState.density;
		if (urlState.previewMode) state.previewMode = urlState.previewMode;
	}

	$effect(() => {
		if (isBrowser) {
			const search = encodeState(state);
			const url = new URL(window.location.href);
			url.search = search;
			window.history.replaceState({}, "", url.toString());
		}
	});

	return {
		get current() {
			return state;
		},
		setComponent(name: string) {
			state.component = name;
			state.props = {};
		},
		setProp(key: string, value: unknown) {
			state.props = { ...state.props, [key]: value };
		},
		setTheme(theme: string) {
			state.theme = theme;
		},
		setAesthetic(aesthetic: string) {
			state.aesthetic = aesthetic;
		},
		setDensity(density: string) {
			state.density = density;
		},
		setPreviewMode(mode: PlaygroundState["previewMode"]) {
			state.previewMode = mode;
		},
		reset() {
			state.component = "Button";
			state.props = {};
			state.theme = "editorial";
			state.aesthetic = "minimal";
			state.density = "comfortable";
			state.previewMode = "desktop";
		},
		getShareUrl(): string {
			return `${window.location.origin}${window.location.pathname}?${encodeState(state)}`;
		},
		copyShareUrl(): Promise<void> {
			return navigator.clipboard.writeText(this.getShareUrl());
		},
	};
}

export type PlaygroundStateInstance = ReturnType<typeof createPlaygroundState>;
