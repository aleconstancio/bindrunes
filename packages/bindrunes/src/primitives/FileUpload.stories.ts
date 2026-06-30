import type { Meta, StoryObj } from "@storybook/svelte";
import FileUpload from "./FileUpload.svelte";

const meta = {
	title: "Primitives/FileUpload",
	component: FileUpload,
	tags: ["autodocs"],
	argTypes: {
		accept: { control: "object" },
		maxFiles: { control: "number" },
		maxSize: { control: "number" },
		multiple: { control: "boolean" },
	},
	args: {
		maxFiles: 10,
		maxSize: 10485760,
		multiple: true,
	},
} satisfies Meta<FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleFile: Story = {
	args: {
		multiple: false,
		maxFiles: 1,
	},
};

export const ImagesOnly: Story = {
	args: {
		accept: ["image/*"],
	},
};
