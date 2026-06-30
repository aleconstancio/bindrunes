import type { Meta, StoryObj } from "@storybook/svelte";
import Pagination from "./Pagination.svelte";

const meta = {
	title: "Primitives/Pagination",
	component: Pagination,
	tags: ["autodocs"],
	argTypes: {
		currentPage: { control: "number" },
		totalPages: { control: "number" },
		siblingCount: { control: "number" },
		showTotal: { control: "boolean" },
	},
	args: {
		currentPage: 1,
		totalPages: 10,
		siblingCount: 2,
		showTotal: true,
	},
} satisfies Meta<Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MiddlePage: Story = {
	args: {
		currentPage: 5,
		totalPages: 20,
	},
};

export const LastPage: Story = {
	args: {
		currentPage: 10,
		totalPages: 10,
	},
};

export const SinglePage: Story = {
	args: {
		currentPage: 1,
		totalPages: 1,
	},
};
