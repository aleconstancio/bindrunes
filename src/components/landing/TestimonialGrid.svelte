<script lang="ts">
import type { Snippet } from "svelte";
import { onMount } from "svelte";

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

let { testimonials, columns = 3, children, class: className = "" }: Props = $props();

let _visible = $state(false);
let grid: HTMLElement;

onMount(() => {
	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				_visible = true;
				observer.disconnect();
			}
		},
		{ threshold: 0.1 },
	);
	observer.observe(grid);
	return () => observer.disconnect();
});
</script>

<MetaContainer size="xl" padding={false}>
<div bind:this={grid} class="grid {getGridClass(columns)} gap-8 {className}">
  {#each testimonials as t, i}
    <div class="stagger-enter" style="--stagger-index: {i}">
      <Testimonial {...t} />
    </div>
  {/each}
</div>
</MetaContainer>

{#if children}
  <div class="mt-8">
    {@render children()}
  </div>
{/if}
