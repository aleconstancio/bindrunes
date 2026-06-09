<script lang="ts">
import Block from "../Block.svelte";

let {
	title = "",
	items = [] as { time: string; title: string; description: string }[],
	class: className = "",
}: {
	title?: string;
	items?: { time: string; title: string; description: string }[];
	class?: string;
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
        {/each}
      </div>
    </div>
  </div>
</Block>
