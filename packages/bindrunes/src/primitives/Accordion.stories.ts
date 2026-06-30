import type { Meta, StoryObj } from "@storybook/svelte";
import Accordion from "./Accordion.svelte";
import AccordionItem from "./AccordionItem.svelte";

const meta = {
	title: "Primitives/Accordion",
	component: Accordion,
	tags: ["autodocs"],
	argTypes: {
		multiple: { control: "boolean" },
	},
	args: {
		multiple: false,
	},
} satisfies Meta<Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
	render: () => ({
		Component: Accordion,
		props: { multiple: false },
		slot: {
			default: () => ({
				Component: AccordionItem,
				props: { value: "item-1", trigger: "What is Accordion?" },
				slot: {
					default: () =>
						"Accordion is a UI component that allows users to toggle the display of content sections.",
				},
			}),
		},
	}),
};

export const Multiple: Story = {
	args: { multiple: true },
};

export const Disabled: Story = {
	render: () => ({
		Component: Accordion,
		props: { multiple: false },
		slot: {
			default: () => ({
				Component: AccordionItem,
				props: { value: "item-1", trigger: "Enabled section", disabled: false },
				slot: { default: () => "This section is enabled." },
			}),
		},
	}),
};
