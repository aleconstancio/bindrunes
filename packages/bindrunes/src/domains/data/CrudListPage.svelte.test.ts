import { render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import CrudListPage from "./CrudListPage.svelte";

const columns = [
	{ key: "name", label: "Name" },
	{ key: "email", label: "Email" },
];

const rows = [
	{ name: "Alice", email: "alice@test.com" },
	{ name: "Bob", email: "bob@test.com" },
];

describe("CrudListPage", () => {
	it("renders without errors", () => {
		const { container } = render(CrudListPage, {
			props: { title: "Users", columns, rows },
		});
		expect(container).toBeTruthy();
	});

	it("renders title", () => {
		render(CrudListPage, { props: { title: "Users", columns, rows } });
		expect(screen.getByText("Users")).toBeInTheDocument();
	});

	it("renders description", () => {
		render(CrudListPage, {
			props: { title: "Users", description: "Manage users", columns, rows },
		});
		expect(screen.getByText("Manage users")).toBeInTheDocument();
	});

	it("renders create button", () => {
		render(CrudListPage, {
			props: { title: "Users", columns, rows, createLabel: "Add User", onCreate: vi.fn() },
		});
		expect(screen.getByText("Add User")).toBeInTheDocument();
	});

	it("renders row data", () => {
		render(CrudListPage, { props: { title: "Users", columns, rows } });
		expect(screen.getByText("Alice")).toBeInTheDocument();
		expect(screen.getByText("Bob")).toBeInTheDocument();
	});

	it("shows empty text when no rows", () => {
		render(CrudListPage, {
			props: { title: "Users", columns, rows: [], emptyText: "No users" },
		});
		expect(screen.getByText("No users")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(CrudListPage, {
			props: { title: "Users", columns, rows, class: "list-class" },
		});
		expect(container.firstElementChild?.className).toContain("list-class");
	});
});
