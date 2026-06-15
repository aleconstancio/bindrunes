<script lang="ts">
let {
	children,
}: {
	children?: import("svelte").Snippet;
} = $props();
</script>

<MetaLayout position="footer" class="border-sidebar-border">
  {@render children?.()}
</MetaLayout>
