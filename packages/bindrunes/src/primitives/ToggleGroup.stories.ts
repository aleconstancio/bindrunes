import type { Meta, StoryObj } from "@storybook/svelte";
import ToggleGroup from "./ToggleGroup.svelte";

const meta = {
	title: "Primitives/ToggleGroup",
	component: ToggleGroup,
	tags: ["autodocs"],
	argTypes: {
		multiple: { control: "boolean" },
	},
	args: {
		multiple: false,
		options: [
			{ value: "bold", label: "B" },
			{ value: "italic", label: "I" },
			{ value: "underline", label: "U" },
		],
	},
} satisfies Meta<ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Multiple: Story = {
	args: {
		multiple: true,
	},
};

export const WithDisabled: Story = {
	args: {
		options: [
			{ value: "a", label: "A" },
			{ value: "b", label: "B", disabled: true },
			{ value: "c", label: "C" },
		],
	},
};
