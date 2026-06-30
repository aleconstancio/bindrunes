import type { Meta, StoryObj } from "@storybook/svelte";
import Select from "./Select.svelte";

const meta = {
	title: "Primitives/Select",
	component: Select,
	tags: ["autodocs"],
	argTypes: {
		value: { control: "text" },
		label: { control: "text" },
		placeholder: { control: "text" },
		disabled: { control: "boolean" },
		required: { control: "boolean" },
		error: { control: "text" },
	},
	args: {
		placeholder: "Select...",
		disabled: false,
		required: false,
		options: [
			{ value: "apple", label: "Apple" },
			{ value: "banana", label: "Banana" },
			{ value: "cherry", label: "Cherry" },
		],
	},
} satisfies Meta<Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
	args: {
		label: "Fruit",
	},
};

export const WithError: Story = {
	args: {
		label: "Fruit",
		error: "Please select a fruit",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
