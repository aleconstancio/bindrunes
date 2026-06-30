import type { Meta, StoryObj } from "@storybook/svelte";
import Card from "./Card.svelte";

const meta = {
	title: "Primitives/Card",
	component: Card,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["surface", "glass", "tinted", "outlined", "ghost"],
			description: "The visual variant of the card",
		},
		interactive: { control: "boolean" },
		padding: { control: "boolean" },
		responsive: { control: "boolean" },
	},
	args: {
		variant: "surface",
		padding: true,
	},
} satisfies Meta<Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Surface: Story = {
	args: {
		variant: "surface",
	},
	decorators: [
		() => ({
			template: '<div style="max-width: 400px;"><story /></div>',
		}),
	],
};

export const Glass: Story = {
	args: {
		variant: "glass",
	},
	decorators: [
		() => ({
			template:
				'<div style="max-width: 400px; background: var(--background); padding: 2rem;"><story /></div>',
		}),
	],
};

export const Tinted: Story = {
	args: {
		variant: "tinted",
	},
	decorators: [
		() => ({
			template: '<div style="max-width: 400px;"><story /></div>',
		}),
	],
};

export const Outlined: Story = {
	args: {
		variant: "outlined",
	},
	decorators: [
		() => ({
			template: '<div style="max-width: 400px;"><story /></div>',
		}),
	],
};

export const Ghost: Story = {
	args: {
		variant: "ghost",
	},
	decorators: [
		() => ({
			template: '<div style="max-width: 400px;"><story /></div>',
		}),
	],
};

export const Interactive: Story = {
	args: {
		interactive: true,
		variant: "surface",
	},
	decorators: [
		() => ({
			template: '<div style="max-width: 400px;"><story /></div>',
		}),
	],
};

export const NoPadding: Story = {
	args: {
		padding: false,
		variant: "surface",
	},
	decorators: [
		() => ({
			template: '<div style="max-width: 400px;"><story /></div>',
		}),
	],
};
