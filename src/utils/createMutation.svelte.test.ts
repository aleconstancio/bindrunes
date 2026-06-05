import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mountComposable } from '../helpers/test-wrapper.svelte';
import { createMutation } from './createMutation.svelte';

describe('createMutation', () => {
	it('initial state is idle with no data or error', async () => {
		const mutation = await mountComposable(() =>
			createMutation({ mutator: vi.fn() })
		);
		expect(mutation.status).toBe('idle');
		expect(mutation.data).toBeUndefined();
		expect(mutation.error).toBeNull();
		expect(mutation.isLoading).toBe(false);
		expect(mutation.isSuccess).toBe(false);
		expect(mutation.isError).toBe(false);
	});

	it('isLoading is true while mutator is pending', async () => {
		let resolveMutator!: (v: string) => void;
		const mutator = vi.fn().mockReturnValue(
			new Promise<string>((resolve) => { resolveMutator = resolve; })
		);
		const mutation = await mountComposable(() => createMutation({ mutator }));

		const promise = mutation.mutate('test');
		expect(mutation.isLoading).toBe(true);

		resolveMutator!('done');
		await promise;
	});

	it('mutate() transitions through loading to success on resolve', async () => {
		const mutation = await mountComposable(() =>
			createMutation({ mutator: vi.fn().mockResolvedValue('result') })
		);

		await mutation.mutate('test');
		expect(mutation.status).toBe('success');
		expect(mutation.isLoading).toBe(false);
		expect(mutation.isSuccess).toBe(true);
	});

	it('mutate() returns the promised data', async () => {
		const mutation = await mountComposable(() =>
			createMutation({ mutator: vi.fn().mockResolvedValue(42) })
		);

		const result = await mutation.mutate('test');
		expect(result).toBe(42);
	});

	it('mutate() sets isSuccess after successful mutation', async () => {
		const mutation = await mountComposable(() =>
			createMutation({ mutator: vi.fn().mockResolvedValue('ok') })
		);

		await mutation.mutate('test');
		expect(mutation.isSuccess).toBe(true);
		expect(mutation.isError).toBe(false);
	});

	it('mutate() transitions through loading to error on reject', async () => {
		const error = new Error('fail');
		const mutation = await mountComposable(() =>
			createMutation({ mutator: vi.fn().mockRejectedValue(error) })
		);

		await expect(mutation.mutate('test')).rejects.toThrow('fail');
		expect(mutation.status).toBe('error');
		expect(mutation.isError).toBe(true);
		expect(mutation.isLoading).toBe(false);
	});

	it('mutate() stores the error object on failure', async () => {
		const error = new Error('oops');
		const mutation = await mountComposable(() =>
			createMutation({ mutator: vi.fn().mockRejectedValue(error) })
		);

		await expect(mutation.mutate('test')).rejects.toThrow();
		expect(mutation.error).toBe(error);
	});

	it('mutate() stores the data on success', async () => {
		const mutation = await mountComposable(() =>
			createMutation({ mutator: vi.fn().mockResolvedValue('stored') })
		);

		await mutation.mutate('test');
		expect(mutation.data).toBe('stored');
	});
});

describe('createMutation — callbacks', () => {
	it('calls onMutate before the mutator runs', async () => {
		const callOrder: string[] = [];
		const mutation = await mountComposable(() =>
			createMutation({
				mutator: async () => { callOrder.push('mutator'); return 'ok'; },
				onMutate: () => { callOrder.push('onMutate'); },
			})
		);

		await mutation.mutate('test');
		expect(callOrder).toEqual(['onMutate', 'mutator']);
	});

	it('calls onSuccess with data and variables after success', async () => {
		const onSuccess = vi.fn();
		const mutation = await mountComposable(() =>
			createMutation({
				mutator: vi.fn().mockResolvedValue('data'),
				onSuccess,
			})
		);

		await mutation.mutate('vars');
		expect(onSuccess).toHaveBeenCalledWith('data', 'vars');
	});

	it('calls onError with error and variables after failure', async () => {
		const error = new Error('fail');
		const onError = vi.fn();
		const mutation = await mountComposable(() =>
			createMutation({
				mutator: vi.fn().mockRejectedValue(error),
				onError,
			})
		);

		await expect(mutation.mutate('vars')).rejects.toThrow();
		expect(onError).toHaveBeenCalledWith(error, 'vars');
	});

	it('calls onSettled with data after success', async () => {
		const onSettled = vi.fn();
		const mutation = await mountComposable(() =>
			createMutation({
				mutator: vi.fn().mockResolvedValue('result'),
				onSettled,
			})
		);

		await mutation.mutate('vars');
		expect(onSettled).toHaveBeenCalledWith('result', null, 'vars');
	});

	it('calls onSettled with error after failure', async () => {
		const error = new Error('fail');
		const onSettled = vi.fn();
		const mutation = await mountComposable(() =>
			createMutation({
				mutator: vi.fn().mockRejectedValue(error),
				onSettled,
			})
		);

		await expect(mutation.mutate('vars')).rejects.toThrow();
		expect(onSettled).toHaveBeenCalledWith(undefined, error, 'vars');
	});

	it('re-throws the error when mutator rejects', async () => {
		const mutation = await mountComposable(() =>
			createMutation({
				mutator: vi.fn().mockRejectedValue(new Error('boom')),
			})
		);

		await expect(mutation.mutate('test')).rejects.toThrow('boom');
	});
});

describe('createMutation — reset', () => {
	it('reset() clears data, error, and returns status to idle after success', async () => {
		const mutation = await mountComposable(() =>
			createMutation({ mutator: vi.fn().mockResolvedValue('data') })
		);

		await mutation.mutate('test');
		expect(mutation.status).toBe('success');

		mutation.reset();
		expect(mutation.status).toBe('idle');
		expect(mutation.data).toBeUndefined();
		expect(mutation.error).toBeNull();
	});

	it('reset() clears data, error, and returns status to idle after error', async () => {
		const mutation = await mountComposable(() =>
			createMutation({ mutator: vi.fn().mockRejectedValue(new Error('fail')) })
		);

		await expect(mutation.mutate('test')).rejects.toThrow();
		expect(mutation.status).toBe('error');

		mutation.reset();
		expect(mutation.status).toBe('idle');
		expect(mutation.data).toBeUndefined();
		expect(mutation.error).toBeNull();
	});
});
