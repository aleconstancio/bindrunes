import type { Meta, StoryObj } from "@storybook/svelte";
import Avatar from "./Avatar.svelte";

const meta = {
	title: "Primitives/Avatar",
	component: Avatar,
	tags: ["autodocs"],
	argTypes: {
		src: { control: "text" },
		alt: { control: "text" },
		fallback: { control: "text" },
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
		},
	},
	args: {
		fallback: "AB",
		size: "md",
	},
} satisfies Meta<Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithFallback: Story = {};

export const Small: Story = {
	args: {
		size: "sm",
		fallback: "SM",
	},
};

export const Large: Story = {
	args: {
		size: "lg",
		fallback: "LG",
	},
};

export const WithImage: Story = {
	args: {
		src: "https://picsum.photos/200",
		alt: "Random image",
		fallback: "RI",
	},
};
