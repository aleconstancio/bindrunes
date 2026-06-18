import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		svelte({
			compilerOptions: {
				runes: true,
			},
		}),
	],
	resolve: {
		conditions: ["browser", "import", "module"],
		alias: {
			bindrunes: new URL("./src/bindrunes-stub.ts", import.meta.url).pathname,
		},
	},
	test: {
		globals: true,
		setupFiles: ["./src/test-setup.ts"],
		exclude: ["node_modules", "dist", ".svelte-kit", "**/__package__/**"],
		deps: {
			optimizer: {
				ssr: {
					include: ["happy-dom"],
				},
			},
		},
		projects: [
			{
				extends: true,
				test: {
					name: "components",
					include: ["src/components/**/*.{test,spec}.{js,ts}"],
					environment: "happy-dom",
					pool: "forks",
					maxForks: 2,
					minForks: 2,
				},
			},
			{
				extends: true,
				test: {
					name: "utils",
					include: ["src/utils/**/*.{test,spec}.{js,ts}", "src/helpers/**/*.{test,spec}.{js,ts}"],
					environment: "happy-dom",
					pool: "forks",
					maxForks: 2,
					minForks: 2,
				},
			},
		],
		coverage: {
			include: ["src/**"],
			exclude: [
				"src/test-setup.ts",
				"src/test-utils.ts",
				"src/helpers/**",
				"src/**/*.test.ts",
				"src/**/*.spec.ts",
				"src/**/*.d.ts",
			],
			thresholds: [
				{
					lines: 80,
					functions: 77,
					statements: 80,
					branches: 70,
				},
				{
					include: ["src/utils/agentic/**", "src/types/agent.ts"],
					lines: 90,
					functions: 88,
					statements: 90,
					branches: 85,
				},
			],
		},
	},
});
