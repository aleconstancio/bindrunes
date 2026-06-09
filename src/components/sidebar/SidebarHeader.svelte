<script lang="ts">
let {
	children,
}: {
	children?: import("svelte").Snippet;
} = $props();
</script>

<MetaLayout position="header">
  {@render children?.()}
</MetaLayout>
