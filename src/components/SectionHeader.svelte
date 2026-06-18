<script lang="ts">
import type { Snippet } from "svelte";

let {
	label = "",
	action,
}: {
	label?: string;
	action?: Snippet;
} = $props();
</script>

<div class="flex items-center justify-between border-b border-border-subtle pb-2 mb-3">
  <span class="text-mono-xs uppercase text-muted-foreground">{label}</span>
  {#if action}
    <div>{@render action()}</div>
  {/if}
</div>
