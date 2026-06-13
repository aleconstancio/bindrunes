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
		environment: "jsdom",
		include: ["src/**/*.{test,spec}.{js,ts}"],
		exclude: ["node_modules", "dist", ".svelte-kit", "**/__package__/**"],
		globals: true,
		setupFiles: ["./src/test-setup.ts"],
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
					// Global floor — applies to all src/** except the overrides below.
					lines: 80,
					functions: 77,
					statements: 80,
					branches: 70,
				},
				{
					// Stricter local threshold for the agentic-chat kernel
					// (M1+ in v1.2.0). Logic-heavy contract surface — must be
					// deeply covered.
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
