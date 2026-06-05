import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { extendTheme } from './extendTheme.svelte';
import { DRACULA_DEFAULTS } from './theme-defaults';

describe('extendTheme', () => {
	let warnSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
	});

	afterEach(() => {
		warnSpy.mockRestore();
	});

	it('returns a theme builder for known preset', () => {
		const t = extendTheme('dracula', {});
		expect(t).toHaveProperty('tokens');
		expect(t).toHaveProperty('cssText');
	});

	it('uses dracula preset tokens by default', () => {
		const t = extendTheme('dracula', {});
		expect(t.tokens['--primary']).toBe(DRACULA_DEFAULTS.primary);
	});

	it('uses nord preset tokens by default', () => {
		const t = extendTheme('nord', {});
		expect(t.tokens['--primary']).toBe('oklch(0.78 0.10 230)');
	});

	it('uses catppuccin preset tokens by default', () => {
		const t = extendTheme('catppuccin', {});
		expect(t.tokens['--primary']).toBe('oklch(0.80 0.14 280)');
	});

	it('uses rose-pine preset tokens by default', () => {
		const t = extendTheme('rose-pine', {});
		expect(t.tokens['--primary']).toBe('oklch(0.72 0.12 15)');
	});

	it('uses editorial preset tokens by default', () => {
		const t = extendTheme('editorial', {});
		expect(t.tokens['--primary']).toBe('oklch(0.65 0.10 265)');
	});

	it('uses github preset tokens by default', () => {
		const t = extendTheme('github', {});
		expect(t.tokens['--primary']).toBe('oklch(0.65 0.18 250)');
	});

	it('forwards legacy akashic → nord', () => {
		const t = extendTheme('akashic', {});
		expect(t.tokens['--primary']).toBe('oklch(0.78 0.10 230)');
	});

	it('forwards legacy martian → dracula', () => {
		const t = extendTheme('martian', {});
		expect(t.tokens['--primary']).toBe(DRACULA_DEFAULTS.primary);
	});

	it('forwards legacy alchemy → github', () => {
		const t = extendTheme('alchemy', {});
		expect(t.tokens['--primary']).toBe('oklch(0.65 0.18 250)');
	});

	it('forwards legacy druidic → rose-pine', () => {
		const t = extendTheme('druidic', {});
		expect(t.tokens['--primary']).toBe('oklch(0.72 0.12 15)');
	});

	it('forwards legacy obsidian → editorial', () => {
		const t = extendTheme('obsidian', {});
		expect(t.tokens['--primary']).toBe('oklch(0.65 0.10 265)');
	});

	it('forwards legacy contrast → github', () => {
		const t = extendTheme('contrast', {});
		expect(t.tokens['--primary']).toBe('oklch(0.65 0.18 250)');
	});

	it('overrides primary', () => {
		const t = extendTheme('dracula', { primary: 'oklch(0.9 0.1 100)' });
		expect(t.tokens['--primary']).toBe('oklch(0.9 0.1 100)');
	});

	it('overrides accent', () => {
		const t = extendTheme('dracula', { accent: 'oklch(0.7 0.2 50)' });
		expect(t.tokens['--accent']).toBe('oklch(0.7 0.2 50)');
	});

	it('overrides destructive', () => {
		const t = extendTheme('dracula', { destructive: 'oklch(0.5 0.3 0)' });
		expect(t.tokens['--destructive']).toBe('oklch(0.5 0.3 0)');
	});

	it('overrides background', () => {
		const t = extendTheme('dracula', { background: 'oklch(0.99 0.01 100)' });
		expect(t.tokens['--background']).toBe('oklch(0.99 0.01 100)');
	});

	it('forwards radius and glassBlur', () => {
		const t = extendTheme('dracula', { radius: '1rem', glassBlur: '20px' });
		expect(t.tokens['--radius']).toBe('1rem');
		expect(t.tokens['--glass-blur']).toBe('20px');
	});

	it('warns and falls back to dracula defaults for unknown theme', () => {
		const t = extendTheme('nonexistent', { primary: 'oklch(0.6 0.1 50)' });
		expect(warnSpy).toHaveBeenCalled();
		expect(t.tokens['--primary']).toBe('oklch(0.6 0.1 50)');
	});
});
