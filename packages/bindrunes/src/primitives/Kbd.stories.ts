import type { Meta, StoryObj } from "@storybook/svelte";
import Kbd from "./Kbd.svelte";

const meta = {
	title: "Primitives/Kbd",
	component: Kbd,
	tags: ["autodocs"],
	argTypes: {},
	args: {},
} satisfies Meta<Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const CtrlK: Story = {
	args: {},
};

export const Enter: Story = {
	args: {},
};

export const Escape: Story = {
	args: {},
};
