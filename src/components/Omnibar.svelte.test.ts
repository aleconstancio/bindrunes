import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Omnibar from '../../src/components/Omnibar.svelte';
import { mountComposable } from '../helpers/test-wrapper.svelte';
import { createOmnibar } from '../../src/utils/createOmnibar.svelte';

describe('Omnibar (component)', () => {
	it('renders nothing when closed', async () => {
		const state = await mountComposable(() => createOmnibar({ options: [] }));
		const { container } = render(Omnibar, { state });
		expect(container.textContent?.trim()).toBe('');
	});

	it('renders search input when open', async () => {
		const state = await mountComposable(() => createOmnibar({ options: [] }));
		state.open();
		render(Omnibar, { state });
		const input = screen.getByPlaceholderText('Search commands, routes, memory...');
		expect(input).toBeInTheDocument();
	});

	it('renders filtered options', async () => {
		const action = vi.fn();
		const state = await mountComposable(() =>
			createOmnibar({
				options: [
					{ id: '1', label: 'Dashboard', category: 'Nav', action },
					{ id: '2', label: 'Settings', category: 'Nav', action },
				],
			})
		);
		state.open();
		render(Omnibar, { state });
		expect(screen.getByText('Dashboard')).toBeInTheDocument();
		expect(screen.getByText('Settings')).toBeInTheDocument();
	});

	it('shows category badge when option has category', async () => {
		const action = vi.fn();
		const state = await mountComposable(() =>
			createOmnibar({
				options: [{ id: '1', label: 'Dashboard', category: 'Nav', action }],
			})
		);
		state.open();
		render(Omnibar, { state });
		expect(screen.getByText('Nav')).toBeInTheDocument();
	});

	it('shows empty state when no results match query', async () => {
		const state = await mountComposable(() => createOmnibar({ options: [] }));
		state.open();
		state.setQuery('nonexistent');
		render(Omnibar, { state });
		expect(screen.getByText(/no results/i)).toBeInTheDocument();
	});
});
