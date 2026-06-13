<!-- @deprecated Use MetaLayout from 'bindrunes' instead. Removed in v2.0. -->
<script lang="ts">
import type { Snippet } from "svelte";
import { onMount } from "svelte";
import MetaLayout from "../MetaLayout.svelte";

let {
	position = "content" as "header" | "content" | "footer" | "separator",
	children,
}: {
	position?: "header" | "content" | "footer" | "separator";
	children?: Snippet;
} = $props();

onMount(() => {
	console.warn(
		"[bindrunes] SidebarLayout is deprecated and will be removed in v2.0. Use MetaLayout from 'bindrunes' instead.",
	);
});
</script>

<MetaLayout {position}>
  {@render children?.()}
</MetaLayout>
