<script lang="ts">
  import type { Snippet } from 'svelte';
  import Testimonial from './Testimonial.svelte';
  import { getGridClass } from './landing-utils';

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
    class?: string;
  }

  let { testimonials, columns = 3, children, class: className = '' }: Props = $props();

</script>

<div class="grid {getGridClass(columns)} gap-8 {className}">
  {#each testimonials as t}
    <Testimonial {...t} />
  {/each}
</div>

{#if children}
  <div class="mt-8">
    {@render children()}
  </div>
{/if}
