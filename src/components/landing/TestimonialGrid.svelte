<script lang="ts">
import type { Snippet } from "svelte";
import MetaContainer from "../MetaContainer.svelte";
import { getGridClass } from "./landing-utils";
import Testimonial from "./Testimonial.svelte";

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
</script>

<MetaContainer size="xl" padding={false}>
<div class="grid {getGridClass(columns)} gap-8 {className}">
  {#each testimonials as t}
    <Testimonial {...t} />
  {/each}
</div>
</MetaContainer>

{#if children}
  <div class="mt-8">
    {@render children()}
  </div>
{/if}
