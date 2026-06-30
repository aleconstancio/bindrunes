import type { Meta, StoryObj } from "@storybook/svelte";
import ColorPicker from "./ColorPicker.svelte";

const meta = {
	title: "Primitives/ColorPicker",
	component: ColorPicker,
	tags: ["autodocs"],
	argTypes: {
		value: { control: "text" },
		disabled: { control: "boolean" },
	},
	args: {
		value: "oklch(0.65 0.1 265)",
		disabled: false,
	},
} satisfies Meta<ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};

export const CustomColor: Story = {
	args: {
		value: "oklch(0.7 0.15 145)",
	},
};
