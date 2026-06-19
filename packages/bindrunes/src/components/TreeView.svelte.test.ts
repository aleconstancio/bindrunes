import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import TreeView from "./TreeView.svelte";

describe("TreeView", () => {
	it("renders tree nodes", () => {
		const nodes = [
			{
				id: "1",
				label: "Root",
				children: [
					{ id: "2", label: "Child 1" },
					{ id: "3", label: "Child 2" },
				],
			},
		];
		render(TreeView, { props: { nodes } });
		expect(screen.getByText("Root")).toBeTruthy();
	});

	it("expands/collapses nodes", async () => {
		const nodes = [
			{
				id: "1",
				label: "Root",
				children: [{ id: "2", label: "Child" }],
			},
		];
		render(TreeView, { props: { nodes } });
		await fireEvent.click(screen.getByText("Root"));
		expect(screen.getByText("Child")).toBeTruthy();
	});

	it("selects nodes", async () => {
		const nodes = [{ id: "1", label: "Node" }];
		const onSelect = vi.fn();
		render(TreeView, { props: { nodes, onSelect } });
		await fireEvent.click(screen.getByText("Node"));
		expect(onSelect).toHaveBeenCalledWith("1");
	});
});
