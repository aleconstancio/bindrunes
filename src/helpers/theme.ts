import { render, type RenderResult } from '@testing-library/svelte';
import type { Component } from 'svelte';

export interface RenderWithThemeOptions {
	theme?: string;
	aesthetic?: string;
	density?: string;
}

export function renderWithTheme(
	component: Component,
	options: RenderWithThemeOptions & Record<string, unknown> = {},
): RenderResult {
	const { theme, aesthetic, density, ...componentProps } = options;
	if (theme) document.documentElement.setAttribute('data-theme', theme);
	if (aesthetic) document.documentElement.setAttribute('data-aesthetic', aesthetic);
	if (density) document.documentElement.setAttribute('data-density', density);

	const result = render(component, { props: componentProps });
	return result;
}
