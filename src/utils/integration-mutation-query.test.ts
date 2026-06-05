import { describe, it, expect, vi, afterEach } from 'vitest';
import { mountComposable } from '../helpers/test-wrapper.svelte';
import { createQuery } from './createQuery.svelte';
import { createMutation } from './createMutation.svelte';
import { invalidateQuery, setQueryData } from '../utils/queryCache';

describe('mutation → invalidate → query integration', () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	it('invalidateQuery after mutation marks query as stale for next mount', async () => {
		const fetcher = vi.fn().mockResolvedValue({ id: 1, name: 'item' });

		// Set initial data
		setQueryData('int-key', { id: 1, name: 'initial' });

		// Create query — uses cached data
		const query = await mountComposable(() =>
			createQuery({ key: 'int-key', fetcher, staleTime: 60000 })
		);
		await vi.waitFor(() => expect(query.isSuccess).toBe(true));
		expect(query.data).toEqual({ id: 1, name: 'initial' });

		// Create mutation
		const mutation = await mountComposable(() =>
			createMutation({
				mutator: async (data: any) => data,
			})
		);

		// Run mutation
		await mutation.mutate({ id: 1, name: 'updated' });

		// Invalidate — marks cached entry as stale
		invalidateQuery('int-key');

		// Query should be stale now
		expect(query.isStale).toBe(true);
	});

	it('mutation success → setQueryData can update cache optimistically', async () => {
		const query = await mountComposable(() =>
			createQuery({
				key: 'optimistic-key',
				fetcher: vi.fn().mockResolvedValue({ count: 0 }),
				staleTime: 60000,
			})
		);

		await vi.waitFor(() => expect(query.isSuccess).toBe(true));

		// Optimistic update
		setQueryData('optimistic-key', { count: 42 });

		// Query should reflect the updated data
		expect(query.data).toEqual({ count: 42 });
	});
});
