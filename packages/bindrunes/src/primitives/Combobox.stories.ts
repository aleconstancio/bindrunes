import type { Meta, StoryObj } from "@storybook/svelte";
import Combobox from "./Combobox.svelte";

const meta = {
	title: "Primitives/Combobox",
	component: Combobox,
	tags: ["autodocs"],
	argTypes: {
		value: { control: "text" },
		placeholder: { control: "text" },
		disabled: { control: "boolean" },
	},
	args: {
		placeholder: "Search...",
		disabled: false,
		options: [
			{ value: "apple", label: "Apple" },
			{ value: "banana", label: "Banana" },
			{ value: "cherry", label: "Cherry" },
			{ value: "date", label: "Date" },
			{ value: "elderberry", label: "Elderberry" },
		],
	},
} satisfies Meta<Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};

export const WithValue: Story = {
	args: {
		value: "apple",
	},
};
