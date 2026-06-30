import type { Meta, StoryObj } from "@storybook/svelte";
import Drawer from "./Drawer.svelte";

const meta = {
	title: "Primitives/Drawer",
	component: Drawer,
	tags: ["autodocs"],
	argTypes: {
		open: { control: "boolean" },
		side: {
			control: "select",
			options: ["left", "right", "top", "bottom"],
		},
		title: { control: "text" },
		closeOnOverlayClick: { control: "boolean" },
	},
	args: {
		open: true,
		side: "right",
		title: "Drawer Title",
		closeOnOverlayClick: true,
	},
} satisfies Meta<Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = {};

export const Left: Story = {
	args: {
		side: "left",
	},
};

export const Bottom: Story = {
	args: {
		side: "bottom",
	},
};

export const Top: Story = {
	args: {
		side: "top",
	},
};

export const Closed: Story = {
	args: {
		open: false,
	},
};
