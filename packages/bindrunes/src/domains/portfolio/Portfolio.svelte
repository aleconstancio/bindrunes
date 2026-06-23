<script lang="ts">
import type { Snippet } from "svelte";
import { getGridClass } from "../../utils/grid";
import Block from "../Block.svelte";
import type { PortfolioItem } from "../types";

let {
	items = [] as PortfolioItem[],
	columns = 3,
	class: className = "",
	cardSnippet = undefined as Snippet<[{ item: PortfolioItem; index: number }]> | undefined,
}: {
	items?: PortfolioItem[];
	columns?: 2 | 3 | 4;
	class?: string;
	cardSnippet?: Snippet<[{ item: PortfolioItem; index: number }]>;
} = $props();
</script>

<Block size="xl" spacing="normal" class={className}>
  <div class="grid {getGridClass(columns)} gap-6">
    {#each items as item, i}
      {#if cardSnippet}
        {@render cardSnippet({ item, index: i })}
      {:else}
        <a
          href={item.href ?? "#"}
          class="group block rounded-[--radius] border border-border bg-card overflow-hidden
                 hover:shadow-lg transition-all duration-[--duration-snappy]
                 hover:-translate-y-0.5"
        >
          {#if item.image}
            <div class="aspect-[4/3] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                class="w-full h-full object-cover transition-transform duration-[--duration-fluid] group-hover:scale-105"
              />
            </div>
          {/if}
          <div class="p-4">
            <h3 class="text-label-lg text-foreground font-semibold group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p class="text-body-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
            {#if item.tags && item.tags.length > 0}
              <div class="flex flex-wrap gap-1.5 mt-3">
                {#each item.tags as tag}
                  <span class="text-mono-xs px-2 py-0.5 rounded-[--radius-pill] bg-muted text-muted-foreground">{tag}</span>
                {/each}
              </div>
            {/if}
          </div>
        </a>
      {/if}
    {/each}
  </div>
</Block>
