<!-- @deprecated Use MetaLayout from 'bindrunes' instead. Removed in v2.0. -->
<script lang="ts">
import type { Snippet } from "svelte";
import MetaLayout from "../MetaLayout.svelte";

let {
	position = "content" as "header" | "content" | "footer" | "separator",
	children,
}: {
	position?: "header" | "content" | "footer" | "separator";
	children?: Snippet;
} = $props();
</script>

<MetaLayout {position}>
  {@render children?.()}
</MetaLayout>
