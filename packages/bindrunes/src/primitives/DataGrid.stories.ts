import type { Meta, StoryObj } from "@storybook/svelte";
import DataGrid from "./DataGrid.svelte";

const meta = {
	title: "Primitives/DataGrid",
	component: DataGrid,
	tags: ["autodocs"],
	argTypes: {
		columns: { control: "object" },
		rows: { control: "object" },
		rowKey: { control: "text" },
		selectable: { control: "boolean" },
		emptyText: { control: "text" },
	},
	args: {
		columns: [
			{ key: "name", label: "Name", sortable: true },
			{ key: "email", label: "Email" },
			{ key: "role", label: "Role", sortable: true },
		],
		rows: [
			{ id: "1", name: "Alice", email: "alice@example.com", role: "Admin" },
			{ id: "2", name: "Bob", email: "bob@example.com", role: "User" },
			{ id: "3", name: "Charlie", email: "charlie@example.com", role: "User" },
		],
		rowKey: "id",
		selectable: false,
		emptyText: "No data available",
	},
} satisfies Meta<DataGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selectable: Story = {
	args: {
		selectable: true,
	},
};

export const Empty: Story = {
	args: {
		rows: [],
	},
};

export const Sortable: Story = {
	args: {
		columns: [
			{ key: "name", label: "Name", sortable: true },
			{ key: "age", label: "Age", sortable: true },
		],
		rows: [
			{ id: "1", name: "Alice", age: 30 },
			{ id: "2", name: "Bob", age: 25 },
		],
	},
};
