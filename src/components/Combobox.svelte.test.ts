import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Combobox from '../../src/components/Combobox.svelte';

describe('Combobox', () => {
	const options = [
		{ value: 'br', label: 'Brazil' },
		{ value: 'us', label: 'United States' },
	];

	it('renders the trigger input', () => {
		render(Combobox, { props: { options, placeholder: 'Search...' } });
		const input = document.querySelector('input');
		expect(input).toBeInTheDocument();
	});

	it('renders without crashing with empty options', () => {
		const { container } = render(Combobox, { props: { options: [] } });
		expect(container).toBeInTheDocument();
	});

	it('accepts custom class without crashing', () => {
		const { container } = render(Combobox, { props: { options, class: 'custom' } });
		expect(container).toBeInTheDocument();
	});
});
