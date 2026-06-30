import type { Meta, StoryObj } from "@storybook/svelte";
import RichTextEditor from "./RichTextEditor.svelte";

const meta = {
	title: "Primitives/RichTextEditor",
	component: RichTextEditor,
	tags: ["autodocs"],
	argTypes: {
		value: { control: "text" },
		placeholder: { control: "text" },
		disabled: { control: "boolean" },
	},
	args: {
		placeholder: "Write something...",
		disabled: false,
	},
} satisfies Meta<RichTextEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
	args: {
		value: "# Hello World\n\nThis is a **bold** text and *italic* text.",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		value: "Read only content",
	},
};
