import type { Meta, StoryObj } from "@storybook/svelte";
import SwipeableList from "./SwipeableList.svelte";

const meta = {
	title: "Primitives/SwipeableList",
	component: SwipeableList,
	tags: ["autodocs"],
	argTypes: {},
	args: {},
} satisfies Meta<SwipeableList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
