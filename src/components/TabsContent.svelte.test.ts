import { describe, it, expect } from 'vitest';
import TabsContent from './TabsContent.svelte';

describe('TabsContent', () => {
	it('exports a Svelte component', () => {
		expect(TabsContent).toBeDefined();
	});

	it('is a function (Svelte component signature)', () => {
		expect(typeof TabsContent).toBe('function');
	});
});
