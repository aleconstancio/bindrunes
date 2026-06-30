import type { Meta, StoryObj } from "@storybook/svelte";
import Separator from "./Separator.svelte";

const meta = {
	title: "Primitives/Separator",
	component: Separator,
	tags: ["autodocs"],
	argTypes: {
		orientation: {
			control: "select",
			options: ["horizontal", "vertical"],
		},
	},
	args: {
		orientation: "horizontal",
	},
} satisfies Meta<Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};

export const Vertical: Story = {
	args: {
		orientation: "vertical",
	},
};
