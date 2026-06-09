import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Checkbox from '../../src/components/Checkbox.svelte';

describe('Checkbox', () => {
	it('renders label when provided', () => {
		render(Checkbox, { props: { label: 'Agree' } });
		expect(screen.getByText('Agree')).toBeInTheDocument();
	});

	it('is unchecked by default', () => {
		const { container } = render(Checkbox);
		const root = container.querySelector('[role="checkbox"]');
		expect(root?.getAttribute('data-state')).toBe('unchecked');
	});

	it('toggles checked state on click', async () => {
		const { container } = render(Checkbox);
		const root = container.querySelector('[role="checkbox"]')!;
		await userEvent.click(root);
		expect(root.getAttribute('data-state')).toBe('checked');
	});

	it('does not toggle when disabled', async () => {
		const { container } = render(Checkbox, { props: { disabled: true } });
		const root = container.querySelector('[role="checkbox"]')!;
		await userEvent.click(root);
		expect(root.getAttribute('data-state')).toBe('unchecked');
	});
});
