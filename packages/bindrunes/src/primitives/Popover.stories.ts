import type { Meta, StoryObj } from "@storybook/svelte";
import Popover from "./Popover.svelte";

const meta = {
	title: "Primitives/Popover",
	component: Popover,
	tags: ["autodocs"],
	argTypes: {
		open: { control: "boolean" },
		side: {
			control: "select",
			options: ["top", "right", "bottom", "left"],
		},
		align: {
			control: "select",
			options: ["start", "center", "end"],
		},
	},
	args: {
		side: "bottom",
		align: "center",
	},
} satisfies Meta<Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Top: Story = {
	args: {
		side: "top",
	},
};

export const Open: Story = {
	args: {
		open: true,
	},
};
