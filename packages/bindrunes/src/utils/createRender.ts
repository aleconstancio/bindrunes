import type { Component } from "svelte";
import { render } from "svelte/server";

export function createRender<T extends Record<string, unknown>>(component: Component<T>) {
	return function renderToString(props: T): string {
		const result = render(component, { props });
		return result.body;
	};
}
