<script lang="ts">
import type { Snippet } from "svelte";
import PageSection from "../../layouts/PageSection.svelte";
import type { ContentItem } from "../types";

let {
	items = [] as ContentItem[],
	class: className = "",
	itemSnippet = undefined as Snippet<[{ item: ContentItem; index: number }]> | undefined,
}: {
	items?: ContentItem[];
	class?: string;
	itemSnippet?: Snippet<[{ item: ContentItem; index: number }]>;
} = $props();
</script>

<PageSection reveal={false} size="xl" spacing="normal" class={className}>
  <div class="space-y-16">
    {#each items as item, i}
      {#if itemSnippet}
        {@render itemSnippet({ item, index: i })}
      {:else}
        <div
          class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          class:lg:flex-row-reverse={item.imageSide === "right"}
        >
          {#if item.image}
            <div class={item.imageSide === "right" ? "lg:order-2" : "lg:order-1"}>
              <img
                src={item.image}
                alt={item.title}
                class="w-full rounded-[--radius] shadow-lg"
              />
            </div>
          {/if}
          <div class={item.imageSide === "right" ? "lg:order-1" : "lg:order-2"}>
            <h3 class="text-title-1 text-foreground mb-4">{item.title}</h3>
            <p class="text-body-lg text-muted-foreground leading-[--text-line-height-relaxed]">{item.description}</p>
          </div>
        </div>
      {/if}
    {/each}
  </div>
</PageSection>
