import type { Meta, StoryObj } from "@storybook/svelte";
import Tooltip from "./Tooltip.svelte";

const meta = {
	title: "Primitives/Tooltip",
	component: Tooltip,
	tags: ["autodocs"],
	argTypes: {
		content: { control: "text" },
		side: {
			control: "select",
			options: ["top", "right", "bottom", "left"],
		},
	},
	args: {
		content: "Tooltip content",
		side: "top",
	},
} satisfies Meta<Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Right: Story = {
	args: {
		side: "right",
	},
};

export const Bottom: Story = {
	args: {
		side: "bottom",
	},
};

export const Left: Story = {
	args: {
		side: "left",
	},
};
