import type { Meta, StoryObj } from "@storybook/svelte";
import Label from "./Label.svelte";

const meta = {
	title: "Primitives/Label",
	component: Label,
	tags: ["autodocs"],
	argTypes: {
		for: { control: "text" },
	},
	args: {},
} satisfies Meta<Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
