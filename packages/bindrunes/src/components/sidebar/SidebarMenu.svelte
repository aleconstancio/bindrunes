<script lang="ts">
import type { Snippet } from "svelte";

let {
	children,
}: {
	children?: Snippet;
} = $props();
</script>

<nav class="space-y-0.5">
  {@render children?.()}
</nav>
