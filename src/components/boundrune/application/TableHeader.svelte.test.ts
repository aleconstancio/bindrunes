import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/svelte";
import TableHeader from "./TableHeader.svelte";

describe("TableHeader", () => {
	const columns = [
		{ key: "name", label: "Name", sortable: true },
		{ key: "email", label: "Email" },
	];

	it("renders column labels", () => {
		render(TableHeader, { columns });
		expect(screen.getByText("Name")).toBeInTheDocument();
		expect(screen.getByText("Email")).toBeInTheDocument();
	});

	it("renders sortable columns as buttons", () => {
		render(TableHeader, { columns });
		expect(screen.getByRole("button", { name: /Name/ })).toBeInTheDocument();
	});

	it("non-sortable columns are not buttons", () => {
		render(TableHeader, { columns });
		const emailEl = screen.getByText("Email");
		expect(emailEl.tagName).not.toBe("BUTTON");
	});

	it("calls onSort when sortable header clicked", async () => {
		const fn = vi.fn();
		render(TableHeader, { columns, onSort: fn });
		await fireEvent.click(screen.getByRole("button", { name: /Name/ }));
		expect(fn).toHaveBeenCalledWith({ key: "name", direction: "asc" });
	});

	it("toggles sort direction", async () => {
		const fn = vi.fn();
		render(TableHeader, { columns, onSort: fn, sort: { key: "name", direction: "asc" } });
		await fireEvent.click(screen.getByRole("button", { name: /Name/ }));
		expect(fn).toHaveBeenCalledWith({ key: "name", direction: "desc" });
	});

	it("clears sort on third click", async () => {
		const fn = vi.fn();
		render(TableHeader, { columns, onSort: fn, sort: { key: "name", direction: "desc" } });
		await fireEvent.click(screen.getByRole("button", { name: /Name/ }));
		expect(fn).toHaveBeenCalledWith(null);
	});

	it("shows ascending arrow", () => {
		render(TableHeader, { columns, sort: { key: "name", direction: "asc" } });
		expect(screen.getByText("↑")).toBeInTheDocument();
	});

	it("shows descending arrow", () => {
		render(TableHeader, { columns, sort: { key: "name", direction: "desc" } });
		expect(screen.getByText("↓")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(TableHeader, { columns, class: "my-header" });
		expect(container.firstElementChild?.className).toContain("my-header");
	});

	it("applies class prop", () => {
		const { container } = render(TableHeader, { columns, class: "my-header" });
		expect(container.firstElementChild?.className).toContain("my-header");
	});
});
