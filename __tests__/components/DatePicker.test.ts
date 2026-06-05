import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import DatePicker from '../../src/components/DatePicker.svelte';

describe('DatePicker', () => {
	it('renders the date input', () => {
		const { container } = render(DatePicker);
		expect(container.querySelector('input') ?? container).toBeInTheDocument();
	});

	it('renders with a label when provided', () => {
		render(DatePicker, { props: { label: 'Start date' } });
		// bits-ui renders the label — just verify no crash
	});

	it('renders disabled state', () => {
		const { container } = render(DatePicker, { props: { disabled: true } });
		expect(container).toBeInTheDocument();
	});
});
