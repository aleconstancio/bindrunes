import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Combobox from './Combobox.svelte';

describe('Combobox', () => {
	it('renders', () => {
		const { container } = render(Combobox);
		expect(container).toBeDefined();
	});
});
