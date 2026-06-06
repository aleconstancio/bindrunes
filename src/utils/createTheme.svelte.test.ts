import { describe, it, expect, beforeEach } from 'vitest';
import { mountComposable } from '../helpers/test-wrapper.svelte';
import { createTheme } from './createTheme.svelte';

describe('createTheme', () => {
	beforeEach(() => {
		localStorage.clear();
		document.documentElement.removeAttribute('data-theme');
	});

	it('initializes with default theme (editorial)', async () => {
		const t = await mountComposable(() => createTheme());
		expect(t.theme).toBe('editorial');
	});

	it('exposes all 6 themes', async () => {
		const t = await mountComposable(() => createTheme());
		expect(t.themes.length).toBe(6);
		expect(t.themes).toContain('dracula');
		expect(t.themes).toContain('nord');
	});

	it('respects default option', async () => {
		const t = await mountComposable(() => createTheme({ default: 'dracula' }));
		expect(t.theme).toBe('dracula');
	});

	it('setTheme updates current theme', async () => {
		const t = await mountComposable(() => createTheme());
		t.setTheme('nord');
		expect(t.theme).toBe('nord');
	});

	it('setTheme writes to data-theme attribute', async () => {
		const t = await mountComposable(() => createTheme());
		t.setTheme('catppuccin');
		await new Promise((r) => setTimeout(r, 10));
		expect(document.documentElement.getAttribute('data-theme')).toBe('catppuccin');
	});

	it('setTheme persists to localStorage', async () => {
		const t = await mountComposable(() => createTheme());
		t.setTheme('github');
		await new Promise((r) => setTimeout(r, 10));
		expect(localStorage.getItem('bindrunes_theme')).toContain('github');
	});

	it('reads initial theme from localStorage', async () => {
		localStorage.setItem('bindrunes_theme', JSON.stringify('rose-pine'));
		const t = await mountComposable(() => createTheme());
		expect(t.theme).toBe('rose-pine');
	});
});
