import type { Meta, StoryObj } from "@storybook/svelte";
import Slider from "./Slider.svelte";

const meta = {
	title: "Primitives/Slider",
	component: Slider,
	tags: ["autodocs"],
	argTypes: {
		value: { control: "object" },
		min: { control: "number" },
		max: { control: "number" },
		step: { control: "number" },
		disabled: { control: "boolean" },
	},
	args: {
		value: [50],
		min: 0,
		max: 100,
		step: 1,
		disabled: false,
	},
} satisfies Meta<Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithStep: Story = {
	args: {
		step: 25,
		value: [50],
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		value: [30],
	},
};

export const CustomRange: Story = {
	args: {
		min: 0,
		max: 200,
		value: [100],
	},
};
