<script lang="ts">
  let {
    listWidth = '400px',
    resizable = false,
    listPanel,
    detailPanel,
    headerPrefix = '',
    defaultTitle = 'Home',
    children,
  }: {
    listWidth?: string;
    resizable?: boolean;
    listPanel?: import('svelte').Snippet;
    detailPanel?: import('svelte').Snippet;
    headerPrefix?: string;
    defaultTitle?: string;
    children?: import('svelte').Snippet;
  } = $props();

  let width = $state(listWidth);

  function handleResize(e: MouseEvent) {
    if (!resizable) return;
    const startX = e.clientX;
    const startWidth = parseInt(width);

    function onMouseMove(e: MouseEvent) {
      const delta = e.clientX - startX;
      width = `${Math.max(280, Math.min(600, startWidth + delta))}px`;
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
</script>

<div class="flex min-h-screen">
  <!-- List Panel -->
  <div
    class="shrink-0 border-r overflow-y-auto"
    style="width: {width}; min-width: 280px; border-color: var(--border); background: var(--background);"
  >
    {#if listPanel}
      {@render listPanel()}
    {/if}
  </div>

  <!-- Resize Handle -->
  {#if resizable}
    <div
      class="w-1 shrink-0 cursor-col-resize hover:bg-[--primary]/20 transition-colors"
      style="background: var(--border);"
      onmousedown={handleResize}
    ></div>
  {/if}

  <!-- Detail Panel -->
  <div class="flex-1 min-w-0 overflow-y-auto">
    {#if detailPanel}
      {@render detailPanel()}
    {:else}
      {@render children?.()}
    {/if}
  </div>
</div>
