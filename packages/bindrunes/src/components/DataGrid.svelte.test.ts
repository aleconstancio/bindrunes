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

	it("shows empty state when rows are empty", () => {
		const columns = [{ key: "name", label: "Name" }];
		render(DataGrid, { props: { columns, rows: [] } });
		expect(screen.getByText("No data available")).toBeTruthy();
	});

	it("shows custom empty text", () => {
		const columns = [{ key: "name", label: "Name" }];
		render(DataGrid, { props: { columns, rows: [], emptyText: "Nothing here" } });
		expect(screen.getByText("Nothing here")).toBeTruthy();
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

	it("does not trigger sort for non-sortable columns", async () => {
		const columns = [{ key: "name", label: "Name", sortable: false }];
		const rows = [{ id: "1", name: "Alice" }];
		const onSort = vi.fn();
		render(DataGrid, { props: { columns, rows, onSort } });

		await fireEvent.click(screen.getByText("Name"));
		expect(onSort).not.toHaveBeenCalled();
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

	it("select all checkbox selects and deselects all rows", async () => {
		const columns = [{ key: "name", label: "Name" }];
		const rows = [
			{ id: "1", name: "Alice" },
			{ id: "2", name: "Bob" },
		];
		const onSelectionChange = vi.fn();
		const { rerender } = render(DataGrid, {
			props: { columns, rows, selectable: true, onSelectionChange },
		});

		const selectAll = screen.getAllByRole("checkbox")[0];

		await fireEvent.click(selectAll);
		expect(onSelectionChange).toHaveBeenCalledWith(["1", "2"]);

		onSelectionChange.mockClear();

		rerender({ columns, rows, selectable: true, selectedIds: ["1", "2"], onSelectionChange });
		const selectAllAgain = screen.getAllByRole("checkbox")[0];
		await fireEvent.click(selectAllAgain);
		expect(onSelectionChange).toHaveBeenCalledWith([]);
	});

	it("calls onRowClick when a row is clicked", async () => {
		const columns = [{ key: "name", label: "Name" }];
		const rows = [{ id: "1", name: "Alice" }];
		const onRowClick = vi.fn();
		render(DataGrid, { props: { columns, rows, onRowClick } });

		await fireEvent.click(screen.getByText("Alice"));
		expect(onRowClick).toHaveBeenCalledWith(rows[0]);
	});

	it("supports keyboard activation on rows with Enter and Space", async () => {
		const columns = [{ key: "name", label: "Name" }];
		const rows = [{ id: "1", name: "Alice" }];
		const onRowClick = vi.fn();
		render(DataGrid, { props: { columns, rows, onRowClick } });

		const row = screen.getByRole("row", { name: /alice/i });
		await fireEvent.keyDown(row, { key: "Enter" });
		expect(onRowClick).toHaveBeenCalledWith(rows[0]);

		await fireEvent.keyDown(row, { key: " " });
		expect(onRowClick).toHaveBeenCalledTimes(2);
	});

	it("uses custom rowKey for selection", async () => {
		const columns = [{ key: "name", label: "Name" }];
		const rows = [
			{ uid: "a1", name: "Alice" },
			{ uid: "b2", name: "Bob" },
		];
		const onSelectionChange = vi.fn();
		render(DataGrid, {
			props: { columns, rows, rowKey: "uid", selectable: true, onSelectionChange },
		});

		const checkboxes = screen.getAllByRole("checkbox");
		await fireEvent.click(checkboxes[1]);
		expect(onSelectionChange).toHaveBeenCalledWith(["a1"]);
	});
});
