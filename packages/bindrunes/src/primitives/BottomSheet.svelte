<script lang="ts">
import type { Snippet } from "svelte";

let {
	open = $bindable(false),
	title = "",
	snapPoints = [50, 90],
	initialSnap = 0,
	children,
	footer,
}: {
	open?: boolean;
	title?: string;
	snapPoints?: number[];
	initialSnap?: number;
	children?: Snippet;
	footer?: Snippet;
} = $props();

let sheetEl = $state<HTMLElement | undefined>(undefined);
let currentSnap = $state(initialSnap);
let startY = 0;
let currentY = 0;

function handleTouchStart(e: TouchEvent) {
	startY = e.touches[0].clientY;
}

function handleTouchMove(e: TouchEvent) {
	if (!sheetEl) return;
	currentY = e.touches[0].clientY - startY;
	if (currentY > 0) {
		sheetEl.style.transform = `translateY(${currentY}px)`;
	}
}

function handleTouchEnd() {
	if (!sheetEl) return;
	sheetEl.style.transform = "";

	if (currentY > 100) {
		open = false;
	}
	currentY = 0;
}

function close() {
	open = false;
}

function handleBackdropClick(e: MouseEvent) {
	if (e.target === e.currentTarget) close();
}
</script>

{#if open}
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		class="fixed inset-0 z-50 bg-black/50 flex items-end justify-center"
		onclick={handleBackdropClick}
		onkeydown={(e) => {
			if (e.key === "Escape") close();
		}}
		tabindex="-1"
		role="dialog"
		aria-modal="true"
		aria-label={title}
	>
		<div
			bind:this={sheetEl}
			class="w-full max-w-lg bg-card rounded-t-[--radius] shadow-[--shadow-xl] max-h-[90vh] flex flex-col"
			style="height: {snapPoints[currentSnap]}vh;"
			ontouchstart={handleTouchStart}
			ontouchmove={handleTouchMove}
			ontouchend={handleTouchEnd}
		>
			<div class="p-4 border-b border-border flex items-center justify-between">
				<h2 class="text-title-1 font-semibold">{title}</h2>
				<button
					type="button"
					class="p-1 rounded text-muted-foreground hover:text-foreground"
					onclick={close}
					aria-label="Close"
				>
					✕
				</button>
			</div>
			<div class="flex-1 overflow-y-auto p-4">
				{@render children?.()}
			</div>
			{#if footer}
				<div class="p-4 border-t border-border">
					{@render footer()}
				</div>
			{/if}
		</div>
	</div>
{/if}
