<script lang="ts">
import type { Snippet } from "svelte";
import { blur, fade, fly, scale, slide } from "svelte/transition";

type TransitionType = "fade" | "fly" | "slide" | "blur" | "scale";

let {
	type = "fade" as TransitionType,
	visible = true,
	duration = 300,
	delay = 0,
	x = 0,
	y = 0,
	amount = 5,
	children,
}: {
	type?: TransitionType;
	visible?: boolean;
	duration?: number;
	delay?: number;
	x?: number;
	y?: number;
	amount?: number;
	children?: Snippet;
} = $props();

const transitions = {
	fade: (node: HTMLElement) => fade(node, { duration, delay }),
	fly: (node: HTMLElement) => fly(node, { duration, delay, x, y }),
	slide: (node: HTMLElement) => slide(node, { duration, delay }),
	blur: (node: HTMLElement) => blur(node, { duration, delay, amount }),
	scale: (node: HTMLElement) => scale(node, { duration, delay }),
};
</script>

{#if visible}
  <div transition:transitions[type]>
    {@render children?.()}
  </div>
{/if}
