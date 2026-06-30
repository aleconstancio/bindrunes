import type { Meta, StoryObj } from "@storybook/svelte";
import PasswordInput from "./PasswordInput.svelte";

const meta = {
	title: "Primitives/PasswordInput",
	component: PasswordInput,
	tags: ["autodocs"],
	argTypes: {
		value: { control: "text" },
		label: { control: "text" },
		placeholder: { control: "text" },
		required: { control: "boolean" },
		disabled: { control: "boolean" },
		error: { control: "text" },
	},
	args: {
		placeholder: "Enter password",
		required: false,
		disabled: false,
	},
} satisfies Meta<PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
	args: {
		label: "Password",
	},
};

export const WithError: Story = {
	args: {
		label: "Password",
		error: "Password must be at least 8 characters",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
