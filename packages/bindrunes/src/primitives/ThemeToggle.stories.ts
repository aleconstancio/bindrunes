import type { Meta, StoryObj } from "@storybook/svelte";
import ThemeToggle from "./ThemeToggle.svelte";

const meta = {
	title: "Primitives/ThemeToggle",
	component: ThemeToggle,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["icon", "outline"],
		},
	},
	args: {
		variant: "outline",
	},
} satisfies Meta<ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Icon: Story = {
	args: {
		variant: "icon",
	},
};
