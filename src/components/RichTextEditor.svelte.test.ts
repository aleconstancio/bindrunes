import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import RichTextEditor from './RichTextEditor.svelte';

describe('RichTextEditor', () => {
	it('renders', () => {
		const { container } = render(RichTextEditor);
		expect(container).toBeDefined();
	});
});
