<script lang="ts">
import Badge from "../../Badge.svelte";

let {
	title = "",
	description = "",
	image = "",
	tags = [] as string[],
	href = "#",
	class: className = "",
}: {
	title?: string;
	description?: string;
	image?: string;
	tags?: string[];
	href?: string;
	class?: string;
} = $props();
</script>

<a
  {href}
  class="group block rounded-[--radius] border border-border bg-card overflow-hidden
         hover:shadow-lg transition-all duration-[--duration-snappy] {className}"
>
  {#if image}
    <div class="aspect-[16/9] overflow-hidden">
      <img
        src={image}
        alt={title}
        class="w-full h-full object-cover transition-transform duration-[--duration-fluid] group-hover:scale-105"
      />
    </div>
  {/if}
  <div class="p-5 space-y-3">
    {#if tags.length > 0}
      <div class="flex flex-wrap gap-1.5">
        {#each tags as tag}
          <Badge variant="secondary" size="sm">{tag}</Badge>
        {/each}
      </div>
    {/if}
    <h3 class="text-title-2 text-foreground group-hover:text-primary transition-colors">{title}</h3>
    {#if description}
      <p class="text-body-sm text-muted-foreground line-clamp-2">{description}</p>
    {/if}
  </div>
</a>
