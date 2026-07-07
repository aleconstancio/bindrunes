import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
	extensions: [".svelte", ".md"],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: [".md"],
			layout: join(__dirname, "src/lib/components/docs/MdLayout.svelte"),
		}),
	],
	kit: {
		adapter: adapter(),
		prerender: {
			handleHttpError: "warn",
		},
	},
};
