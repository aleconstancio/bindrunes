<script lang="ts">
import type { Snippet } from "svelte";
import MetaContainer from "../MetaContainer.svelte";

let {
	id = undefined as string | undefined,
	class: className = "",
	maxWidth = "6xl" as "4xl" | "5xl" | "6xl" | "7xl" | "full",
	children,
}: {
	id?: string;
	class?: string;
	maxWidth?: "4xl" | "5xl" | "6xl" | "7xl" | "full";
	children?: Snippet;
} = $props();

const containerSize = $derived(
	maxWidth === "4xl"
		? "lg"
		: maxWidth === "5xl"
			? "xl"
			: maxWidth === "6xl"
				? "xl"
				: maxWidth === "7xl"
					? "2xl"
					: "full",
);
</script>

<section {id} class="px-6 py-16 section-reveal {className}">
  <MetaContainer size={containerSize}>
    {@render children?.()}
  </MetaContainer>
</section>
