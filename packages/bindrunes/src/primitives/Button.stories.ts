import type { Meta, StoryObj } from "@storybook/svelte";
import Button from "./Button.svelte";

const meta = {
	title: "Primitives/Button",
	component: Button,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: [
				"primary",
				"secondary",
				"outline",
				"ghost",
				"destructive",
				"link",
				"soft",
				"subtle",
			],
			description: "The visual variant of the button",
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
			description: "The size of the button",
		},
		fullWidth: { control: "boolean" },
		disabled: { control: "boolean" },
		loading: { control: "boolean" },
		iconOnly: { control: "boolean" },
		type: {
			control: "select",
			options: ["button", "submit", "reset"],
		},
	},
	args: {
		variant: "primary",
		size: "md",
	},
} satisfies Meta<Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: "Primary",
	},
};

export const Secondary: Story = {
	args: {
		variant: "secondary",
		children: "Secondary",
	},
};

export const Outline: Story = {
	args: {
		variant: "outline",
		children: "Outline",
	},
};

export const Ghost: Story = {
	args: {
		variant: "ghost",
		children: "Ghost",
	},
};

export const Destructive: Story = {
	args: {
		variant: "destructive",
		children: "Delete",
	},
};

export const Link: Story = {
	args: {
		variant: "link",
		children: "Link button",
	},
};

export const Soft: Story = {
	args: {
		variant: "soft",
		children: "Soft",
	},
};

export const Subtle: Story = {
	args: {
		variant: "subtle",
		children: "Subtle",
	},
};

export const Small: Story = {
	args: {
		size: "sm",
		children: "Small",
	},
};

export const Medium: Story = {
	args: {
		size: "md",
		children: "Medium",
	},
};

export const Large: Story = {
	args: {
		size: "lg",
		children: "Large",
	},
};

export const Loading: Story = {
	args: {
		loading: true,
		children: "Loading...",
	},
};

export const FullWidth: Story = {
	args: {
		fullWidth: true,
		children: "Full Width",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		children: "Disabled",
	},
};
