import type { Meta, StoryObj } from "@storybook/svelte";
import ContextMenu from "./ContextMenu.svelte";

const meta = {
	title: "Primitives/ContextMenu",
	component: ContextMenu,
	tags: ["autodocs"],
	argTypes: {
		items: { control: "object" },
	},
	args: {
		items: [
			{ label: "Copy", value: "copy" },
			{ label: "Paste", value: "paste" },
			{ label: "Cut", value: "cut" },
			{ label: "Delete", value: "delete" },
		],
	},
} satisfies Meta<ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		Component: ContextMenu,
		props: {
			items: [
				{ label: "Copy", value: "copy" },
				{ label: "Paste", value: "paste" },
				{ label: "Cut", value: "cut" },
				{ label: "Delete", value: "delete" },
			],
		},
		slot: {
			default: () => ({
				tag: "div",
				props: { class: "p-8 bg-muted rounded" },
				children: "Right-click here",
			}),
		},
	}),
};
