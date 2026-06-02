import { describe, it, expect, vi } from 'vitest';
import { mountComposable } from './helpers/test-wrapper.svelte';
import { createAuth } from '../src/utils/createAuth.svelte';

describe('createAuth', () => {
	it('initializes with null token when storage returns null', async () => {
		const storage = { getToken: () => null, setToken: vi.fn(), clearToken: vi.fn() };
		const auth = await mountComposable(() => createAuth({ storage }));
		expect(auth.token).toBeNull();
		expect(auth.isAuthenticated).toBe(false);
	});

	it('initializes with token from storage', async () => {
		const storage = { getToken: () => 'tok_existing', setToken: vi.fn(), clearToken: vi.fn() };
		const auth = await mountComposable(() => createAuth({ storage }));
		expect(auth.token).toBe('tok_existing');
		expect(auth.isAuthenticated).toBe(true);
	});

	it('login sets token and calls storage.setToken', async () => {
		const storage = { getToken: () => null, setToken: vi.fn(), clearToken: vi.fn() };
		const auth = await mountComposable(() => createAuth({ storage }));

		auth.login('tok_new');
		expect(auth.token).toBe('tok_new');
		expect(auth.isAuthenticated).toBe(true);
		expect(storage.setToken).toHaveBeenCalledWith('tok_new');
	});

	it('logout clears token, calls storage.clearToken, and shows toast', async () => {
		const storage = { getToken: () => 'tok_active', setToken: vi.fn(), clearToken: vi.fn() };
		const auth = await mountComposable(() => createAuth({ storage }));

		auth.logout();
		expect(auth.token).toBeNull();
		expect(auth.isAuthenticated).toBe(false);
		expect(storage.clearToken).toHaveBeenCalled();
	});

	it('refreshToken updates token and persists to storage', async () => {
		const storage = { getToken: () => null, setToken: vi.fn(), clearToken: vi.fn() };
		const auth = await mountComposable(() => createAuth({ storage }));

		auth.refreshToken('tok_refreshed');
		expect(auth.token).toBe('tok_refreshed');
		expect(storage.setToken).toHaveBeenCalledWith('tok_refreshed');
	});

	it('isAuthenticated transitions false → true → false through login/logout', async () => {
		const storage = { getToken: () => null, setToken: vi.fn(), clearToken: vi.fn() };
		const auth = await mountComposable(() => createAuth({ storage }));

		expect(auth.isAuthenticated).toBe(false);
		auth.login('tok');
		expect(auth.isAuthenticated).toBe(true);
		auth.logout();
		expect(auth.isAuthenticated).toBe(false);
	});

	it('uses default localStorage storage when no storage option provided', async () => {
		localStorage.setItem('bindrunes_token', 'tok_ls');
		const auth = await mountComposable(() => createAuth());
		expect(auth.token).toBe('tok_ls');
		localStorage.clear();
	});
});
