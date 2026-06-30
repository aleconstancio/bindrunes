import type { Meta, StoryObj } from "@storybook/svelte";
import TreeView from "./TreeView.svelte";

const meta = {
	title: "Primitives/TreeView",
	component: TreeView,
	tags: ["autodocs"],
	argTypes: {
		selectedId: { control: "text" },
		nodes: { control: "object" },
	},
	args: {
		nodes: [
			{
				id: "1",
				label: "Documents",
				children: [
					{ id: "1-1", label: "Report.txt" },
					{ id: "1-2", label: "Notes.md" },
				],
			},
			{
				id: "2",
				label: "Images",
				children: [
					{ id: "2-1", label: "Photo.jpg" },
					{ id: "2-2", label: "Screenshot.png" },
				],
			},
			{ id: "3", label: "readme.md" },
		],
		expandedIds: ["1"],
	},
} satisfies Meta<TreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSelection: Story = {
	args: {
		selectedId: "1-1",
		expandedIds: ["1"],
	},
};

export const AllExpanded: Story = {
	args: {
		expandedIds: ["1", "2"],
	},
};
