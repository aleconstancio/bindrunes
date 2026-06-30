import type { Meta, StoryObj } from "@storybook/svelte";
import BouncingDots from "./BouncingDots.svelte";

const meta = {
	title: "Primitives/BouncingDots",
	component: BouncingDots,
	tags: ["autodocs"],
	argTypes: {
		color: { control: "text" },
	},
	args: {
		color: "bg-muted-foreground",
	},
} satisfies Meta<BouncingDots>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
	args: {
		color: "bg-primary",
	},
};

export const Success: Story = {
	args: {
		color: "bg-success",
	},
};
