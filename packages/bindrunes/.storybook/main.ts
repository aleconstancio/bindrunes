import type { StorybookConfig } from "@storybook/svelte-vite";

const config: StorybookConfig = {
	stories: ["../src/**/*.stories.@(js|ts|svelte)"],
	addons: [
		"@storybook/addon-essentials",
		"@storybook/addon-a11y",
		"@storybook/addon-viewport",
		"@storybook/addon-themes",
	],
	framework: {
		name: "@storybook/svelte-vite",
		options: {},
	},
};

export default config;
