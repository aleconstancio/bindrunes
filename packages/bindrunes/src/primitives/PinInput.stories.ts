import type { Meta, StoryObj } from "@storybook/svelte";
import PinInput from "./PinInput.svelte";

const meta = {
	title: "Primitives/PinInput",
	component: PinInput,
	tags: ["autodocs"],
	argTypes: {
		placeholder: { control: "text" },
		disabled: { control: "boolean" },
		type: {
			control: "select",
			options: ["text", "password"],
		},
		length: { control: "number" },
	},
	args: {
		placeholder: "\u25CB",
		disabled: false,
		type: "text",
		length: 4,
	},
} satisfies Meta<PinInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SixDigits: Story = {
	args: {
		length: 6,
	},
};

export const Password: Story = {
	args: {
		type: "password",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
