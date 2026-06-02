import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Popconfirm from '../../src/components/Popconfirm.svelte';

describe('Popconfirm', () => {
	it('renders container', () => {
		const { container } = render(Popconfirm);
		expect(container).toBeInTheDocument();
	});

	it('renders with default props', () => {
		const { container } = render(Popconfirm, {
			props: {
				title: 'Delete user?',
			},
		});
		expect(container).toBeInTheDocument();
	});
});
