import type { Meta, StoryObj } from "@storybook/svelte";
import AlertDialog from "./AlertDialog.svelte";

const meta = {
	title: "Primitives/AlertDialog",
	component: AlertDialog,
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
		description: "This action cannot be undone.",
		confirmLabel: "Confirm",
		cancelLabel: "Cancel",
		destructive: false,
	},
} satisfies Meta<AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Destructive: Story = {
	args: {
		title: "Delete item?",
		description: "This will permanently delete the item.",
		confirmLabel: "Delete",
		destructive: true,
	},
};

export const CustomLabels: Story = {
	args: {
		title: "Save changes?",
		description: "Unsaved changes will be lost.",
		confirmLabel: "Save",
		cancelLabel: "Discard",
	},
};
