import type { Meta, StoryObj } from "@storybook/svelte";
import ScrollArea from "./ScrollArea.svelte";

const meta = {
	title: "Primitives/ScrollArea",
	component: ScrollArea,
	tags: ["autodocs"],
	argTypes: {},
	args: {},
} satisfies Meta<ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
