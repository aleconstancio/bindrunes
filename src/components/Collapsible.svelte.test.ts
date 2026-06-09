import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Collapsible from '../../src/components/Collapsible.svelte';

describe('Collapsible', () => {
	it('renders without crashing', () => {
		const { container } = render(Collapsible);
		expect(container).toBeInTheDocument();
	});

	it('renders disabled state', () => {
		const { container } = render(Collapsible, { props: { disabled: true } });
		expect(container).toBeInTheDocument();
	});

	it('applies custom class', () => {
		const { container } = render(Collapsible, { props: { class: 'custom' } });
		expect(container.querySelector('.custom')).toBeInTheDocument();
	});
});
