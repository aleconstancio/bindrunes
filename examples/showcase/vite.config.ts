import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	optimizeDeps: {
		exclude: ["bindrunes"],
	},
	ssr: {
		external: ["bindrunes"],
	},
	server: {
		port: 5176,
	},
});
