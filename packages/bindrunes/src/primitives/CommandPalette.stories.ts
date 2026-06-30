import type { Meta, StoryObj } from "@storybook/svelte";
import CommandPalette from "./CommandPalette.svelte";

const meta = {
	title: "Primitives/CommandPalette",
	component: CommandPalette,
	tags: ["autodocs"],
	argTypes: {
		open: { control: "boolean" },
		placeholder: { control: "text" },
	},
	args: {
		open: true,
		placeholder: "Search commands...",
		items: [
			{ id: "1", label: "New File" },
			{ id: "2", label: "Open File" },
			{ id: "3", label: "Save File" },
			{ id: "4", label: "Delete File" },
		],
	},
} satisfies Meta<CommandPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Closed: Story = {
	args: {
		open: false,
	},
};

export const WithKeywords: Story = {
	args: {
		items: [
			{ id: "1", label: "Dark Mode", keywords: ["theme", "dark", "night"] },
			{ id: "2", label: "Light Mode", keywords: ["theme", "light", "day"] },
			{ id: "3", label: "System Mode", keywords: ["theme", "system", "auto"] },
		],
	},
};
