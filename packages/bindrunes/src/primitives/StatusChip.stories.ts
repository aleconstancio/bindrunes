import type { Meta, StoryObj } from "@storybook/svelte";
import StatusChip from "./StatusChip.svelte";

const meta = {
	title: "Primitives/StatusChip",
	component: StatusChip,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["success", "warning", "destructive", "info", "neutral"],
		},
		label: { control: "text" },
		dot: { control: "boolean" },
		animate: { control: "boolean" },
	},
	args: {
		variant: "info",
		label: "Status",
		dot: false,
		animate: false,
	},
} satisfies Meta<StatusChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Success: Story = {
	args: { variant: "success", label: "Active" },
};

export const Warning: Story = {
	args: { variant: "warning", label: "Pending" },
};

export const Destructive: Story = {
	args: { variant: "destructive", label: "Error" },
};

export const Neutral: Story = {
	args: { variant: "neutral", label: "Unknown" },
};

export const WithDot: Story = {
	args: { variant: "success", label: "Online", dot: true },
};

export const AnimatedDot: Story = {
	args: { variant: "success", label: "Live", dot: true, animate: true },
};
