import { describe, it, expect } from 'vitest';
import TabsTrigger from './TabsTrigger.svelte';

describe('TabsTrigger', () => {
	it('exports a Svelte component', () => {
		expect(TabsTrigger).toBeDefined();
	});

	it('is a function (Svelte component signature)', () => {
		expect(typeof TabsTrigger).toBe('function');
	});
});
