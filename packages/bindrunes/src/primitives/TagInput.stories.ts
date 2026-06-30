import type { Meta, StoryObj } from "@storybook/svelte";
import TagInput from "./TagInput.svelte";

const meta = {
	title: "Primitives/TagInput",
	component: TagInput,
	tags: ["autodocs"],
	argTypes: {
		placeholder: { control: "text" },
		disabled: { control: "boolean" },
		maxTags: { control: "number" },
		label: { control: "text" },
	},
	args: {
		placeholder: "Add tag...",
		disabled: false,
	},
} satisfies Meta<TagInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
	args: {
		label: "Tags",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};

export const WithMaxTags: Story = {
	args: {
		maxTags: 3,
		label: "Max 3 tags",
	},
};
