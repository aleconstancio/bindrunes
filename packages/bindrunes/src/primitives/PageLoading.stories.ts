import type { Meta, StoryObj } from "@storybook/svelte";
import PageLoading from "./PageLoading.svelte";

const meta = {
	title: "Primitives/PageLoading",
	component: PageLoading,
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: "select",
			options: ["table", "cards", "form", "text"],
		},
		lines: { control: "number" },
		rows: { control: "number" },
	},
	args: {
		type: "text",
		lines: 3,
		rows: 3,
	},
} satisfies Meta<PageLoading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
	args: { type: "text", lines: 3 },
};

export const Table: Story = {
	args: { type: "table", rows: 5 },
};

export const Cards: Story = {
	args: { type: "cards", rows: 3 },
};

export const Form: Story = {
	args: { type: "form", lines: 4 },
};
