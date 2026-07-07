import type { Meta, StoryObj } from "@storybook/svelte";
import Dialog from "./Dialog.svelte";

const meta = {
	title: "Primitives/Dialog",
	component: Dialog,
	tags: ["autodocs"],
	argTypes: {
		open: { control: "boolean" },
		title: { control: "text" },
		size: {
			control: "select",
			options: ["sm", "md", "lg", "xl", "full"],
		},
		closeOnOverlayClick: { control: "boolean" },
	},
	args: {
		title: "Dialog Title",
		size: "md",
		closeOnOverlayClick: true,
	},
} satisfies Meta<Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		open: true,
		children: "This is the dialog content.",
	},
};

export const Small: Story = {
	args: {
		open: true,
		size: "sm",
		title: "Small Dialog",
		children: "A compact dialog.",
	},
};

export const Large: Story = {
	args: {
		open: true,
		size: "lg",
		title: "Large Dialog",
		children: "A larger dialog for more content.",
	},
};

export const FullSize: Story = {
	args: {
		open: true,
		size: "full",
		title: "Full Size Dialog",
		children: "This dialog takes up most of the viewport.",
	},
};

export const WithoutTitle: Story = {
	args: {
		open: true,
		children: "Dialog without a title.",
	},
};

export const WithActions: Story = {
	args: {
		open: true,
		title: "Confirm Action",
		children: "Are you sure you want to proceed?",
		actions: "Confirm",
	},
};

export const NonClosable: Story = {
	args: {
		open: true,
		title: "Important",
		closeOnOverlayClick: false,
		children: "You must use the close button to dismiss this dialog.",
	},
};
