<script lang="ts">
import type { Snippet } from "svelte";

let {
	swipeLeft,
	swipeRight,
	children,
}: {
	swipeLeft?: Snippet;
	swipeRight?: Snippet;
	children?: Snippet;
} = $props();

let itemEl = $state<HTMLElement | undefined>(undefined);
let offsetX = $state(0);
let startX = 0;
let swiping = false;

function onTouchStart(e: TouchEvent) {
	startX = e.touches[0].clientX;
	swiping = true;
}

function onTouchMove(e: TouchEvent) {
	if (!swiping) return;
	const dx = e.touches[0].clientX - startX;
	offsetX = Math.max(-100, Math.min(100, dx));
}

function onTouchEnd() {
	if (Math.abs(offsetX) > 60) {
		offsetX = offsetX > 0 ? 80 : -80;
	} else {
		offsetX = 0;
	}
	swiping = false;
}

function reset() {
	offsetX = 0;
}
</script>

<div class="relative overflow-hidden">
	{#if swipeLeft && offsetX < 0}
		<div class="absolute inset-y-0 right-0 flex items-center pl-4 bg-destructive text-destructive-foreground">
			{@render swipeLeft()}
		</div>
	{/if}
	{#if swipeRight && offsetX > 0}
		<div class="absolute inset-y-0 left-0 flex items-center pr-4 bg-success text-success-foreground">
			{@render swipeRight()}
		</div>
	{/if}
	<div
		bind:this={itemEl}
		class="relative bg-card transition-transform duration-200"
		style="transform: translateX({offsetX}px);"
		ontouchstart={onTouchStart}
		ontouchmove={onTouchMove}
		ontouchend={onTouchEnd}
	>
		{@render children?.()}
	</div>
</div>
