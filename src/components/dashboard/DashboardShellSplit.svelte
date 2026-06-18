<script lang="ts">
import type { Snippet } from "svelte";
import MetaScrollable from "../MetaScrollable.svelte";

let {
	listWidth = "400px",
	resizable = false,
	listPanel,
	detailPanel,
	emptyState = undefined as Snippet | undefined,
	_headerPrefix = "",
	_defaultTitle = "Home",
	children,
}: {
	listWidth?: string;
	resizable?: boolean;
	listPanel?: Snippet;
	detailPanel?: Snippet;
	emptyState?: Snippet;
	headerPrefix?: string;
	defaultTitle?: string;
	children?: Snippet;
} = $props();

// svelte-ignore state_referenced_locally
let width = $state(listWidth);

function handleResize(e: MouseEvent) {
	if (!resizable) return;
	const startX = e.clientX;
	const startWidth = parseInt(width, 10);

	function onMouseMove(e: MouseEvent) {
		const delta = e.clientX - startX;
		width = `${Math.max(280, Math.min(600, startWidth + delta))}px`;
	}

	function onMouseUp() {
		document.removeEventListener("mousemove", onMouseMove);
		document.removeEventListener("mouseup", onMouseUp);
	}

	document.addEventListener("mousemove", onMouseMove);
	document.addEventListener("mouseup", onMouseUp);
}

function handleTouchStart(e: TouchEvent) {
	if (!resizable || e.touches.length === 0) return;
	const touch = e.touches[0];
	const startX = touch.clientX;
	const startWidth = parseInt(width, 10);

	function onTouchMove(e: TouchEvent) {
		if (e.touches.length === 0) return;
		const touch = e.touches[0];
		const delta = touch.clientX - startX;
		width = `${Math.max(280, Math.min(600, startWidth + delta))}px`;
	}

	function onTouchEnd() {
		document.removeEventListener("touchmove", onTouchMove);
		document.removeEventListener("touchend", onTouchEnd);
	}

	document.addEventListener("touchmove", onTouchMove);
	document.addEventListener("touchend", onTouchEnd);
}

function handleKeyDown(e: KeyboardEvent) {
	if (!resizable) return;
	const currentVal = parseInt(width, 10);
	if (e.key === "ArrowLeft") {
		e.preventDefault();
		width = `${Math.max(280, Math.min(600, currentVal - 10))}px`;
	} else if (e.key === "ArrowRight") {
		e.preventDefault();
		width = `${Math.max(280, Math.min(600, currentVal + 10))}px`;
	}
}
</script>

<div class="flex min-h-screen">
  <!-- List Panel -->
  <div
    class="shrink-0 border-r border-border bg-background min-w-[280px]"
    style="width: {width};"
  >
    <MetaScrollable class="h-full">
      {#if listPanel}
        {@render listPanel()}
      {/if}
    </MetaScrollable>
  </div>

  <!-- Resize Handle -->
  {#if resizable}
    <div
      role="separator"
      tabindex="0"
      aria-orientation="vertical"
      aria-valuenow={parseInt(width)}
      aria-valuemin={280}
      aria-valuemax={600}
      aria-label="Panel resize separator"
      class="w-1 shrink-0 cursor-col-resize hover:bg-primary/20 transition-colors bg-border focus:bg-primary focus:outline-none"
      onmousedown={handleResize}
      ontouchstart={handleTouchStart}
      onkeydown={handleKeyDown}
    ></div>
  {/if}

  <!-- Detail Panel -->
  <MetaScrollable class="flex-1 min-w-0">
    {#if detailPanel}
      {@render detailPanel()}
    {:else if emptyState}
      <div class="flex items-center justify-center h-full">
        {@render emptyState()}
      </div>
    {:else}
      {@render children?.()}
    {/if}
  </MetaScrollable>
</div>
