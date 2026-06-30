import type { Meta, StoryObj } from "@storybook/svelte";
import Input from "./Input.svelte";

const meta = {
	title: "Primitives/Input",
	component: Input,
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: "select",
			options: [
				"text",
				"email",
				"password",
				"number",
				"tel",
				"url",
				"search",
				"date",
				"time",
				"textarea",
			],
		},
		placeholder: { control: "text" },
		label: { control: "text" },
		error: { control: "text" },
		helper: { control: "text" },
		disabled: { control: "boolean" },
		required: { control: "boolean" },
		value: { control: "text" },
	},
	args: {
		placeholder: "Enter text...",
	},
} satisfies Meta<Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const WithLabel: Story = {
	args: {
		label: "Email",
		placeholder: "you@example.com",
		type: "email",
	},
};

export const WithHelper: Story = {
	args: {
		label: "Password",
		type: "password",
		helper: "Must be at least 8 characters",
		placeholder: "Enter password...",
	},
};

export const WithError: Story = {
	args: {
		label: "Email",
		type: "email",
		error: "Please enter a valid email address",
		value: "invalid-email",
	},
};

export const Required: Story = {
	args: {
		label: "Full Name",
		required: true,
		placeholder: "Enter your name...",
	},
};

export const Disabled: Story = {
	args: {
		label: "Disabled",
		disabled: true,
		value: "Cannot edit this",
	},
};

export const Textarea: Story = {
	args: {
		type: "textarea",
		label: "Message",
		placeholder: "Write your message here...",
	},
};

export const NumberInput: Story = {
	args: {
		type: "number",
		label: "Quantity",
		placeholder: "0",
	},
};
