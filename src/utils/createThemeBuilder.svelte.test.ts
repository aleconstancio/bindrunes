import { describe, it, expect } from 'vitest';
import { createThemeBuilder } from './createThemeBuilder.svelte';
import { DRACULA_DEFAULTS } from './theme-defaults';

const SAMPLE = 'oklch(0.75 0.21 310)';

describe('createThemeBuilder', () => {
	describe('defaults', () => {
		it('returns tokens object', () => {
			const t = createThemeBuilder({ primary: SAMPLE });
			expect(t.tokens).toBeTypeOf('object');
			expect(t.tokens['--primary']).toBe(SAMPLE);
		});

		it('returns cssText string', () => {
			const t = createThemeBuilder({ primary: SAMPLE });
			expect(t.cssText).toContain('--primary:');
			expect(t.cssText).toContain(SAMPLE);
		});

		it('exposes apply function', () => {
			const t = createThemeBuilder({ primary: SAMPLE });
			expect(typeof t.apply).toBe('function');
		});

		it('exposes toCSS function', () => {
			const t = createThemeBuilder({ primary: SAMPLE });
			expect(typeof t.toCSS).toBe('function');
		});
	});

	describe('derived tokens', () => {
		it('derives accent from primary when not provided', () => {
			const t = createThemeBuilder({ primary: SAMPLE });
			expect(t.tokens['--accent']).toMatch(/^oklch\(/);
		});

		it('uses provided accent', () => {
			const t = createThemeBuilder({ primary: SAMPLE, accent: 'oklch(0.8 0.2 100)' });
			expect(t.tokens['--accent']).toBe('oklch(0.8 0.2 100)');
		});

		it('uses DRACULA destructive as fallback', () => {
			const t = createThemeBuilder({ primary: SAMPLE });
			expect(t.tokens['--destructive']).toBe(DRACULA_DEFAULTS.destructive);
		});

		it('uses provided destructive', () => {
			const t = createThemeBuilder({ primary: SAMPLE, destructive: 'oklch(0.5 0.3 0)' });
			expect(t.tokens['--destructive']).toBe('oklch(0.5 0.3 0)');
		});

		it('derives background in dark mode (default)', () => {
			const t = createThemeBuilder({ primary: SAMPLE });
			expect(t.tokens['--background']).toMatch(/^oklch\(0\.05/);
		});

		it('derives background in light mode', () => {
			const t = createThemeBuilder({ primary: SAMPLE, mode: 'light' });
			expect(t.tokens['--background']).toMatch(/^oklch\(0\.98/);
		});

		it('uses provided background', () => {
			const t = createThemeBuilder({ primary: SAMPLE, background: 'oklch(0.2 0.1 50)' });
			expect(t.tokens['--background']).toBe('oklch(0.2 0.1 50)');
		});

		it('uses provided radius and glassBlur', () => {
			const t = createThemeBuilder({ primary: SAMPLE, radius: '1rem', glassBlur: '20px' });
			expect(t.tokens['--radius']).toBe('1rem');
			expect(t.tokens['--glass-blur']).toBe('20px');
		});

		it('falls back to default radius and glassBlur', () => {
			const t = createThemeBuilder({ primary: SAMPLE });
			expect(t.tokens['--radius']).toBe('0.625rem');
			expect(t.tokens['--glass-blur']).toBe('16px');
		});
	});

	describe('mode-specific tokens', () => {
		it('card differs by mode', () => {
			const dark = createThemeBuilder({ primary: SAMPLE, mode: 'dark' });
			const light = createThemeBuilder({ primary: SAMPLE, mode: 'light' });
			expect(dark.tokens['--card']).not.toBe(light.tokens['--card']);
		});

		it('ring equals primary', () => {
			const t = createThemeBuilder({ primary: SAMPLE });
			expect(t.tokens['--ring']).toBe(SAMPLE);
		});
	});

	describe('toCSS / apply', () => {
		it('toCSS wraps cssText in :root selector by default', () => {
			const t = createThemeBuilder({ primary: SAMPLE });
			const css = t.toCSS();
			expect(css).toMatch(/^:root\s*\{/);
			expect(css).toMatch(/\}/);
		});

		it('toCSS uses custom selector', () => {
			const t = createThemeBuilder({ primary: SAMPLE });
			const css = t.toCSS('.my-theme');
			expect(css).toMatch(/^\.my-theme\s*\{/);
		});

		it('apply sets CSS variables on element', () => {
			const t = createThemeBuilder({ primary: SAMPLE });
			const div = document.createElement('div');
			t.apply(div);
			expect(div.style.getPropertyValue('--primary')).toBe(SAMPLE);
		});

		it('apply defaults to document.documentElement', () => {
			const t = createThemeBuilder({ primary: SAMPLE });
			t.apply();
			expect(document.documentElement.style.getPropertyValue('--primary')).toBe(SAMPLE);
		});
	});

	describe('invalid primary', () => {
		it('falls back to hue 290 when primary is not oklch', () => {
			const t = createThemeBuilder({ primary: 'not-a-color' });
			// background should be oklch(0.05 0.01 290) since match fails → hue='290'
			expect(t.tokens['--background']).toBe('oklch(0.05 0.01 290)');
		});
	});
});
