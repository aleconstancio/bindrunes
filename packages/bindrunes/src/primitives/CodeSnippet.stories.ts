import type { Meta, StoryObj } from "@storybook/svelte";
import CodeSnippet from "./CodeSnippet.svelte";

const meta = {
	title: "Primitives/CodeSnippet",
	component: CodeSnippet,
	tags: ["autodocs"],
	argTypes: {
		code: { control: "text" },
		language: { control: "text" },
		title: { control: "text" },
	},
	args: {
		code: 'const greeting = "Hello, World!";',
		language: "typescript",
	},
} satisfies Meta<CodeSnippet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTitle: Story = {
	args: {
		title: "greeting.ts",
		code: 'const greeting = "Hello, World!";',
	},
};

export const MultiLine: Story = {
	args: {
		title: "example.svelte",
		language: "svelte",
		code: `<script>
  let count = $state(0);
</script>

<button onclick={() => count++}>
  Count: {count}
</button>`,
	},
};
