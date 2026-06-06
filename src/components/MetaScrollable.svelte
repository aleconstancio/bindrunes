<!-- src/components/MetaScrollable.svelte -->
<script lang="ts">
import type { Snippet } from "svelte";

let {
	class: className = "",
	children,
}: {
	class?: string;
	children?: Snippet;
} = $props();
</script>

<div class="overflow-y-auto overflow-x-hidden [scrollbar-width:thin] [scrollbar-color:var(--border) transparent] hover:[scrollbar-color:var(--border-strong)] {className}">
  {@render children?.()}
</div>
