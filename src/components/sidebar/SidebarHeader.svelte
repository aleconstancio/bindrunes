<script lang="ts">
import MetaLayout from "../MetaLayout.svelte";

let {
	children,
}: {
	children?: import("svelte").Snippet;
} = $props();
</script>

<MetaLayout position="header">
  {@render children?.()}
</MetaLayout>
