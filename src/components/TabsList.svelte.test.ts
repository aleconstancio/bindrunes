import { describe, it, expect } from 'vitest';
import TabsList from './TabsList.svelte';

describe('TabsList', () => {
	it('exports a Svelte component', () => {
		expect(TabsList).toBeDefined();
	});

	it('is a function (Svelte component signature)', () => {
		expect(typeof TabsList).toBe('function');
	});
});
