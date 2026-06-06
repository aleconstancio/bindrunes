import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Popconfirm from './Popconfirm.svelte';

describe('Popconfirm', () => {
	it('renders', () => {
		const { container } = render(Popconfirm);
		expect(container).toBeDefined();
	});
});
