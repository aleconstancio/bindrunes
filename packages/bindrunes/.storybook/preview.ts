import type { Preview } from "@storybook/svelte";
import "../src/styles/global.css";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		a11y: {
			config: {},
			options: {
				checks: { "color-contrast": { options: { threshold: 0.2 } } },
				rules: [],
			},
		},
	},
};

export default preview;
