<script lang="ts">
import type { Snippet } from "svelte";

interface TimelineItem {
	id?: string;
	title: string;
	description?: string;
	time?: string;
	icon?: Snippet;
	variant?: "default" | "primary" | "success" | "warning" | "destructive";
}

let {
	items = [] as TimelineItem[],
	class: className = "",
	itemSnippet = undefined as Snippet<[{ item: TimelineItem; index: number }]> | undefined,
}: {
	items?: TimelineItem[];
	class?: string;
	itemSnippet?: Snippet<[{ item: TimelineItem; index: number }]>;
} = $props();

const dotColors: Record<string, string> = {
	default: "bg-muted-foreground",
	primary: "bg-primary",
	success: "bg-success",
	warning: "bg-warning",
	destructive: "bg-destructive",
};
</script>

<div class="relative {className}">
  <div class="absolute left-4 top-0 bottom-0 w-px bg-border" aria-hidden="true"></div>
  <div class="space-y-8">
    {#each items as item, i}
      {#if itemSnippet}
        {@render itemSnippet({ item, index: i })}
      {:else}
        <div class="relative pl-10">
          <div
            class="absolute left-2.5 top-1 w-3 h-3 rounded-full border-2 border-background {dotColors[item.variant ?? 'default']}"
            aria-hidden="true"
          ></div>
          <div class="space-y-1">
            {#if item.time}
              <time class="text-mono-xs text-muted-foreground">{item.time}</time>
            {/if}
            <h3 class="text-label-lg text-foreground font-semibold">{item.title}</h3>
            {#if item.description}
              <p class="text-body-md text-muted-foreground">{item.description}</p>
            {/if}
          </div>
        </div>
      {/if}
    {/each}
  </div>
</div>
