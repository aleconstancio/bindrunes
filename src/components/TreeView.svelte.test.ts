import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import TreeView from "./TreeView.svelte";

const sampleNodes = [
	{
		id: "1",
		label: "Parent",
		children: [
			{ id: "1-1", label: "Child 1" },
			{ id: "1-2", label: "Child 2" },
		],
	},
	{ id: "2", label: "Leaf" },
];

describe("TreeView", () => {
	it("renders without crashing", () => {
		const { container } = render(TreeView, { props: { nodes: sampleNodes } });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("has tree role", () => {
		const { container } = render(TreeView, { props: { nodes: sampleNodes } });
		expect(container.firstElementChild).toHaveAttribute("role", "tree");
	});

	it("renders root nodes", () => {
		render(TreeView, { props: { nodes: sampleNodes } });
		expect(screen.getByText("Parent")).toBeInTheDocument();
		expect(screen.getByText("Leaf")).toBeInTheDocument();
	});

	it("child nodes hidden until expanded", () => {
		render(TreeView, { props: { nodes: sampleNodes } });
		expect(screen.queryByText("Child 1")).not.toBeInTheDocument();
	});

	it("expands children on click", async () => {
		render(TreeView, { props: { nodes: sampleNodes } });
		await userEvent.click(screen.getByText("Parent"));
		expect(screen.getByText("Child 1")).toBeInTheDocument();
		expect(screen.getByText("Child 2")).toBeInTheDocument();
	});

	it("collapses children on second click", async () => {
		render(TreeView, { props: { nodes: sampleNodes } });
		await userEvent.click(screen.getByText("Parent"));
		expect(screen.getByText("Child 1")).toBeInTheDocument();
		await userEvent.click(screen.getByText("Parent"));
		expect(screen.queryByText("Child 1")).not.toBeInTheDocument();
	});

	it("selects a node on click", async () => {
		const onSelect = vi.fn();
		render(TreeView, { props: { nodes: sampleNodes, onSelect } });
		await userEvent.click(screen.getByText("Leaf"));
		expect(onSelect).toHaveBeenCalledWith("2");
	});

	it("treeitem buttons have aria-selected", async () => {
		render(TreeView, { props: { nodes: sampleNodes } });
		const leaf = screen.getByText("Leaf").closest("button");
		expect(leaf).toHaveAttribute("aria-selected", "false");
	});

	it("expanded parent has aria-expanded=true", async () => {
		render(TreeView, { props: { nodes: sampleNodes } });
		await userEvent.click(screen.getByText("Parent"));
		const btn = screen.getByText("Parent").closest("button");
		expect(btn).toHaveAttribute("aria-expanded", "true");
	});

	it("disabled node is not clickable", async () => {
		const onSelect = vi.fn();
		const nodes = [{ id: "1", label: "Disabled", disabled: true }];
		render(TreeView, { props: { nodes, onSelect } });
		await userEvent.click(screen.getByText("Disabled"));
		expect(onSelect).not.toHaveBeenCalled();
	});

	it("a11y: has no violations", async () => {
		const { container } = render(TreeView, { props: { nodes: sampleNodes } });
		await expectNoAxeViolations(container);
	});
});
