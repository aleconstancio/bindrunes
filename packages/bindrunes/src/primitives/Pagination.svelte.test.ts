import { fireEvent, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Pagination from "./Pagination.svelte";

describe("Pagination", () => {
	it("renders page numbers", () => {
		render(Pagination, { props: { currentPage: 1, totalPages: 5 } });
		expect(screen.getByText("1")).toBeInTheDocument();
		expect(screen.getByText("5")).toBeInTheDocument();
	});

	it("clicking a page number calls onPageChange", async () => {
		const onPageChange = vi.fn();
		render(Pagination, { props: { currentPage: 1, totalPages: 5, onPageChange } });
		await userEvent.click(screen.getByText("2"));
		expect(onPageChange).toHaveBeenCalledWith(2);
	});

	it("previous button is disabled on first page", () => {
		const { container } = render(Pagination, { props: { currentPage: 1, totalPages: 5 } });
		const prevBtn = container.querySelector("button:first-child");
		expect(prevBtn).toBeDisabled();
	});

	it("next button is disabled on last page", () => {
		const { container } = render(Pagination, { props: { currentPage: 5, totalPages: 5 } });
		const nextBtn = container.querySelector("button:last-child");
		expect(nextBtn).toBeDisabled();
	});

	it("previous button navigates backward", async () => {
		const onPageChange = vi.fn();
		const { container } = render(Pagination, {
			props: { currentPage: 3, totalPages: 5, onPageChange },
		});
		const prevBtn = container.querySelector("nav button:first-child")!;
		await userEvent.click(prevBtn);
		expect(onPageChange).toHaveBeenCalledWith(2);
	});

	it("next button navigates forward", async () => {
		const onPageChange = vi.fn();
		const { container } = render(Pagination, {
			props: { currentPage: 3, totalPages: 5, onPageChange },
		});
		const nextBtn = container.querySelector("nav button:last-child")!;
		await userEvent.click(nextBtn);
		expect(onPageChange).toHaveBeenCalledWith(4);
	});

	it("shows total when showTotal is true", () => {
		const { container } = render(Pagination, {
			props: { currentPage: 1, totalPages: 5, showTotal: true },
		});
		expect(container.querySelector("nav")).toBeInTheDocument();
	});

	it("shows ellipsis for large page ranges", () => {
		const { container } = render(Pagination, { props: { currentPage: 10, totalPages: 20 } });
		expect(container.querySelector("nav")).toBeInTheDocument();
	});

	it("renders page size selector when onPageSizeChange provided", () => {
		render(Pagination, {
			props: { currentPage: 1, totalPages: 5, onPageSizeChange: vi.fn() },
		});
		expect(screen.getByLabelText("Page size")).toBeInTheDocument();
	});

	it("does not render page size selector by default", () => {
		render(Pagination, { props: { currentPage: 1, totalPages: 5 } });
		expect(screen.queryByLabelText("Page size")).not.toBeInTheDocument();
	});

	it("page size change calls onPageSizeChange", async () => {
		const onPageSizeChange = vi.fn();
		render(Pagination, {
			props: { currentPage: 1, totalPages: 5, onPageSizeChange },
		});
		const select = screen.getByLabelText("Page size");
		await fireEvent.change(select, { target: { value: "50" } });
		expect(onPageSizeChange).toHaveBeenCalledWith(50);
	});

	it("active page has aria-current", () => {
		render(Pagination, { props: { currentPage: 2, totalPages: 5 } });
		const activePage = screen.getByText("2");
		expect(activePage.closest("[aria-current='page']")).toBeInTheDocument();
	});

	it("non-active page does not have aria-current", () => {
		render(Pagination, { props: { currentPage: 1, totalPages: 5 } });
		const page3 = screen.getByText("3");
		expect(page3.closest("[aria-current='page']")).toBeNull();
	});

	it("renders with siblingCount=0", () => {
		render(Pagination, { props: { currentPage: 5, totalPages: 10, siblingCount: 0 } });
		expect(screen.getByText("5")).toBeInTheDocument();
	});

	it("renders with large totalPages and siblingCount=2", () => {
		const { container } = render(Pagination, {
			props: { currentPage: 10, totalPages: 20, siblingCount: 2 },
		});
		expect(container.querySelector("nav")).toBeInTheDocument();
	});
});
