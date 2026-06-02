import { describe, it, expect } from 'vitest';
import { tick } from 'svelte';
import { mountComposable } from './helpers/test-wrapper.svelte';
import { createTable } from '../src/utils/createTable.svelte';

describe('createTable', () => {
	const columns = [
		{ key: 'name', label: 'Name', sortable: true },
		{ key: 'email', label: 'Email' },
		{ key: 'status', label: 'Status', filterable: true },
	];

	const data = [
		{ id: '1', name: 'Alice', email: 'alice@test.com', status: 'active' },
		{ id: '2', name: 'Bob', email: 'bob@test.com', status: 'inactive' },
		{ id: '3', name: 'Charlie', email: 'charlie@test.com', status: 'active' },
	];

	it('creates table with initial state', async () => {
		const table = await mountComposable(() => createTable({ data, columns }));
		expect(table.data).toBeDefined();
		expect(table.totalRows).toBe(3);
		expect(table.totalPages).toBe(1);
	});

	it('sorts by column ascending then descending', async () => {
		const table = await mountComposable(() =>
			createTable({ data, columns, getRowId: (r) => r.id })
		);
		table.sortColumn('name');
		const firstNames = table.data.map((r: any) => r.name);
		expect(firstNames[0]).toBe('Alice');

		table.sortColumn('name');
		const descNames = table.data.map((r: any) => r.name);
		expect(descNames[0]).toBe('Charlie');

		table.sortColumn('name');
	});

	it.skip('filters data (known issue: runes reactivity not flushing through mountComposable)', async () => {
		const table = await mountComposable(() =>
			createTable({ data, columns, getRowId: (r) => r.id })
		);
		table.setFilter('status', 'active');
		await tick();
		await tick();
		// After filtering, all remaining items should be 'active'
		const allActive = table.data.every((r: any) => r.status === 'active');
		expect(allActive).toBe(true);
	});

	it('paginates data', async () => {
		const bigData = Array.from({ length: 25 }, (_, i) => ({
			id: String(i),
			name: `User ${i}`,
			email: `user${i}@test.com`,
			status: 'active',
		}));
		const table = await mountComposable(() =>
			createTable({ data: bigData, columns, getRowId: (r) => r.id })
		);
		expect(table.totalPages).toBe(2);
		expect(table.data.length).toBe(20);

		table.setPage(2);
		expect(table.data.length).toBe(5);
		expect(table.page).toBe(2);
	});

	it('toggles row selection', async () => {
		const table = await mountComposable(() =>
			createTable({ data, columns, getRowId: (r) => r.id })
		);
		expect(table.selected.size).toBe(0);

		table.toggleRow('1');
		expect(table.selected.size).toBe(1);
		expect(table.selected.has('1')).toBe(true);

		table.toggleRow('1');
		expect(table.selected.size).toBe(0);
	});

	it('toggles all rows on page', async () => {
		const table = await mountComposable(() =>
			createTable({ data, columns, getRowId: (r) => r.id })
		);
		table.toggleAll();
		expect(table.isAllSelected).toBe(true);
		expect(table.selected.size).toBe(3);

		table.toggleAll();
		expect(table.isAllSelected).toBe(false);
		expect(table.selected.size).toBe(0);
	});

	it('resets to initial state', async () => {
		const table = await mountComposable(() =>
			createTable({
				data,
				columns,
				getRowId: (r) => r.id,
				initialState: { sort: { key: 'name', direction: 'asc' } },
			})
		);
		table.sortColumn('email');
		table.setFilter('status', 'active');
		table.toggleRow('1');

		table.reset();
		expect(table.sort).toEqual({ key: 'name', direction: 'asc' });
		expect(table.filters.status).toBeUndefined();
		expect(table.selected.size).toBe(0);
	});

	it('respects initial state', async () => {
		const table = await mountComposable(() =>
			createTable({
				data,
				columns,
				getRowId: (r) => r.id,
				initialState: {
					sort: { key: 'name', direction: 'desc' },
					pagination: { page: 1, pageSize: 2 },
				},
			})
		);
		expect(table.sort).toEqual({ key: 'name', direction: 'desc' });
		expect(table.pageSize).toBe(2);
		expect(table.data.length).toBe(2);
	});
});
