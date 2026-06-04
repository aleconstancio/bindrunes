<script lang="ts">
  import type { Snippet } from 'svelte';
  import Testimonial from './Testimonial.svelte';

  interface TestimonialData {
    quote: string;
    author: string;
    role?: string;
    avatar?: string;
    avatarFallback?: string;
  }

  interface Props {
    testimonials: TestimonialData[];
    columns?: 1 | 2 | 3;
    children?: Snippet;
  }

  let { testimonials, columns = 3, children }: Props = $props();

  const gridClass = $derived(
    columns === 1
      ? 'grid-cols-1'
      : columns === 2
        ? 'grid-cols-1 sm:grid-cols-2'
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  );
</script>

<div class="grid {gridClass} gap-8">
  {#each testimonials as t}
    <Testimonial {...t} />
  {/each}
</div>

{#if children}
  <div class="mt-8">
    {@render children()}
  </div>
{/if}
