<script lang="ts">
import MetaLayout from "../MetaLayout.svelte";

let {
	children,
}: {
	children?: import("svelte").Snippet;
} = $props();
</script>

<MetaLayout position="footer" class="border-sidebar-border">
  {@render children?.()}
</MetaLayout>
