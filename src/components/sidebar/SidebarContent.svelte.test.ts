import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import SidebarContent from './SidebarContent.svelte';

describe('SidebarContent', () => {
	it('renders a scrollable container', () => {
		const { container } = render(SidebarContent, { slots: { children: '' } });
		const div = container.querySelector('div');
		expect(div).not.toBeNull();
		expect(div?.className).toContain('flex-1');
		expect(div?.className).toContain('overflow-y-auto');
	});

	it('renders without children', () => {
		const { container } = render(SidebarContent);
		expect(container.querySelector('div')).not.toBeNull();
	});
});
