import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/svelte';
import LazyLoad from '../../src/components/LazyLoad.svelte';

describe('LazyLoad', () => {
	it('shows loading state initially', () => {
		const load = vi.fn().mockImplementation(() => new Promise(() => {}));
		render(LazyLoad, { load, slots: { children: 'Loaded' } });
		expect(screen.queryByText('Loaded')).not.toBeInTheDocument();
	});

	it('calls onLoaded after load completes', async () => {
		const onLoaded = vi.fn();
		const load = vi.fn().mockResolvedValue('result-data');

		render(LazyLoad, {
			load,
			onLoaded,
			slots: { children: 'Loaded' },
		});

		await waitFor(() => {
			expect(onLoaded).toHaveBeenCalledWith('result-data');
		});
	});

	it('uses cards loading type', () => {
		const load = vi.fn().mockImplementation(() => new Promise(() => {}));
		const { container } = render(LazyLoad, {
			type: 'cards',
			load,
		});
		expect(container.querySelector('.grid')).toBeInTheDocument();
	});

	it('uses table loading type', () => {
		const load = vi.fn().mockImplementation(() => new Promise(() => {}));
		const { container } = render(LazyLoad, {
			type: 'table',
			load,
		});
		expect(container.querySelector('[role="status"]')).toBeInTheDocument();
	});
});
