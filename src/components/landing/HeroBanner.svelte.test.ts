import { describe, it, expect } from 'vitest';
import HeroBanner from './HeroBanner.svelte';

describe('HeroBanner', () => {
	it('exports a Svelte component', () => {
		expect(HeroBanner).toBeDefined();
	});

	it('is a function', () => {
		expect(typeof HeroBanner).toBe('function');
	});
});
