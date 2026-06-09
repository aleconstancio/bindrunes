import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import SidebarSeparator from './SidebarSeparator.svelte';

describe('SidebarSeparator', () => {
	it('renders a separator div', () => {
		const { container } = render(SidebarSeparator);
		const div = container.querySelector('div');
		expect(div).not.toBeNull();
	});

	it('has role=separator for a11y', () => {
		const { container } = render(SidebarSeparator);
		const div = container.querySelector('div');
		expect(div?.getAttribute('role')).toBe('separator');
	});

	it('applies horizontal separator styling', () => {
		const { container } = render(SidebarSeparator);
		const div = container.querySelector('div');
		expect(div?.className).toContain('h-px');
		expect(div?.className).toContain('bg-sidebar-border');
	});
});
