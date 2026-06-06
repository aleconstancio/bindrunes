import { describe, it, expect } from 'vitest';
import { DRACULA_DEFAULTS } from './theme-defaults';

describe('DRACULA_DEFAULTS', () => {
	it('exposes all required tokens', () => {
		expect(DRACULA_DEFAULTS).toHaveProperty('primary');
		expect(DRACULA_DEFAULTS).toHaveProperty('accent');
		expect(DRACULA_DEFAULTS).toHaveProperty('destructive');
		expect(DRACULA_DEFAULTS).toHaveProperty('background');
	});

	it('uses oklch() format for colors', () => {
		for (const v of Object.values(DRACULA_DEFAULTS)) {
			expect(v).toMatch(/^oklch\(/);
		}
	});

	it('values are readonly at type level', () => {
		// Readonly is compile-time, but verify all values are strings
		for (const [k, v] of Object.entries(DRACULA_DEFAULTS)) {
			expect(typeof v).toBe('string');
			expect(v.length).toBeGreaterThan(0);
			expect(k).toBeTruthy();
		}
	});
});
