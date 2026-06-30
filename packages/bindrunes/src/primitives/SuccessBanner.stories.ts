import type { Meta, StoryObj } from "@storybook/svelte";
import SuccessBanner from "./SuccessBanner.svelte";

const meta = {
	title: "Primitives/SuccessBanner",
	component: SuccessBanner,
	tags: ["autodocs"],
	argTypes: {},
	args: {},
} satisfies Meta<SuccessBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
