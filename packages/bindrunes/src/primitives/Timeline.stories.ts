import type { Meta, StoryObj } from "@storybook/svelte";
import Timeline from "./Timeline.svelte";

const meta = {
	title: "Primitives/Timeline",
	component: Timeline,
	tags: ["autodocs"],
	argTypes: {
		items: { control: "object" },
	},
	args: {
		items: [
			{ id: "1", title: "Event 1", description: "First event happened", time: "10:00 AM" },
			{
				id: "2",
				title: "Event 2",
				description: "Second event happened",
				time: "11:00 AM",
				variant: "success",
			},
			{ id: "3", title: "Event 3", time: "12:00 PM", variant: "warning" },
		],
	},
} satisfies Meta<Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithVariants: Story = {
	args: {
		items: [
			{ id: "1", title: "Created", variant: "primary", time: "Jan 1" },
			{ id: "2", title: "In Progress", variant: "warning", time: "Jan 5" },
			{ id: "3", title: "Completed", variant: "success", time: "Jan 10" },
			{ id: "4", title: "Failed", variant: "destructive", time: "Jan 15" },
		],
	},
};
