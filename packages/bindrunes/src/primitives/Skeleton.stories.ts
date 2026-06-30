import type { Meta, StoryObj } from "@storybook/svelte";
import Skeleton from "./Skeleton.svelte";

const meta = {
	title: "Primitives/Skeleton",
	component: Skeleton,
	tags: ["autodocs"],
	argTypes: {
		lines: { control: "number" },
		width: { control: "text" },
	},
	args: {
		lines: 3,
		width: "100%",
	},
} satisfies Meta<Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleLine: Story = {
	args: {
		lines: 1,
	},
};

export const ManyLines: Story = {
	args: {
		lines: 5,
	},
};

export const CustomWidth: Story = {
	args: {
		lines: 3,
		width: "60%",
	},
};
