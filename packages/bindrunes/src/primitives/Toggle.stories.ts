import type { Meta, StoryObj } from "@storybook/svelte";
import Toggle from "./Toggle.svelte";

const meta = {
	title: "Primitives/Toggle",
	component: Toggle,
	tags: ["autodocs"],
	argTypes: {
		pressed: { control: "boolean" },
		disabled: { control: "boolean" },
	},
	args: {
		pressed: false,
		disabled: false,
	},
} satisfies Meta<Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Pressed: Story = {
	args: {
		pressed: true,
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
