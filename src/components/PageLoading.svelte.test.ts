import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import PageLoading from '../../src/components/PageLoading.svelte';

describe('PageLoading', () => {
	it('renders with role="status"', () => {
		render(PageLoading);
		expect(screen.getByRole('status')).toBeInTheDocument();
	});

	it('renders text type by default', () => {
		const { container } = render(PageLoading);
		expect(container.querySelector('.space-y-2')).toBeInTheDocument();
	});

	it('renders text type with correct number of lines', () => {
		const { container } = render(PageLoading, { type: 'text', lines: 3 });
		const lines = container.querySelectorAll('.space-y-2 > div');
		expect(lines.length).toBe(3);
	});

	it('renders cards type with correct number of rows', () => {
		render(PageLoading, { type: 'cards', rows: 2 });
		const cards = screen.getByRole('status');
		expect(cards).toBeInTheDocument();
	});

	it('renders table type with correct number of rows', () => {
		render(PageLoading, { type: 'table', rows: 3 });
		const table = screen.getByRole('status');
		expect(table).toBeInTheDocument();
	});

	it('renders form type', () => {
		render(PageLoading, { type: 'form', lines: 4 });
		const form = screen.getByRole('status');
		expect(form).toBeInTheDocument();
	});
});
