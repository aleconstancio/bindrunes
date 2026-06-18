<script lang="ts">
import type { Snippet } from "svelte";
import MetaScrollable from "./MetaScrollable.svelte";

let {
	topbar,
	left,
	leftWidth = "260px",
	leftCollapsible = "icon" as "icon" | "full" | "none",
	leftOpen = $bindable(true),
	right,
	rightWidth = "320px",
	rightCollapsible = "icon" as "icon" | "full" | "none",
	rightOpen = $bindable(true),
	class: className = "",
	main,
	children,
}: {
	topbar?: Snippet;
	left?: Snippet;
	leftWidth?: string;
	leftCollapsible?: "icon" | "full" | "none";
	leftOpen?: boolean;
	right?: Snippet;
	rightWidth?: string;
	rightCollapsible?: "icon" | "full" | "none";
	rightOpen?: boolean;
	class?: string;
	main?: Snippet;
	children?: Snippet;
} = $props();

function toggleLeft() {
	leftOpen = !leftOpen;
}

function toggleRight() {
	rightOpen = !rightOpen;
}

const leftCollapsed = $derived(leftCollapsible === "icon" && !leftOpen);
const rightCollapsed = $derived(rightCollapsible === "icon" && !rightOpen);
const showLeft = $derived(leftCollapsible !== "none" && left);
const showRight = $derived(rightCollapsible !== "none" && right);
</script>

<div class="flex flex-col min-h-screen {className}">
	{#if topbar}
		<header class="shrink-0 border-b border-border bg-background/45 backdrop-blur-md z-20 transition-all duration-[--duration-snappy]">
			{@render topbar()}
		</header>
	{/if}

	<div class="flex flex-1 min-w-0">
		{#if showLeft}
			<aside
				class="shrink-0 border-r border-border bg-background transition-all duration-[--duration-snappy] overflow-hidden"
				style="width: {leftCollapsed ? '0px' : leftWidth}"
			>
				<MetaScrollable class="h-full">
					{@render left!()}
				</MetaScrollable>
			</aside>
		{/if}

		<main class="flex-1 min-w-0">
			<MetaScrollable class="h-full">
				{#if main}
					{@render main()}
				{:else}
					{@render children?.()}
				{/if}
			</MetaScrollable>
		</main>

		{#if showRight}
			<aside
				class="shrink-0 border-l border-border bg-background transition-all duration-[--duration-snappy] overflow-hidden"
				style="width: {rightCollapsed ? '0px' : rightWidth}"
			>
				<MetaScrollable class="h-full">
					{@render right!()}
				</MetaScrollable>
			</aside>
		{/if}
	</div>
</div>
