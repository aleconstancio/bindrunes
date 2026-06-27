import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [svelte({ compilerOptions: { runes: true } })],
	test: {
		environment: "happy-dom",
		include: ["src/**/*.test.ts", "src/**/*.svelte.test.ts"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			include: ["src/**/*.{ts,svelte}"],
			exclude: ["src/**/*.test.ts", "src/**/*.d.ts"],
			thresholds: {
				global: {
					lines: 80,
					branches: 75,
					functions: 80,
					statements: 80,
				},
			},
		},
	},
});
