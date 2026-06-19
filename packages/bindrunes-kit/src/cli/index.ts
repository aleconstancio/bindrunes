#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

interface ProjectConfig {
	name: string;
	mode: "full-stack" | "spa-backend";
	deployment: "vercel" | "firebase" | "node";
}

async function main() {
	const args = process.argv.slice(2);
	const name = args[0];

	if (!name) {
		console.log("Usage: npx create-bindrunes <project-name>");
		console.log("Example: npx create-bindrunes my-saas");
		process.exit(1);
	}

	console.log(`\n🔨 Creating bindrunes project: ${name}\n`);

	const targetDir = join(process.cwd(), name);

	// Create directories
	await mkdir(join(targetDir, "src/routes"), { recursive: true });
	await mkdir(join(targetDir, "src/lib"), { recursive: true });

	// package.json
	await writeFile(
		join(targetDir, "package.json"),
		JSON.stringify(
			{
				name,
				private: true,
				type: "module",
				scripts: {
					dev: "vite dev",
					build: "vite build",
					preview: "vite preview",
				},
				dependencies: {
					bindrunes: "^2.0.0",
					"bindrunes-kit": "^2.0.0",
					svelte: "^5.0.0",
					"@sveltejs/kit": "^2.0.0",
					"@sveltejs/adapter-auto": "^3.0.0",
					vite: "^6.0.0",
				},
				devDependencies: {
					"@sveltejs/vite-plugin-svelte": "^5.0.0",
					tailwindcss: "^4.0.0",
					"@tailwindcss/vite": "^4.0.0",
					typescript: "^5.0.0",
				},
			},
			null,
			2,
		),
	);

	// svelte.config.js
	await writeFile(
		join(targetDir, "svelte.config.js"),
		`import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
  },
};

export default config;
`,
	);

	// src/app.html
	await writeFile(
		join(targetDir, "src/app.html"),
		`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%sveltekit.assets%/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
`,
	);

	// src/app.css
	await writeFile(
		join(targetDir, "src/app.css"),
		`@import "tailwindcss";
@plugin "bindrunes/tailwind";
@import "bindrunes/styles/global.css";
`,
	);

	// src/routes/+layout.svelte
	await writeFile(
		join(targetDir, "src/routes/+layout.svelte"),
		`<script lang="ts">
  import "../app.css";
  import { AppProvider } from "bindrunes";

  let { children } = $props();
</script>

<AppProvider>
  {@render children()}
</AppProvider>
`,
	);

	// src/routes/+page.svelte
	await writeFile(
		join(targetDir, "src/routes/+page.svelte"),
		`<script lang="ts">
  import { PageSection } from "bindrunes";
</script>

<PageSection size="2xl" spacing="wide" reveal={false}>
  <div class="text-center space-y-6">
    <h1 class="text-display-1 text-foreground">Welcome to bindrunes</h1>
    <p class="text-body-lg text-muted-foreground max-w-2xl mx-auto">
      Start building your SvelteKit app with the bindrunes design system.
    </p>
  </div>
</PageSection>
`,
	);

	// src/routes/+layout.ts
	await writeFile(
		join(targetDir, "src/routes/+layout.ts"),
		`export const prerender = true;
export const ssr = false;
`,
	);

	// vite.config.ts
	await writeFile(
		join(targetDir, "vite.config.ts"),
		`import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  optimizeDeps: { exclude: ["bindrunes"] },
});
`,
	);

	// tsconfig.json
	await writeFile(
		join(targetDir, "tsconfig.json"),
		`{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": true,
    "moduleResolution": "bundler"
  }
}`,
	);

	console.log(`✅ Created ${name}!`);
	console.log(`\n   cd ${name}`);
	console.log(`   bun install`);
	console.log(`   bun run dev`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
