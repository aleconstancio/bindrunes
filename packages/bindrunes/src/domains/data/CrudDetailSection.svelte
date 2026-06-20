<script lang="ts">
import type { Snippet } from "svelte";
import Badge from "../../primitives/Badge.svelte";
import Block from "../Block.svelte";

let {
	sections = [] as {
		label: string;
		value: string;
		variant?:
			| "default"
			| "primary"
			| "secondary"
			| "success"
			| "warning"
			| "destructive"
			| "outline";
	}[],
	children,
	class: className = "",
}: {
	sections?: {
		label: string;
		value: string;
		variant?:
			| "default"
			| "primary"
			| "secondary"
			| "success"
			| "warning"
			| "destructive"
			| "outline";
	}[];
	children?: Snippet;
	class?: string;
} = $props();
</script>

<Block size="md" spacing="compact" class={className}>
  <div class="space-y-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each sections as section}
        <div class="rounded-[--radius] border border-border bg-card p-4">
          <p class="text-mono-xs uppercase text-muted-foreground font-bold mb-1">{section.label}</p>
          {#if section.variant}
            <Badge variant={section.variant}>{section.value}</Badge>
          {:else}
            <p class="text-body-lg text-foreground font-semibold">{section.value}</p>
          {/if}
        </div>
      {/each}
    </div>
    {#if children}
      <div>
        {@render children()}
      </div>
    {/if}
  </div>
</Block>
