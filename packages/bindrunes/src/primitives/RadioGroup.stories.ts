import type { Meta, StoryObj } from "@storybook/svelte";
import RadioGroup from "./RadioGroup.svelte";

const meta = {
	title: "Primitives/RadioGroup",
	component: RadioGroup,
	tags: ["autodocs"],
	argTypes: {
		value: { control: "text" },
		label: { control: "text" },
	},
	args: {
		label: "Choose an option",
		options: [
			{ value: "option1", label: "Option 1" },
			{ value: "option2", label: "Option 2" },
			{ value: "option3", label: "Option 3" },
		],
	},
} satisfies Meta<RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutLabel: Story = {
	args: {
		label: undefined,
	},
};

export const WithDisabled: Story = {
	args: {
		options: [
			{ value: "a", label: "Available" },
			{ value: "b", label: "Disabled", disabled: true },
			{ value: "c", label: "Also available" },
		],
	},
};
