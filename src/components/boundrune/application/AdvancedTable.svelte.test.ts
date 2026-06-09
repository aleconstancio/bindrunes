import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import AdvancedTable from "./AdvancedTable.svelte";

describe("AdvancedTable", () => {
	const columns = [
		{ key: "name", label: "Name", sortable: true },
		{ key: "email", label: "Email" },
	];
	const rows = [
		{ name: "Alice", email: "alice@test.com" },
		{ name: "Bob", email: "bob@test.com" },
	];

	it("renders the search input", () => {
		render(AdvancedTable, { columns, rows });
		expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
	});

	it("renders custom search placeholder", () => {
		render(AdvancedTable, { columns, rows, searchPlaceholder: "Find users..." });
		expect(screen.getByPlaceholderText("Find users...")).toBeInTheDocument();
	});

	it("renders create button when label provided", () => {
		const { container } = render(AdvancedTable, { columns, rows, createLabel: "New User" });
		const flexDiv = container.querySelector(".flex.flex-col.sm\\:flex-row");
		expect(flexDiv).not.toBeNull();
	});

	it("does not render create button when no label", () => {
		render(AdvancedTable, { columns, rows });
		expect(screen.queryByRole("button", { name: "New" })).not.toBeInTheDocument();
	});

	it("renders column headers", () => {
		render(AdvancedTable, { columns, rows });
		expect(screen.getByText("Name")).toBeInTheDocument();
		expect(screen.getByText("Email")).toBeInTheDocument();
	});

	it("renders row data", () => {
		render(AdvancedTable, { columns, rows });
		expect(screen.getByText("Alice")).toBeInTheDocument();
		expect(screen.getByText("bob@test.com")).toBeInTheDocument();
	});

	it("renders pagination when totalPages > 1", () => {
		render(AdvancedTable, { columns, rows, totalPages: 3, currentPage: 1 });
		expect(screen.getByRole("navigation")).toBeInTheDocument();
	});

	it("does not render pagination when totalPages <= 1", () => {
		render(AdvancedTable, { columns, rows, totalPages: 1 });
		expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(AdvancedTable, { columns, rows, class: "my-table" });
		expect(container.firstElementChild?.className).toContain("my-table");
	});
});
