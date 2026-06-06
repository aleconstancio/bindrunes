import { describe, it, expect, vi } from 'vitest';
import { derivePageInfo, deriveOmnibarOptions } from './navigation';

const groups = [
	{
		label: 'Main',
		items: [
			{ title: 'Home', to: '/home', description: 'Home page', match: '/home', icon: 'home' },
			{ title: 'Settings', to: '/settings', description: 'User settings', match: '/settings', icon: 'settings' },
			{ title: 'Users', to: '/users', description: 'User list', match: '/users', icon: 'users' },
		],
	},
	{
		label: 'Admin',
		items: [
			{ title: 'Dashboard', to: '/admin', description: 'Admin home', match: '/admin', icon: 'dashboard' },
		],
	},
];

describe('derivePageInfo', () => {
	it('matches /settings to its item', () => {
		expect(derivePageInfo('/settings', groups)).toEqual({
			title: 'Settings',
			description: 'User settings',
		});
	});

	it('matches /home to Home', () => {
		expect(derivePageInfo('/home', groups)).toEqual({
			title: 'Home',
			description: 'Home page',
		});
	});

	it('uses match prefix when present', () => {
		expect(
			derivePageInfo('/users/42', [
				{
					label: 'X',
					items: [
						{ title: 'User Detail', to: '/users/1', match: '/users', description: 'Detail', icon: 'user' },
					],
				},
			]),
		).toEqual({ title: 'User Detail', description: 'Detail' });
	});

	it('returns fallback for unmatched paths', () => {
		expect(
			derivePageInfo('/nope', groups, { title: '404', description: 'Missing' }),
		).toEqual({ title: '404', description: 'Missing' });
	});

	it('returns default fallback when no fallback provided', () => {
		expect(derivePageInfo('/nope', groups)).toEqual({
			title: 'Home',
			description: '',
		});
	});

	it('matches deeply nested paths via match prefix', () => {
		expect(derivePageInfo('/admin/users/active', groups)).toEqual({
			title: 'Dashboard',
			description: 'Admin home',
		});
	});
});

describe('deriveOmnibarOptions', () => {
	it('flattens groups into options', () => {
		const opts = deriveOmnibarOptions(groups);
		expect(opts).toHaveLength(4);
		expect(opts[0].label).toBe('Home');
		expect(opts[0].category).toBe('Main');
		expect(opts[3].label).toBe('Dashboard');
		expect(opts[3].category).toBe('Admin');
	});

	it('uses goto when provided', () => {
		const goto = vi.fn();
		const opts = deriveOmnibarOptions(groups, { goto });
		opts[0].action();
		expect(goto).toHaveBeenCalledWith('/home');
	});

	it('falls back to action() that uses window.location.href when goto not provided', () => {
		const opts = deriveOmnibarOptions(groups);
		expect(typeof opts[0].action).toBe('function');
	});

	it('uses idPrefix when provided', () => {
		const opts = deriveOmnibarOptions(groups, { idPrefix: 'opt' });
		expect(opts[0].id).toBe('opt/home');
		expect(opts[1].id).toBe('opt/settings');
	});

	it('derives id from last path segment when no idPrefix', () => {
		const opts = deriveOmnibarOptions(groups);
		expect(opts[1].id).toBe('settings');
		expect(opts[0].id).toBe('home');
	});

	it('includes description in options', () => {
		const opts = deriveOmnibarOptions(groups);
		expect(opts[0].description).toBe('Home page');
	});

	it('handles empty groups', () => {
		expect(deriveOmnibarOptions([])).toEqual([]);
	});
});
