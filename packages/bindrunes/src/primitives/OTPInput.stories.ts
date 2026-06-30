import type { Meta, StoryObj } from "@storybook/svelte";
import OTPInput from "./OTPInput.svelte";

const meta = {
	title: "Primitives/OTPInput",
	component: OTPInput,
	tags: ["autodocs"],
	argTypes: {
		length: { control: "number" },
		disabled: { control: "boolean" },
	},
	args: {
		length: 6,
		disabled: false,
	},
} satisfies Meta<OTPInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FourDigits: Story = {
	args: {
		length: 4,
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
