import type { Meta, StoryObj } from "@storybook/svelte";
import RuleFootnote from "./RuleFootnote.svelte";

const meta = {
	title: "Primitives/RuleFootnote",
	component: RuleFootnote,
	tags: ["autodocs"],
	argTypes: {
		title: { control: "text" },
		description: { control: "text" },
	},
	args: {
		title: "Regra Crítica",
		description: "This rule must be followed.",
	},
} satisfies Meta<RuleFootnote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomTitle: Story = {
	args: {
		title: "Important Note",
		description: "Please review before proceeding.",
	},
};
