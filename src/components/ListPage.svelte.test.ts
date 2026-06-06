import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import ListPage from './ListPage.svelte';

describe('ListPage', () => {
	it('renders', () => {
		const { container } = render(ListPage);
		expect(container).toBeDefined();
	});
});
