import type { Meta, StoryObj } from "@storybook/svelte";
import Collapsible from "./Collapsible.svelte";

const meta = {
	title: "Primitives/Collapsible",
	component: Collapsible,
	tags: ["autodocs"],
	argTypes: {
		open: { control: "boolean" },
		disabled: { control: "boolean" },
	},
	args: {
		open: false,
		disabled: false,
	},
} satisfies Meta<Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
	args: {
		open: true,
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
