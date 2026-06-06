import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Kbd from '../../src/components/Kbd.svelte';

describe('Kbd', () => {
	it('renders a kbd element', () => {
		const { container } = render(Kbd);
		expect(container.querySelector('kbd')).toBeInTheDocument();
	});

	it('renders with default classes', () => {
		const { container } = render(Kbd);
		const kbd = container.querySelector('kbd')!;
		expect(kbd.className).toContain('rounded-[--radius]');
	});
});
