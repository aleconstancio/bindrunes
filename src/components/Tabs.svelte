<script lang="ts">
import { Tabs } from "bits-ui";
import type { Snippet } from "svelte";

const BitsTabs = Tabs;

let {
	value = $bindable(""),
	orientation = "horizontal" as "horizontal" | "vertical",
	class: className = "",
	children,
}: {
	value?: string;
	orientation?: "horizontal" | "vertical";
	class?: string;
	children?: Snippet;
} = $props();
</script>

<BitsTabs.Root bind:value {orientation} class="w-full {className}">
  {@render children?.()}
</BitsTabs.Root>
