<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { onDestroy } from 'svelte';

  let {
    open = $bindable(false),
    side = 'right' as 'left' | 'right' | 'top' | 'bottom',
    title = undefined as string | undefined,
    class: className = '',
    header,
    footer,
    children,
  }: {
    open?: boolean;
    side?: 'left' | 'right' | 'top' | 'bottom';
    title?: string;
    class?: string;
    header?: import('svelte').Snippet;
    footer?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
  } = $props();

  const transitions: Record<string, { in: any; out: any }> = {
    left:   { in: { x: -300, duration: 250 }, out: { x: -300, duration: 200 } },
    right:  { in: { x: 300, duration: 250 },  out: { x: 300, duration: 200 } },
    top:    { in: { y: -300, duration: 250 }, out: { y: -300, duration: 200 } },
    bottom: { in: { y: 300, duration: 250 },  out: { y: 300, duration: 200 } },
  };

  const positionStyles: Record<string, string> = {
    left:   'inset-y-0 left-0',
    right:  'inset-y-0 right-0',
    top:    'inset-x-0 top-0',
    bottom: 'inset-x-0 bottom-0',
  };

  const sizeStyles: Record<string, string> = {
    left:   'h-full w-[350px] max-w-[90vw]',
    right:  'h-full w-[350px] max-w-[90vw]',
    top:    'w-full h-[300px] max-h-[80vh]',
    bottom: 'w-full h-[300px] max-h-[80vh]',
  };

  let previouslyFocused = $state<HTMLElement | null>(null);
  let panelEl = $state<HTMLElement>();
  let keydownHandler: ((e: KeyboardEvent) => void) | null = null;

  function trapFocus(e: KeyboardEvent) {
    if (e.key !== 'Tab' || !panelEl) return;
    const focusable = panelEl.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  $effect(() => {
    if (open) {
      previouslyFocused = document.activeElement as HTMLElement;
      setTimeout(() => panelEl?.focus(), 50);
      keydownHandler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') close();
        trapFocus(e);
      };
      document.addEventListener('keydown', keydownHandler);
    } else {
      if (keydownHandler) {
        document.removeEventListener('keydown', keydownHandler);
        keydownHandler = null;
      }
      previouslyFocused?.focus();
    }
  });

  onDestroy(() => {
    if (keydownHandler) {
      document.removeEventListener('keydown', keydownHandler);
    }
  });

  function close() {
    open = false;
  }

  function handleBackdropClick() {
    close();
  }
</script>

{#if open}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-50"
    transition:fade={{ duration: 200 }}
  >
    <!-- Backdrop -->
    <div
      class="absolute inset-0"
      style="background: oklch(0 0 0 / 0.5); backdrop-filter: blur(4px);"
      onclick={handleBackdropClick}
    ></div>

    <!-- Panel -->
    <div
      bind:this={panelEl}
      tabindex="-1"
      class="absolute {positionStyles[side]} {sizeStyles[side]} {className}"
      style="background: var(--background); border-color: var(--border); z-index: 1;"
      transition:fly={transitions[side]}
      role="dialog"
      aria-modal="true"
      aria-label={title ?? 'Sheet'}
    >
      <div class="flex flex-col h-full">
        {#if header || title}
          <div class="flex items-center justify-between p-4 border-b" style="border-color: var(--border);">
            {#if header}
              {@render header()}
            {:else if title}
              <h2 class="text-lg font-semibold" style="color: var(--foreground);">{title}</h2>
            {/if}
            <button
              onclick={close}
              class="p-1 rounded transition-colors"
              style="color: var(--muted-foreground);"
              aria-label="Close"
              onmouseenter={(e) => { e.currentTarget.style.color = 'var(--foreground)'; }}
              onmouseleave={(e) => { e.currentTarget.style.color = 'var(--muted-foreground)'; }}
            >
              ×
            </button>
          </div>
        {/if}

        <div class="flex-1 overflow-y-auto p-4">
          {@render children?.()}
        </div>

        {#if footer}
          <div class="p-4 border-t" style="border-color: var(--border);">
            {@render footer()}
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
