import { describe, it, expect } from 'vitest';
import { derivePageInfo, deriveOmnibarOptions } from '../src/utils/navigation';

const mockGroups = [
	{
		label: 'Main',
		items: [
			{ title: 'Dashboard', to: '/dashboard', description: 'Overview', icon: '📊' },
			{ title: 'Settings', to: '/settings', description: 'Preferences', icon: '⚙️' },
		],
	},
	{
		label: 'Admin',
		items: [
			{ title: 'Users', to: '/admin/users', description: 'Manage users', icon: '👥', match: '/admin' },
		],
	},
];

describe('derivePageInfo', () => {
	it('returns matching item by exact path', () => {
		const result = derivePageInfo('/dashboard', mockGroups, { title: 'Home', description: '' });
		expect(result).toEqual({ title: 'Dashboard', description: 'Overview' });
	});

	it('returns matching item by path prefix', () => {
		const result = derivePageInfo('/dashboard/social', mockGroups);
		expect(result).toEqual({ title: 'Dashboard', description: 'Overview' });
	});

	it('uses match field when provided', () => {
		const result = derivePageInfo('/admin/users/create', mockGroups);
		expect(result).toEqual({ title: 'Users', description: 'Manage users' });
	});

	it('returns fallback when no path matches', () => {
		const result = derivePageInfo('/unknown', mockGroups, { title: 'Home', description: '' });
		expect(result).toEqual({ title: 'Home', description: '' });
	});

	it('returns default fallback when no fallback provided', () => {
		const result = derivePageInfo('/unknown', mockGroups);
		expect(result).toEqual({ title: 'Home', description: '' });
	});

	it('returns first match when multiple items could match', () => {
		const groups = [
			{
				label: 'Test',
				items: [
					{ title: 'First', to: '/abc', description: 'A', icon: '1' },
					{ title: 'Second', to: '/abcd', description: 'B', icon: '2' },
				],
			},
		];
		const result = derivePageInfo('/abcd', groups);
		expect(result.title).toBe('First');
	});

	it('handles empty groups', () => {
		const result = derivePageInfo('/any', [], { title: 'Fallback', description: '' });
		expect(result).toEqual({ title: 'Fallback', description: '' });
	});
});

describe('deriveOmnibarOptions', () => {
	it('flattens groups into options', () => {
		const options = deriveOmnibarOptions(mockGroups);
		expect(options).toHaveLength(3);
		expect(options[0]).toMatchObject({ label: 'Dashboard', category: 'Main' });
		expect(options[1]).toMatchObject({ label: 'Settings', category: 'Main' });
		expect(options[2]).toMatchObject({ label: 'Users', category: 'Admin' });
	});

	it('derives id from path by default', () => {
		const options = deriveOmnibarOptions(mockGroups);
		expect(options[0].id).toBe('dashboard');
		expect(options[2].id).toBe('users');
	});

	it('uses idPrefix when provided', () => {
		const options = deriveOmnibarOptions(mockGroups, { idPrefix: 'nav_' });
		expect(options[0].id).toBe('nav_/dashboard');
	});

	it('each option has an action function', () => {
		const options = deriveOmnibarOptions(mockGroups);
		expect(typeof options[0].action).toBe('function');
	});

	it('handles empty groups', () => {
		const options = deriveOmnibarOptions([]);
		expect(options).toEqual([]);
	});
});
