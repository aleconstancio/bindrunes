<script lang="ts">
import type { Snippet } from "svelte";
import Badge from "../../primitives/Badge.svelte";
import Block from "../Block.svelte";

let {
	title = "",
	subtitle = "",
	coverImage = "",
	client = "",
	industry = "",
	duration = "",
	results = [] as { label: string; value: string }[],
	class: className = "",
	children,
}: {
	title?: string;
	subtitle?: string;
	coverImage?: string;
	client?: string;
	industry?: string;
	duration?: string;
	results?: { label: string; value: string }[];
	class?: string;
	children?: Snippet;
} = $props();
</script>

<Block size="lg" spacing="normal" class={className}>
  <div class="space-y-8">
    {#if coverImage}
      <div class="aspect-[21/9] rounded-[--radius-lg] overflow-hidden">
        <img src={coverImage} alt={title} class="w-full h-full object-cover" />
      </div>
    {/if}

    <div class="space-y-4">
      {#if industry || duration}
        <div class="flex items-center gap-3">
          {#if industry}
            <Badge variant="secondary">{industry}</Badge>
          {/if}
          {#if duration}
            <span class="text-mono-xs text-muted-foreground">{duration}</span>
          {/if}
        </div>
      {/if}

      <h1 class="text-display-2 text-foreground">{title}</h1>
      {#if subtitle}
        <p class="text-body-lg text-muted-foreground">{subtitle}</p>
      {/if}
      {#if client}
        <p class="text-label-md text-muted-foreground">Client: <span class="text-foreground">{client}</span></p>
      {/if}
    </div>

    <div class="prose prose-gray dark:prose-invert max-w-none">
      {@render children?.()}
    </div>

    {#if results.length > 0}
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-t border-border">
        {#each results as result}
          <div class="text-center">
            <p class="text-display-3 text-primary">{result.value}</p>
            <p class="text-label-md text-muted-foreground mt-1">{result.label}</p>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</Block>
