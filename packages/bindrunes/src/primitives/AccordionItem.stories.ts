import type { Meta, StoryObj } from "@storybook/svelte";
import AccordionItem from "./AccordionItem.svelte";

const meta = {
	title: "Primitives/AccordionItem",
	component: AccordionItem,
	tags: ["autodocs"],
	argTypes: {
		value: { control: "text" },
		disabled: { control: "boolean" },
	},
	args: {
		value: "item-1",
		disabled: false,
	},
} satisfies Meta<AccordionItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: "item-1",
	},
};

export const Disabled: Story = {
	args: {
		value: "disabled-item",
		disabled: true,
	},
};
