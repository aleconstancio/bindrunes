<script lang="ts">
import type { Snippet } from "svelte";
import Avatar from "../../primitives/Avatar.svelte";
import Block from "../Block.svelte";

let {
	title = "",
	content = "",
	authorName = "",
	authorRole = "",
	authorAvatar = "",
	publishDate = "",
	readTime = "",
	tags = [] as string[],
	class: className = "",
	contentSnippet = undefined as Snippet | undefined,
}: {
	title?: string;
	content?: string;
	authorName?: string;
	authorRole?: string;
	authorAvatar?: string;
	publishDate?: string;
	readTime?: string;
	tags?: string[];
	class?: string;
	contentSnippet?: Snippet;
} = $props();
</script>

<Block size="md" spacing="normal" class={className}>
  <article class="space-y-8">
    <header class="space-y-4">
      <h1 class="text-display-2 text-foreground leading-tight">{title}</h1>

      <div class="flex flex-wrap items-center gap-4 text-body-sm text-muted-foreground">
        {#if publishDate}
          <time datetime={publishDate}>{publishDate}</time>
        {/if}
        {#if readTime}
          <span>{readTime} min read</span>
        {/if}
      </div>

      {#if tags.length > 0}
        <div class="flex flex-wrap gap-2">
          {#each tags as tag}
            <span class="text-mono-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">{tag}</span>
          {/each}
        </div>
      {/if}
    </header>

    {#if contentSnippet}
      <div class="prose prose-gray dark:prose-invert max-w-none">
        {@render contentSnippet()}
      </div>
    {:else if content}
      <div class="prose prose-gray dark:prose-invert max-w-none">
        {#each content.split("\n") as paragraph}
          {#if paragraph.trim()}
            <p class="text-body-lg text-foreground leading-relaxed mb-4">{paragraph}</p>
          {/if}
        {/each}
      </div>
    {/if}

    {#if authorName}
      <footer class="flex items-center gap-3 pt-6 border-t border-border">
        {#if authorAvatar}
          <Avatar src={authorAvatar} alt={authorName} size="md" />
        {/if}
        <div>
          <p class="text-label-md text-foreground">{authorName}</p>
          {#if authorRole}
            <p class="text-body-sm text-muted-foreground">{authorRole}</p>
          {/if}
        </div>
      </footer>
    {/if}
  </article>
</Block>
