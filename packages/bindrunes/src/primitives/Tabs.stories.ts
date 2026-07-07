import type { Meta, StoryObj } from "@storybook/svelte";
import Tabs from "./Tabs.svelte";

const meta = {
	title: "Primitives/Tabs",
	component: Tabs,
	tags: ["autodocs"],
	argTypes: {
		orientation: {
			control: "select",
			options: ["horizontal", "vertical"],
		},
		value: { control: "text" },
	},
	args: {
		orientation: "horizontal",
		value: "tab1",
	},
} satisfies Meta<Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: "tab1",
	},
};
