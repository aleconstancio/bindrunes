import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import DashboardShellSplit from './DashboardShellSplit.svelte';

describe('DashboardShellSplit', () => {
	it('renders without crashing', () => {
		const { container } = render(DashboardShellSplit);
		expect(container.firstElementChild).not.toBeNull();
	});

	it('renders resize handle when resizable is true', () => {
		const { container } = render(DashboardShellSplit, { resizable: true });
		const handle = container.querySelector('[role="separator"]');
		expect(handle).not.toBeNull();
		expect(handle?.getAttribute('aria-label')).toBe('Panel resize separator');
	});

	it('resize handle has correct aria attributes', () => {
		const { container } = render(DashboardShellSplit, {
			resizable: true,
			listWidth: '400px',
		});
		const handle = container.querySelector('[role="separator"]');
		expect(handle?.getAttribute('aria-valuenow')).toBe('400');
		expect(handle?.getAttribute('aria-valuemin')).toBe('280');
		expect(handle?.getAttribute('aria-valuemax')).toBe('600');
	});

	it('applies custom listWidth to list panel', () => {
		const { container } = render(DashboardShellSplit, { listWidth: '500px' });
		const list = container.querySelector('[style*="width"]');
		expect(list?.getAttribute('style')).toContain('500px');
	});
});
