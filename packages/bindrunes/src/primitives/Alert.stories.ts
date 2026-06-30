import type { Meta, StoryObj } from "@storybook/svelte";
import Alert from "./Alert.svelte";

const meta = {
	title: "Primitives/Alert",
	component: Alert,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["info", "success", "warning", "destructive"],
		},
		title: { control: "text" },
		description: { control: "text" },
		closable: { control: "boolean" },
	},
	args: {
		variant: "info",
		title: "Information",
		description: "This is an informational alert.",
	},
} satisfies Meta<Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};

export const Success: Story = {
	args: {
		variant: "success",
		title: "Success",
		description: "Your changes have been saved.",
	},
};

export const Warning: Story = {
	args: {
		variant: "warning",
		title: "Warning",
		description: "Please review before proceeding.",
	},
};

export const Destructive: Story = {
	args: {
		variant: "destructive",
		title: "Error",
		description: "Something went wrong.",
	},
};

export const Closable: Story = {
	args: {
		variant: "info",
		title: "Closable Alert",
		description: "Click the X to dismiss.",
		closable: true,
	},
};
