<script lang="ts">
let {
	images = [] as { src: string; alt?: string; caption?: string }[],
	selectedIndex = $bindable(0),
	class: className = "",
}: {
	images?: { src: string; alt?: string; caption?: string }[];
	selectedIndex?: number;
	class?: string;
} = $props();
</script>

<div class="space-y-3 {className}">
  {#if images.length > 0}
    <div class="aspect-[16/9] rounded-[--radius-lg] overflow-hidden border border-border">
      <img
        src={images[selectedIndex]?.src}
        alt={images[selectedIndex]?.alt ?? ''}
        class="w-full h-full object-cover"
      />
    </div>

    {#if images[selectedIndex]?.caption}
      <p class="text-body-sm text-muted-foreground text-center">{images[selectedIndex].caption}</p>
    {/if}

    {#if images.length > 1}
      <div class="flex gap-2 overflow-x-auto pb-1">
        {#each images as image, i}
          <button
            type="button"
            class="shrink-0 w-16 h-16 rounded-[--radius] overflow-hidden border-2 transition-colors cursor-pointer
                   {i === selectedIndex ? 'border-primary' : 'border-border opacity-60 hover:opacity-100'}"
            onclick={() => selectedIndex = i}
          >
            <img src={image.src} alt={image.alt ?? ''} class="w-full h-full object-cover" />
          </button>
        {/each}
      </div>
    {/if}
  {/if}
</div>
