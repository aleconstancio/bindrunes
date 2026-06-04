<script lang="ts">
  import { Dialog as BitsDialog } from 'bits-ui';

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

  const positionStyles: Record<string, string> = {
    left:   'inset-y-0 left-0 border-r',
    right:  'inset-y-0 right-0 border-l',
    top:    'inset-x-0 top-0 border-b',
    bottom: 'inset-x-0 bottom-0 border-t',
  };

  const sizeStyles: Record<string, string> = {
    left:   'h-full w-[350px] max-w-[90vw]',
    right:  'h-full w-[350px] max-w-[90vw]',
    top:    'w-full h-[300px] max-h-[80vh]',
    bottom: 'w-full h-[300px] max-h-[80vh]',
  };
</script>

<BitsDialog.Root bind:open>
  <BitsDialog.Portal>
    <BitsDialog.Overlay
      class="fixed inset-0 z-[--z-overlay,30] bg-[--overlay] backdrop-blur-sm
             data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out"
    />
    <BitsDialog.Content
      class="fixed z-[--z-overlay,30] bg-background border-border flex flex-col sheet-{side} {positionStyles[side]} {sizeStyles[side]} {className}
             focus:outline-none"
    >
      {#if header || title}
        <div class="flex items-center justify-between p-4 border-b border-border">
          {#if header}
            {@render header()}
          {:else if title}
            <BitsDialog.Title class="text-title-2 text-foreground">{title}</BitsDialog.Title>
          {/if}
          <BitsDialog.Close
            class="p-1 rounded text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none"
            aria-label="Close"
          >
            ×
          </BitsDialog.Close>
        </div>
      {/if}

      <div class="flex-1 overflow-y-auto p-4">
        {@render children?.()}
      </div>

      {#if footer}
        <div class="p-4 border-t border-border">
          {@render footer()}
        </div>
      {/if}
    </BitsDialog.Content>
  </BitsDialog.Portal>
</BitsDialog.Root>

<style>
  :global(.animate-fade-in) {
    animation: fade-in var(--duration-fluid, 250ms) ease-out forwards;
  }
  :global(.animate-fade-out) {
    animation: fade-out var(--duration-snappy, 150ms) ease-in forwards;
  }

  /* Sheet slide animations */
  :global([data-state="open"].sheet-left) {
    animation: slide-in-left var(--duration-fluid, 250ms) ease-out forwards;
  }
  :global([data-state="closed"].sheet-left) {
    animation: slide-out-left var(--duration-snappy, 150ms) ease-in forwards;
  }

  :global([data-state="open"].sheet-right) {
    animation: slide-in-right var(--duration-fluid, 250ms) ease-out forwards;
  }
  :global([data-state="closed"].sheet-right) {
    animation: slide-out-right var(--duration-snappy, 150ms) ease-in forwards;
  }

  :global([data-state="open"].sheet-top) {
    animation: slide-in-top var(--duration-fluid, 250ms) ease-out forwards;
  }
  :global([data-state="closed"].sheet-top) {
    animation: slide-out-top var(--duration-snappy, 150ms) ease-in forwards;
  }

  :global([data-state="open"].sheet-bottom) {
    animation: slide-in-bottom var(--duration-fluid, 250ms) ease-out forwards;
  }
  :global([data-state="closed"].sheet-bottom) {
    animation: slide-out-bottom var(--duration-snappy, 150ms) ease-in forwards;
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes fade-out {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  @keyframes slide-in-left {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
  @keyframes slide-out-left {
    from { transform: translateX(0); }
    to { transform: translateX(-100%); }
  }

  @keyframes slide-in-right {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  @keyframes slide-out-right {
    from { transform: translateX(0); }
    to { transform: translateX(100%); }
  }

  @keyframes slide-in-top {
    from { transform: translateY(-100%); }
    to { transform: translateY(0); }
  }
  @keyframes slide-out-top {
    from { transform: translateY(0); }
    to { transform: translateY(-100%); }
  }

  @keyframes slide-in-bottom {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
  @keyframes slide-out-bottom {
    from { transform: translateY(0); }
    to { transform: translateY(100%); }
  }
</style>
