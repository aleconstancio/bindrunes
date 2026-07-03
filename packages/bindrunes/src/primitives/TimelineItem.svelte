<script lang="ts">
import type { Snippet } from "svelte";

let {
	timestamp,
	children,
	class: className = "",
}: {
	timestamp: string;
	children?: Snippet;
	class?: string;
} = $props();
</script>

<div class="flex items-start gap-3 py-2.5 px-3 rounded-lg hover:bg-muted/50 transition-colors {className}">
  <span class="text-xs text-muted-foreground font-mono whitespace-nowrap pt-0.5 min-w-[4rem]">
    {timestamp}
  </span>
  <div class="flex-1 min-w-0">
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>
