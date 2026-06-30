import type { Meta, StoryObj } from "@storybook/svelte";
import TimeField from "./TimeField.svelte";

const meta = {
	title: "Primitives/TimeField",
	component: TimeField,
	tags: ["autodocs"],
	argTypes: {
		disabled: { control: "boolean" },
	},
	args: {
		disabled: false,
	},
} satisfies Meta<TimeField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
