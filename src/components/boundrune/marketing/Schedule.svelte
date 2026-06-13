<script lang="ts">
import type { Snippet } from "svelte";
import Block from "../Block.svelte";
import type { ScheduleItem } from "../types";

let {
	title = "",
	items = [] as ScheduleItem[],
	class: className = "",
	itemSnippet = undefined as Snippet<[{ item: ScheduleItem; index: number }]> | undefined,
}: {
	title?: string;
	items?: ScheduleItem[];
	class?: string;
	itemSnippet?: Snippet<[{ item: ScheduleItem; index: number }]>;
} = $props();
</script>

<Block size="md" spacing="normal" class={className}>
  <div class="space-y-8">
    {#if title}
      <h2 class="text-title-1 text-foreground">{title}</h2>
    {/if}

    <div class="relative">
      <div class="absolute left-4 top-0 bottom-0 w-px bg-border" aria-hidden="true"></div>
      <div class="space-y-8">
        {#each items as item, i}
          {#if itemSnippet}
            {@render itemSnippet({ item, index: i })}
          {:else}
            <div class="relative pl-10">
              <div
                class="absolute left-2.5 top-1 w-3 h-3 rounded-full border-2 border-primary bg-background"
                aria-hidden="true"
              ></div>
              <div class="space-y-1">
                <time class="text-mono-xs text-primary font-semibold">{item.time}</time>
                <h3 class="text-label-lg text-foreground font-semibold">{item.title}</h3>
                <p class="text-body-md text-muted-foreground">{item.description}</p>
              </div>
            </div>
          {/if}
        {/each}
      </div>
    </div>
  </div>
</Block>
