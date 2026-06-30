import type { Meta, StoryObj } from "@storybook/svelte";
import Popconfirm from "./Popconfirm.svelte";

const meta = {
	title: "Primitives/Popconfirm",
	component: Popconfirm,
	tags: ["autodocs"],
	argTypes: {
		open: { control: "boolean" },
		title: { control: "text" },
		description: { control: "text" },
		confirmLabel: { control: "text" },
		cancelLabel: { control: "text" },
		destructive: { control: "boolean" },
	},
	args: {
		open: true,
		title: "Are you sure?",
		confirmLabel: "Confirm",
		cancelLabel: "Cancel",
		destructive: false,
	},
} satisfies Meta<Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Destructive: Story = {
	args: {
		title: "Delete this item?",
		description: "This action cannot be undone.",
		confirmLabel: "Delete",
		destructive: true,
	},
};

export const Closed: Story = {
	args: {
		open: false,
	},
};
