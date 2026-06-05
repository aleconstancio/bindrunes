import { describe, it, expect } from 'vitest';
import ListPage from './ListPage.svelte';

describe('ListPage', () => {
	it('exports a Svelte component', () => {
		expect(ListPage).toBeDefined();
	});

	it('is a function (Svelte component signature)', () => {
		expect(typeof ListPage).toBe('function');
	});
});
