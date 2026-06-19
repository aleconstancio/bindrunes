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
		expect(screen.getByText("Alice")).toBeTruthy();
		expect(screen.getByText("Bob")).toBeTruthy();
	});

	it("supports sorting", async () => {
		const columns = [{ key: "name", label: "Name", sortable: true }];
		const rows = [
			{ id: "1", name: "Bob" },
			{ id: "2", name: "Alice" },
		];
		const onSort = vi.fn();
		render(DataGrid, { props: { columns, rows, onSort } });
		await fireEvent.click(screen.getByText("Name"));
		expect(onSort).toHaveBeenCalledWith({ key: "name", direction: "asc" });
	});

	it("supports row selection", async () => {
		const columns = [{ key: "name", label: "Name" }];
		const rows = [
			{ id: "1", name: "Alice" },
			{ id: "2", name: "Bob" },
		];
		const onSelectionChange = vi.fn();
		render(DataGrid, { props: { columns, rows, selectable: true, onSelectionChange } });
		await fireEvent.click(screen.getAllByRole("checkbox")[0]);
		expect(onSelectionChange).toHaveBeenCalled();
	});
});
