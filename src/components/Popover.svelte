<script lang="ts">
  let {
    open = $bindable(false),
    side = 'bottom' as 'top' | 'right' | 'bottom' | 'left',
    align = 'center' as 'start' | 'center' | 'end',
    class: className = '',
    trigger,
    children,
  }: {
    open?: boolean;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
    class?: string;
    trigger?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
  } = $props();

  let triggerEl = $state<HTMLElement>();
  let popoverEl = $state<HTMLElement>();

  function toggle() {
    open = !open;
    if (open) {
      setTimeout(() => {
        document.addEventListener('click', handleOutsideClick, { once: true, capture: true });
      }, 0);
    }
  }

  function handleOutsideClick(e: MouseEvent) {
    if (popoverEl && !popoverEl.contains(e.target as Node) && triggerEl && !triggerEl.contains(e.target as Node)) {
      open = false;
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') open = false;
  }

  const positionStyles: Record<string, string> = {
    top:    'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right:  'left-full top-1/2 -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left:   'right-full top-1/2 -translate-y-1/2 mr-2',
  };
</script>

<div class="relative inline-block">
  <div bind:this={triggerEl} onclick={toggle} onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}
    tabindex="0" role="button" aria-haspopup="true" aria-expanded={open}>
    {@render trigger?.()}
  </div>

  {#if open}
    <div
      bind:this={popoverEl}
      class="absolute z-50 min-w-[200px] rounded-[--radius] p-3 shadow-lg {positionStyles[side]} {className}"
      style="background: var(--card); border: 1px solid var(--border);"
      role="dialog"
      onkeydown={handleKeydown}
    >
      {@render children?.()}
    </div>
  {/if}
</div>
