import type { Meta, StoryObj } from "@storybook/svelte";
import Suspense from "./Suspense.svelte";

const meta = {
	title: "Primitives/Suspense",
	component: Suspense,
	tags: ["autodocs"],
	argTypes: {
		state: { control: "object" },
	},
	args: {
		state: { status: "loading" },
	},
} satisfies Meta<Suspense>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {};

export const Loaded: Story = {
	args: {
		state: { status: "loaded", data: "some data" },
	},
};

export const Empty: Story = {
	args: {
		state: { status: "empty" },
	},
};

export const ErrorState: Story = {
	args: {
		state: { status: "error", error: new globalThis.Error("Something went wrong") },
	},
};
