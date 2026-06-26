<!-- packages/bindrunes/src/playground/CodePreview.svelte -->
<script lang="ts">
import { CodeSnippet } from "../../index";
import type { ComponentDefinition } from "./component-registry";

interface Props {
	definition: ComponentDefinition;
	props: Record<string, unknown>;
}

let { definition, props }: Props = $props();

const generatedCode = $derived(() => {
	const propEntries = Object.entries(props)
		.filter(([, v]) => v !== undefined && v !== "" && v !== false)
		.map(([k, v]) => {
			if (typeof v === "boolean") return v ? k : "";
			if (typeof v === "number") return `${k}={${v}}`;
			return `${k}="${v}"`;
		})
		.filter(Boolean)
		.join(" ");

	const propStr = propEntries ? ` ${propEntries}` : "";
	const slotContent = definition.slot ? `\n  ${definition.slot}\n` : "";

	return `import { ${definition.name} } from "${definition.importPath}";\n\n<${definition.name}${propStr}>${slotContent}</${definition.name}>`;
});
</script>

<div class="space-y-4">
  <h4 class="text-title-3 text-foreground">Generated Code</h4>
  <CodeSnippet code={generatedCode()} language="svelte" title="App.svelte" />
</div>
