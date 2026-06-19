import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import DataGrid from "./DataGrid.svelte";

describe("DataGrid", () => {
	it("renders with columns and rows", () => {
		const columns = [
			{ key: "name", label: "Name" },
			{ key: "age", label: "Age" },
		];
		const rows = [
			{ id: "1", name: "Alice", age: 30 },
			{ id: "2", name: "Bob", age: 25 },
		];
		render(DataGrid, { props: { columns, rows } });
		expect(screen.getByText("Name")).toBeTruthy();
		expect(screen.getByText("Age")).toBeTruthy();
		expect(screen.getByText("Alice")).toBeTruthy();
		expect(screen.getByText("Bob")).toBeTruthy();
	});

	it("supports sorting through full asc → desc → unset cycle", async () => {
		const columns = [{ key: "name", label: "Name", sortable: true }];
		const rows = [
			{ id: "1", name: "Bob" },
			{ id: "2", name: "Alice" },
		];
		const onSort = vi.fn();
		const { rerender } = render(DataGrid, { props: { columns, rows, onSort } });

		const header = screen.getByText("Name");

		await fireEvent.click(header);
		expect(onSort).toHaveBeenCalledWith({ key: "name", direction: "asc" });

		rerender({ columns, rows, onSort, sort: { key: "name", direction: "asc" } });
		await fireEvent.click(header);
		expect(onSort).toHaveBeenCalledWith({ key: "name", direction: "desc" });

		rerender({ columns, rows, onSort, sort: { key: "name", direction: "desc" } });
		await fireEvent.click(header);
		expect(onSort).toHaveBeenCalledWith(null);
	});

	it("supports row selection and passes correct row ID", async () => {
		const columns = [{ key: "name", label: "Name" }];
		const rows = [
			{ id: "1", name: "Alice" },
			{ id: "2", name: "Bob" },
		];
		const onSelectionChange = vi.fn();
		render(DataGrid, { props: { columns, rows, selectable: true, onSelectionChange } });

		// getAllByRole("checkbox")[0] is the "select all" header checkbox;
		// [1] is the first row's checkbox.
		const checkboxes = screen.getAllByRole("checkbox");
		await fireEvent.click(checkboxes[1]);
		expect(onSelectionChange).toHaveBeenCalledWith(["1"]);
	});
});
