<script lang="ts">
import Block from "../Block.svelte";

let {
	items = [] as {
		title: string;
		description: string;
		image?: string;
		imageSide?: "left" | "right";
	}[],
	class: className = "",
}: {
	items?: { title: string; description: string; image?: string; imageSide?: "left" | "right" }[];
	class?: string;
} = $props();
</script>

<Block size="xl" spacing="normal" class={className}>
  <div class="space-y-16">
    {#each items as item, i}
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
          <p class="text-body-lg text-muted-foreground leading-relaxed">{item.description}</p>
        </div>
      </div>
    {/each}
  </div>
</Block>
