import type { Meta, StoryObj } from "@storybook/svelte";
import SwipeableItem from "./SwipeableItem.svelte";

const meta = {
	title: "Primitives/SwipeableItem",
	component: SwipeableItem,
	tags: ["autodocs"],
	argTypes: {},
	args: {},
} satisfies Meta<SwipeableItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
