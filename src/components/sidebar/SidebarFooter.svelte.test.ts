import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import SidebarFooter from './SidebarFooter.svelte';

describe('SidebarFooter', () => {
	it('renders a footer with border', () => {
		const { container } = render(SidebarFooter, { slots: { children: '' } });
		const div = container.querySelector('div');
		expect(div).not.toBeNull();
		expect(div?.className).toContain('border-t');
		expect(div?.className).toContain('border-sidebar-border');
	});

	it('renders without children', () => {
		const { container } = render(SidebarFooter);
		expect(container.querySelector('div')).not.toBeNull();
	});
});
