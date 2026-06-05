import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import Popconfirm from '../../src/components/Popconfirm.svelte';

describe('Popconfirm', () => {
	it('renders without crashing', () => {
		const { container } = render(Popconfirm);
		expect(container).toBeInTheDocument();
	});

	it('accepts custom class without crashing', () => {
		const { container } = render(Popconfirm, { props: { class: 'custom' } });
		expect(container).toBeInTheDocument();
	});

	it('renders with custom title', () => {
		const { container } = render(Popconfirm, { props: { title: 'Delete?' } });
		expect(container).toBeInTheDocument();
	});
});
