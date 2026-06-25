<script lang="ts">
import type { Snippet } from "svelte";
import { fade } from "svelte/transition";

let {
	show = false,
	duration = 200,
	children,
}: {
	show?: boolean;
	duration?: number;
	children?: Snippet;
} = $props();
</script>

{#if show}
  <div transition:fade={{ duration }}>
    {@render children?.()}
  </div>
{/if}
