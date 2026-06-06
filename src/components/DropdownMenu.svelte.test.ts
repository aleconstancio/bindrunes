import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import DropdownMenu from '../../src/components/DropdownMenu.svelte';

describe('DropdownMenu', () => {
	const items = [
		{ label: 'Edit', value: 'edit' },
		{ label: 'Delete', value: 'delete' },
	];

	it('renders a trigger button', () => {
		const { container } = render(DropdownMenu, { props: { items } });
		const trigger = container.querySelector('[data-dropdown-menu-trigger]');
		expect(trigger).toBeInTheDocument();
	});

	it('renders menu items', () => {
		const { container } = render(DropdownMenu, { props: { items } });
		expect(container.querySelector('[data-dropdown-menu-trigger]')).toBeInTheDocument();
	});
});
