<script lang="ts">
import type { Snippet } from "svelte";
import MetaLayout from "../MetaLayout.svelte";

let {
	children,
}: {
	children?: Snippet;
} = $props();
</script>

<MetaLayout position="footer" class="border-sidebar-border">
  {@render children?.()}
</MetaLayout>
