import type { Meta, StoryObj } from "@storybook/svelte";
import BottomSheet from "./BottomSheet.svelte";

const meta = {
	title: "Primitives/BottomSheet",
	component: BottomSheet,
	tags: ["autodocs"],
	argTypes: {
		open: { control: "boolean" },
		title: { control: "text" },
	},
	args: {
		open: true,
		title: "Bottom Sheet",
	},
} satisfies Meta<BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Closed: Story = {
	args: {
		open: false,
	},
};

export const WithTitle: Story = {
	args: {
		title: "Options",
	},
};
