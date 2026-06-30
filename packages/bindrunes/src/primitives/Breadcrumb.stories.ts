import type { Meta, StoryObj } from "@storybook/svelte";
import Breadcrumb from "./Breadcrumb.svelte";

const meta = {
	title: "Primitives/Breadcrumb",
	component: Breadcrumb,
	tags: ["autodocs"],
	argTypes: {
		separator: { control: "text" },
	},
	args: {
		items: [
			{ label: "Home", href: "/" },
			{ label: "Library", href: "/library" },
			{ label: "Current" },
		],
		separator: "/",
	},
} satisfies Meta<Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ArrowSeparator: Story = {
	args: {
		separator: "→",
	},
};

export const SingleItem: Story = {
	args: {
		items: [{ label: "Home" }],
	},
};
