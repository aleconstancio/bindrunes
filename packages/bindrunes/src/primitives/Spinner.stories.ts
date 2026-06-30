import type { Meta, StoryObj } from "@storybook/svelte";
import Spinner from "./Spinner.svelte";

const meta = {
	title: "Primitives/Spinner",
	component: Spinner,
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
		},
	},
	args: {
		size: "md",
	},
} satisfies Meta<Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
	args: { size: "sm" },
};

export const Large: Story = {
	args: { size: "lg" },
};
