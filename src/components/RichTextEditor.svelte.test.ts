import { describe, it, expect } from 'vitest';
import RichTextEditor from './RichTextEditor.svelte';

describe('RichTextEditor', () => {
	it('exports a Svelte component', () => {
		expect(RichTextEditor).toBeDefined();
	});

	it('is a function (Svelte component signature)', () => {
		expect(typeof RichTextEditor).toBe('function');
	});
});
