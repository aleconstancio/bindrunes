import type { Meta, StoryObj } from "@storybook/svelte";
import MetricCard from "./MetricCard.svelte";

const meta = {
	title: "Primitives/MetricCard",
	component: MetricCard,
	tags: ["autodocs"],
	argTypes: {
		label: { control: "text" },
		value: { control: "text" },
		detail: { control: "text" },
		variant: {
			control: "select",
			options: ["default", "success", "warning", "destructive"],
		},
		progress: { control: "number" },
		progressMax: { control: "number" },
		responsive: { control: "boolean" },
	},
	args: {
		label: "Total Revenue",
		value: "$12,345",
		detail: "+12% from last month",
		variant: "default",
		responsive: false,
	},
} satisfies Meta<MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Success: Story = {
	args: {
		variant: "success",
		label: "Conversion Rate",
		value: "3.2%",
		detail: "+0.5% from last week",
	},
};

export const Warning: Story = {
	args: {
		variant: "warning",
		label: "Bounce Rate",
		value: "45%",
		detail: "+5% from last month",
	},
};

export const Destructive: Story = {
	args: {
		variant: "destructive",
		label: "Error Rate",
		value: "2.1%",
		detail: "+1.2% from last week",
	},
};

export const WithProgress: Story = {
	args: {
		label: "Storage Used",
		value: "75 GB / 100 GB",
		progress: 75,
		progressMax: 100,
	},
};
