import type { Meta, StoryObj } from "@storybook/svelte";
import ErrorBanner from "./ErrorBanner.svelte";

const meta = {
	title: "Primitives/ErrorBanner",
	component: ErrorBanner,
	tags: ["autodocs"],
	argTypes: {
		error: { control: "text" },
	},
	args: {
		error: "Something went wrong. Please try again.",
	},
} satisfies Meta<ErrorBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ShortError: Story = {
	args: {
		error: "Invalid input.",
	},
};

export const LongError: Story = {
	args: {
		error:
			"The server returned an unexpected response. This might be due to a temporary network issue or a problem with the server configuration. Please try again later.",
	},
};
