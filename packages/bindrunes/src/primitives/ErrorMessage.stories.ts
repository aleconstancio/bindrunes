import type { Meta, StoryObj } from "@storybook/svelte";
import ErrorMessage from "./ErrorMessage.svelte";

const meta = {
	title: "Primitives/ErrorMessage",
	component: ErrorMessage,
	tags: ["autodocs"],
	argTypes: {
		id: { control: "text" },
	},
	args: {
		id: "error-1",
	},
} satisfies Meta<ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		id: "error-1",
	},
};

export const WithId: Story = {
	args: {
		id: "field-error",
	},
};
