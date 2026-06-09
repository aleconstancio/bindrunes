<script lang="ts">
let {
	listWidth = "400px",
	resizable = false,
	listPanel,
	detailPanel,
	headerPrefix = "",
	defaultTitle = "Home",
	children,
}: {
	listWidth?: string;
	resizable?: boolean;
	listPanel?: import("svelte").Snippet;
	detailPanel?: import("svelte").Snippet;
	headerPrefix?: string;
	defaultTitle?: string;
	children?: import("svelte").Snippet;
} = $props();

let width = $state(listWidth);

function _handleResize(e: MouseEvent) {
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

function _handleTouchStart(e: TouchEvent) {
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

function _handleKeyDown(e: KeyboardEvent) {
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
    class="shrink-0 border-r border-border bg-background"
    style="width: {width}; min-width: 280px;"
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
    {:else}
      {@render children?.()}
    {/if}
  </MetaScrollable>
</div>
