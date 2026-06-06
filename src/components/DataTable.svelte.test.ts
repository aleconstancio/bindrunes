import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import DataTable from './DataTable.svelte';
import { expectNoAxeViolations } from '../helpers/axe';

const columns = [
	{ key: 'name', label: 'Name', sortable: true },
	{ key: 'age', label: 'Age' },
];

const rows = [
	{ name: 'Alice', age: 30 },
	{ name: 'Bob', age: 25 },
];

describe('DataTable', () => {
	it('renders column headers', () => {
		render(DataTable, { columns, rows });
		expect(screen.getByText('Name')).toBeInTheDocument();
		expect(screen.getByText('Age')).toBeInTheDocument();
	});

	it('renders row data', () => {
		render(DataTable, { columns, rows });
		expect(screen.getByText('Alice')).toBeInTheDocument();
		expect(screen.getByText('Bob')).toBeInTheDocument();
	});

	it('triggers onSort when sortable column is clicked', async () => {
		const onSort = vi.fn();
		render(DataTable, { columns, rows, onSort });
		await userEvent.click(screen.getByText('Name'));
		expect(onSort).toHaveBeenCalledWith({ key: 'name', direction: 'asc' });
	});

	it('triggers onRowClick when row is clicked', async () => {
		const onRowClick = vi.fn();
		render(DataTable, { columns, rows, onRowClick });
		await userEvent.click(screen.getByText('Alice'));
		expect(onRowClick).toHaveBeenCalledWith({ name: 'Alice', age: 30 }, 0);
	});

	it('shows empty message when no rows', () => {
		render(DataTable, { columns, rows: [], emptyText: 'Nothing here' });
		expect(screen.getByText('Nothing here')).toBeInTheDocument();
	});

	it('shows pagination when more than 1 page', () => {
		render(DataTable, { columns, rows, totalPages: 3, currentPage: 1 });
		expect(screen.getByText('Página 1 de 3')).toBeInTheDocument();
	});

	it('sort toggles direction', async () => {
		const onSort = vi.fn();
		render(DataTable, { columns, rows, onSort, sort: { key: 'name', direction: 'asc' } });
		await userEvent.click(screen.getByText('Name'));
		expect(onSort).toHaveBeenCalledWith({ key: 'name', direction: 'desc' });
	});

	it('sort unsets when already descending', async () => {
		const onSort = vi.fn();
		render(DataTable, { columns, rows, onSort, sort: { key: 'name', direction: 'desc' } });
		await userEvent.click(screen.getByText('Name'));
		expect(onSort).toHaveBeenCalledWith(null);
	});

	it('a11y: data table has no violations', async () => {
		const { container } = render(DataTable, { columns, rows });
		await expectNoAxeViolations(container);
	});
});
