import type { Meta, StoryObj } from "@storybook/svelte";
import Switch from "./Switch.svelte";

const meta = {
	title: "Primitives/Switch",
	component: Switch,
	tags: ["autodocs"],
	argTypes: {
		checked: { control: "boolean" },
		disabled: { control: "boolean" },
		label: { control: "text" },
		error: { control: "text" },
	},
	args: {
		checked: false,
		disabled: false,
	},
} satisfies Meta<Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
	args: {
		checked: true,
		label: "Enabled",
	},
};

export const WithLabel: Story = {
	args: {
		label: "Dark mode",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};

export const WithError: Story = {
	args: {
		error: "This setting cannot be changed",
		label: "Locked setting",
	},
};
