import type { Meta, StoryObj } from "@storybook/svelte";
import RangeCalendar from "./RangeCalendar.svelte";

const meta = {
	title: "Primitives/RangeCalendar",
	component: RangeCalendar,
	tags: ["autodocs"],
	argTypes: {
		locale: { control: "text" },
	},
	args: {},
} satisfies Meta<RangeCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
