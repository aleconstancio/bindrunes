import type { Meta, StoryObj } from "@storybook/svelte";
import Sheet from "./Sheet.svelte";

const meta = {
	title: "Primitives/Sheet",
	component: Sheet,
	tags: ["autodocs"],
	argTypes: {
		open: { control: "boolean" },
		side: {
			control: "select",
			options: ["left", "right", "top", "bottom"],
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
		},
		title: { control: "text" },
	},
	args: {
		open: true,
		side: "right",
		size: "md",
		title: "Sheet Title",
	},
} satisfies Meta<Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = {};

export const Left: Story = {
	args: {
		side: "left",
	},
};

export const Small: Story = {
	args: {
		size: "sm",
	},
};

export const Large: Story = {
	args: {
		size: "lg",
	},
};
