<!-- packages/bindrunes/src/playground/ExportButton.svelte -->
<script lang="ts">
import Button from "../primitives/Button.svelte";
import type { ComponentDefinition } from "./component-registry";

interface Props {
	definition: ComponentDefinition;
	props: Record<string, unknown>;
	theme?: string;
	aesthetic?: string;
	density?: string;
}

let {
	definition,
	props,
	theme = "editorial",
	aesthetic = "minimal",
	density = "comfortable",
}: Props = $props();

const propEntries = $derived(
	Object.entries(props)
		.filter(([, v]) => v !== undefined && v !== "" && v !== false)
		.map(([k, v]) => {
			if (typeof v === "boolean") return v ? k : "";
			if (typeof v === "number") return `${k}={${v}}`;
			return `${k}="${v}"`;
		})
		.filter(Boolean)
		.join(" "),
);

const propStr = $derived(propEntries ? ` ${propEntries}` : "");
const slotContent = $derived(definition.slot ? `\n  ${definition.slot}\n` : "");

const svelteCode = $derived(
	(() => {
		const tag = "<" + "/script>";
		const open = "<script" + ' lang="ts">';
		return `${open}\n  import { ${definition.name} } from "bindrunes";\n${tag}\n\n<div data-theme="${theme}" data-aesthetic="${aesthetic}" data-density="${density}">\n  <${definition.name}${propStr}>${slotContent}</${definition.name}>\n</div>`;
	})(),
);

const packageJson = $derived(
	JSON.stringify(
		{
			name: "bindrunes-playground",
			private: true,
			scripts: {
				dev: "vite dev",
				build: "vite build",
			},
			dependencies: {
				bindrunes: "latest",
				svelte: "^5.0.0",
				"@sveltejs/kit": "^2.0.0",
				tailwindcss: "^4.0.0",
			},
		},
		null,
		2,
	),
);

async function exportToCodeSandbox() {
	const parameters = {
		files: {
			"package.json": { content: packageJson },
			"src/routes/+page.svelte": { content: svelteCode },
			"src/app.html": {
				content: `<!DOCTYPE html>\n<html lang="en" data-theme="${theme}" data-aesthetic="${aesthetic}" data-density="${density}">\n  <head>\n    <meta charset="utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <title>bindrunes Playground</title>\n  </head>\n  <body>\n    <div style="display: contents">%sveltekit.body%</div>\n  </body>\n</html>`,
			},
			"src/app.css": {
				content: `@import "tailwindcss";\n@plugin "bindrunes/tailwind";\n@import "bindrunes/styles/global.css";`,
			},
		},
	};

	const url = `https://codesandbox.io/api/v1/sandboxes/define?parameters=${encodeURIComponent(btoa(JSON.stringify(parameters)))}`;
	window.open(url, "_blank");
}

async function copyCode() {
	await navigator.clipboard.writeText(svelteCode);
}
</script>

<div class="flex gap-2">
	<Button variant="outline" size="sm" onclick={copyCode}>
		Copy Code
	</Button>
	<Button variant="primary" size="sm" onclick={exportToCodeSandbox}>
		Open in CodeSandbox
	</Button>
</div>
