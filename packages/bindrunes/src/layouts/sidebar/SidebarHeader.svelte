<script lang="ts">
import type { Snippet } from "svelte";
import MetaLayout from "../MetaLayout.svelte";

let {
	children,
}: {
	children?: Snippet;
} = $props();
</script>

<MetaLayout position="header">
  {@render children?.()}
</MetaLayout>
