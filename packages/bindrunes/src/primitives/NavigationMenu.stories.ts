import type { Meta, StoryObj } from "@storybook/svelte";
import NavigationMenu from "./NavigationMenu.svelte";

const meta = {
	title: "Primitives/NavigationMenu",
	component: NavigationMenu,
	tags: ["autodocs"],
	argTypes: {
		activeId: { control: "text" },
	},
	args: {
		links: [
			{ label: "Home", href: "/" },
			{ label: "About", href: "/about" },
			{ label: "Contact", href: "/contact" },
		],
	},
} satisfies Meta<NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithActive: Story = {
	args: {
		activeId: "about",
	},
};
