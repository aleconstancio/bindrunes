import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

async function config() {
	const { sveltekit } = await import("@sveltejs/kit/vite");
	return defineConfig({
		plugins: [
			tailwindcss(),
			sveltekit(),
		],
		optimizeDeps: {
			exclude: ["bindrunes", "lucide-svelte", "bits-ui"],
		},
		server: {
			port: 5176,
			fs: {
				allow: ["../../"],
			},
		},
	});
}

export default config();
