import type { Meta, StoryObj } from "@storybook/svelte";
import DropdownMenu from "./DropdownMenu.svelte";

const meta = {
	title: "Primitives/DropdownMenu",
	component: DropdownMenu,
	tags: ["autodocs"],
	argTypes: {
		side: {
			control: "select",
			options: ["top", "right", "bottom", "left"],
		},
		align: {
			control: "select",
			options: ["start", "center", "end"],
		},
	},
	args: {
		items: [
			{ value: "edit", label: "Edit" },
			{ value: "duplicate", label: "Duplicate" },
			{ value: "delete", label: "Delete" },
		],
		side: "bottom",
		align: "start",
	},
} satisfies Meta<DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		Component: DropdownMenu,
		props: {
			items: [
				{ value: "edit", label: "Edit" },
				{ value: "duplicate", label: "Duplicate" },
				{ value: "delete", label: "Delete" },
			],
		},
		slot: {
			default: () => ({
				tag: "button",
				props: { class: "px-4 py-2 bg-primary text-primary-foreground rounded" },
				children: "Open Menu",
			}),
		},
	}),
};
