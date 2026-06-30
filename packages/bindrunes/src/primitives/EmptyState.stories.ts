import type { Meta, StoryObj } from "@storybook/svelte";
import EmptyState from "./EmptyState.svelte";

const meta = {
	title: "Primitives/EmptyState",
	component: EmptyState,
	tags: ["autodocs"],
	argTypes: {
		title: { control: "text" },
		description: { control: "text" },
	},
	args: {
		title: "No items found",
		description: "Get started by creating your first item.",
	},
} satisfies Meta<EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TitleOnly: Story = {
	args: {
		title: "Nothing here",
		description: undefined,
	},
};

export const DescriptionOnly: Story = {
	args: {
		title: undefined,
		description: "No data to display.",
	},
};
