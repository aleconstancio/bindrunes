import type { Meta, StoryObj } from "@storybook/svelte";
import Checkbox from "./Checkbox.svelte";

const meta = {
	title: "Primitives/Checkbox",
	component: Checkbox,
	tags: ["autodocs"],
	argTypes: {
		checked: { control: "boolean" },
		indeterminate: { control: "boolean" },
		disabled: { control: "boolean" },
		label: { control: "text" },
		error: { control: "text" },
		required: { control: "boolean" },
	},
	args: {
		checked: false,
		disabled: false,
		required: false,
	},
} satisfies Meta<Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
	args: {
		checked: true,
		label: "Checked",
	},
};

export const Indeterminate: Story = {
	args: {
		indeterminate: true,
		label: "Indeterminate",
	},
};

export const WithLabel: Story = {
	args: {
		label: "Accept terms and conditions",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		label: "Disabled",
	},
};

export const WithError: Story = {
	args: {
		error: "This field is required",
		label: "Required field",
	},
};
