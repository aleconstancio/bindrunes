import type { Meta, StoryObj } from "@storybook/svelte";
import NumberInput from "./NumberInput.svelte";

const meta = {
	title: "Primitives/NumberInput",
	component: NumberInput,
	tags: ["autodocs"],
	argTypes: {
		value: { control: "number" },
		min: { control: "number" },
		max: { control: "number" },
		step: { control: "number" },
		disabled: { control: "boolean" },
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
		},
		label: { control: "text" },
	},
	args: {
		value: 0,
		step: 1,
		disabled: false,
		size: "md",
	},
} satisfies Meta<NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithMinMax: Story = {
	args: {
		min: 0,
		max: 100,
		value: 50,
	},
};

export const Small: Story = {
	args: {
		size: "sm",
	},
};

export const Large: Story = {
	args: {
		size: "lg",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		value: 5,
	},
};

export const WithLabel: Story = {
	args: {
		label: "Quantity",
		value: 1,
		min: 1,
		max: 10,
	},
};
