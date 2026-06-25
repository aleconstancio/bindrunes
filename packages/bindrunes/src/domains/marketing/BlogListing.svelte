<script lang="ts">
import type { Snippet } from "svelte";
import PageSection from "../../layouts/PageSection.svelte";
import Badge from "../../primitives/Badge.svelte";
import Button from "../../primitives/Button.svelte";
import Card from "../../primitives/Card.svelte";
import Pagination from "../../primitives/Pagination.svelte";
import { getGridClass } from "../../utils/grid";

interface BlogPost {
	id: string;
	title: string;
	excerpt: string;
	image?: string;
	author: string;
	date: string;
	readTime?: string;
	tags?: string[];
	href?: string;
}

let {
	posts = [] as BlogPost[],
	columns = 3,
	currentPage = 1,
	totalPages = 1,
	onPageChange = undefined as ((page: number) => void) | undefined,
	class: className = "",
	postSnippet = undefined as Snippet<[{ post: BlogPost; index: number }]> | undefined,
}: {
	posts?: BlogPost[];
	columns?: 2 | 3 | 4;
	currentPage?: number;
	totalPages?: number;
	onPageChange?: (page: number) => void;
	class?: string;
	postSnippet?: Snippet<[{ post: BlogPost; index: number }]>;
} = $props();
</script>

<PageSection reveal={false} size="xl" spacing="normal" class={className}>
  <div class="grid {getGridClass(columns)} gap-6">
    {#each posts as post, i}
      {#if postSnippet}
        {@render postSnippet({ post, index: i })}
      {:else}
        <a
          href={post.href ?? "#"}
          class="group block rounded-[--radius] border border-border bg-card overflow-hidden
                 hover:shadow-lg transition-all duration-[--duration-snappy]"
        >
          {#if post.image}
            <div class="aspect-[16/9] overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                class="w-full h-full object-cover transition-transform duration-[--duration-fluid] group-hover:scale-105"
              />
            </div>
          {/if}
          <div class="p-5 space-y-3">
            {#if post.tags?.length}
              <div class="flex flex-wrap gap-1.5">
                {#each post.tags as tag}
                  <Badge variant="secondary" size="sm">{tag}</Badge>
                {/each}
              </div>
            {/if}
            <h3 class="text-title-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p class="text-body-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
            <div class="flex items-center gap-3 text-mono-xs text-muted-foreground pt-2 border-t border-border">
              <span>{post.author}</span>
              <span>{post.date}</span>
              {#if post.readTime}
                <span>{post.readTime} min read</span>
              {/if}
            </div>
          </div>
        </a>
      {/if}
    {/each}
  </div>

  {#if totalPages > 1}
    <div class="mt-8">
      <Pagination {currentPage} {totalPages} {onPageChange} />
    </div>
  {/if}
</PageSection>
