import { describe, it, expect, vi } from 'vitest';
import { hasRole, hasAnyRole, hasPermission } from './hasRole.svelte';

const makeAuth = (overrides: Partial<{
	hasRole: (role: string) => boolean;
	hasAnyRole: (roles: string[]) => boolean;
	hasPermission: (permission: string) => boolean;
}> = {}) => ({
	roles: ['admin', 'editor'],
	permissions: ['read', 'write'],
	hasRole: vi.fn().mockReturnValue(false),
	hasAnyRole: vi.fn().mockReturnValue(false),
	hasPermission: vi.fn().mockReturnValue(false),
	...overrides,
});

describe('hasRole', () => {
	it('delegates to auth.hasRole', () => {
		const auth = makeAuth({ hasRole: vi.fn().mockReturnValue(true) });
		expect(hasRole(auth, 'admin')).toBe(true);
		expect(auth.hasRole).toHaveBeenCalledWith('admin');
	});

	it('returns false when auth.hasRole returns false', () => {
		const auth = makeAuth({ hasRole: vi.fn().mockReturnValue(false) });
		expect(hasRole(auth, 'admin')).toBe(false);
	});
});

describe('hasAnyRole', () => {
	it('returns true when one of the roles matches', () => {
		const auth = makeAuth({ hasAnyRole: vi.fn().mockReturnValue(true) });
		expect(hasAnyRole(auth, ['admin', 'viewer'])).toBe(true);
		expect(auth.hasAnyRole).toHaveBeenCalledWith(['admin', 'viewer']);
	});

	it('returns false when no roles match', () => {
		const auth = makeAuth({ hasAnyRole: vi.fn().mockReturnValue(false) });
		expect(hasAnyRole(auth, ['viewer', 'guest'])).toBe(false);
	});

	it('handles empty role array', () => {
		const auth = makeAuth({ hasAnyRole: vi.fn().mockReturnValue(false) });
		expect(hasAnyRole(auth, [])).toBe(false);
	});
});

describe('hasPermission', () => {
	it('delegates to auth.hasPermission', () => {
		const auth = makeAuth({ hasPermission: vi.fn().mockReturnValue(true) });
		expect(hasPermission(auth, 'write')).toBe(true);
		expect(auth.hasPermission).toHaveBeenCalledWith('write');
	});

	it('returns false when permission is missing', () => {
		const auth = makeAuth({ hasPermission: vi.fn().mockReturnValue(false) });
		expect(hasPermission(auth, 'admin:delete')).toBe(false);
	});
});
