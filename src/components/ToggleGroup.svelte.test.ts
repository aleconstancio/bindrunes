import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import ToggleGroup from '../../src/components/ToggleGroup.svelte';

describe('ToggleGroup', () => {
	const options = [
		{ value: 'list', label: 'List' },
		{ value: 'grid', label: 'Grid' },
	];

	it('renders all options', () => {
		render(ToggleGroup, { props: { options } });
		expect(screen.getByText('List')).toBeInTheDocument();
		expect(screen.getByText('Grid')).toBeInTheDocument();
	});

	it('accepts single mode', () => {
		const { container } = render(ToggleGroup, { props: { options, multiple: false } });
		expect(container).toBeInTheDocument();
	});

	it('accepts multiple mode', () => {
		const { container } = render(ToggleGroup, { props: { options, multiple: true } });
		expect(container).toBeInTheDocument();
	});
});
