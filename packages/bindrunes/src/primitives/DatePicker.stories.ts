import type { Meta, StoryObj } from "@storybook/svelte";
import DatePicker from "./DatePicker.svelte";

const meta = {
	title: "Primitives/DatePicker",
	component: DatePicker,
	tags: ["autodocs"],
	argTypes: {
		label: { control: "text" },
		disabled: { control: "boolean" },
	},
	args: {
		label: "Select date",
		disabled: false,
	},
} satisfies Meta<DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};

export const WithoutLabel: Story = {
	args: {
		label: "",
	},
};
