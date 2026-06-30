import type { Meta, StoryObj } from "@storybook/svelte";
import Progress from "./Progress.svelte";

const meta = {
	title: "Primitives/Progress",
	component: Progress,
	tags: ["autodocs"],
	argTypes: {
		value: { control: "number" },
		max: { control: "number" },
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
		},
		variant: {
			control: "select",
			options: ["default", "success", "warning", "destructive"],
		},
		indeterminate: { control: "boolean" },
		showValue: { control: "boolean" },
		label: { control: "text" },
	},
	args: {
		value: 60,
		max: 100,
		size: "md",
		variant: "default",
		indeterminate: false,
		showValue: false,
	},
} satisfies Meta<Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
	args: {
		label: "Uploading...",
		showValue: true,
		value: 45,
	},
};

export const Success: Story = {
	args: {
		variant: "success",
		value: 100,
	},
};

export const Warning: Story = {
	args: {
		variant: "warning",
		value: 75,
	},
};

export const Destructive: Story = {
	args: {
		variant: "destructive",
		value: 90,
	},
};

export const Indeterminate: Story = {
	args: {
		indeterminate: true,
		label: "Loading...",
	},
};

export const Small: Story = {
	args: {
		size: "sm",
		value: 50,
	},
};

export const Large: Story = {
	args: {
		size: "lg",
		value: 50,
	},
};
