import type { Meta, StoryObj } from "@storybook/svelte";
import Badge from "./Badge.svelte";

const meta = {
	title: "Primitives/Badge",
	component: Badge,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: [
				"default",
				"primary",
				"secondary",
				"success",
				"warning",
				"destructive",
				"info",
				"outline",
			],
			description: "The visual variant of the badge",
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
			description: "The size of the badge",
		},
		removable: { control: "boolean" },
	},
	args: {
		variant: "default",
		size: "md",
	},
} satisfies Meta<Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Badge",
	},
};

export const Primary: Story = {
	args: {
		variant: "primary",
		children: "Primary",
	},
};

export const Secondary: Story = {
	args: {
		variant: "secondary",
		children: "Secondary",
	},
};

export const Success: Story = {
	args: {
		variant: "success",
		children: "Success",
	},
};

export const Warning: Story = {
	args: {
		variant: "warning",
		children: "Warning",
	},
};

export const Destructive: Story = {
	args: {
		variant: "destructive",
		children: "Error",
	},
};

export const Info: Story = {
	args: {
		variant: "info",
		children: "Info",
	},
};

export const Outline: Story = {
	args: {
		variant: "outline",
		children: "Outline",
	},
};

export const Small: Story = {
	args: {
		size: "sm",
		children: "Small",
	},
};

export const Large: Story = {
	args: {
		size: "lg",
		children: "Large",
	},
};

export const Removable: Story = {
	args: {
		removable: true,
		children: "Remove me",
	},
};
