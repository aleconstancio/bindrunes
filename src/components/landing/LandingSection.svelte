<script lang="ts">
import type { Snippet } from "svelte";

let {
	id = undefined as string | undefined,
	class: className = "",
	size = "xl" as "prose" | "sm" | "md" | "lg" | "xl" | "2xl" | "full",
	children,
}: {
	id?: string;
	class?: string;
	size?: "prose" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
	children?: Snippet;
} = $props();
</script>

<section {id} class="px-6 py-16 section-reveal {className}">
  <MetaContainer {size}>
    {@render children?.()}
  </MetaContainer>
</section>
