import type { Meta, StoryObj } from "@storybook/svelte";
import RatingGroup from "./RatingGroup.svelte";

const meta = {
	title: "Primitives/RatingGroup",
	component: RatingGroup,
	tags: ["autodocs"],
	argTypes: {
		value: { control: "number" },
		max: { control: "number" },
		disabled: { control: "boolean" },
	},
	args: {
		value: 0,
		max: 5,
		disabled: false,
	},
} satisfies Meta<RatingGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PreSelected: Story = {
	args: {
		value: 3,
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		value: 4,
	},
};

export const TenStars: Story = {
	args: {
		max: 10,
		value: 7,
	},
};
