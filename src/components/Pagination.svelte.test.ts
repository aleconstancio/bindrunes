import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Pagination from '../../src/components/Pagination.svelte';

describe('Pagination', () => {
	it('renders page numbers', () => {
		render(Pagination, { props: { currentPage: 1, totalPages: 5 } });
		expect(screen.getByText('1')).toBeInTheDocument();
		expect(screen.getByText('5')).toBeInTheDocument();
	});

	it('clicking a page number calls onPageChange', async () => {
		const onPageChange = vi.fn();
		render(Pagination, { props: { currentPage: 1, totalPages: 5, onPageChange } });
		await userEvent.click(screen.getByText('2'));
		expect(onPageChange).toHaveBeenCalledWith(2);
	});

	it('previous button is disabled on first page', () => {
		const { container } = render(Pagination, { props: { currentPage: 1, totalPages: 5 } });
		const prevBtn = container.querySelector('button:first-child');
		expect(prevBtn).toBeDisabled();
	});

	it('next button is disabled on last page', () => {
		const { container } = render(Pagination, { props: { currentPage: 5, totalPages: 5 } });
		const nextBtn = container.querySelector('button:last-child');
		expect(nextBtn).toBeDisabled();
	});

	it('previous button navigates backward', async () => {
		const onPageChange = vi.fn();
		const { container } = render(Pagination, { props: { currentPage: 3, totalPages: 5, onPageChange } });
		const prevBtn = container.querySelector('nav button:first-child')!;
		await userEvent.click(prevBtn);
		expect(onPageChange).toHaveBeenCalledWith(2);
	});

	it('next button navigates forward', async () => {
		const onPageChange = vi.fn();
		const { container } = render(Pagination, { props: { currentPage: 3, totalPages: 5, onPageChange } });
		const nextBtn = container.querySelector('nav button:last-child')!;
		await userEvent.click(nextBtn);
		expect(onPageChange).toHaveBeenCalledWith(4);
	});
});
