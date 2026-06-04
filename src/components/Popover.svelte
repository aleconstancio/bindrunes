<script lang="ts">
  import { Popover as BitsPopover } from 'bits-ui';

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
</script>

<div class="relative inline-block">
  <BitsPopover.Root bind:open>
    <div role="button" aria-haspopup="true" aria-expanded={open} class="inline-flex">
      <BitsPopover.Trigger class="inline-flex focus:outline-none bg-transparent border-0 p-0 cursor-pointer">
        {@render trigger?.()}
      </BitsPopover.Trigger>
    </div>

    <BitsPopover.Content
      {side}
      {align}
      sideOffset={8}
      class="z-[--z-overlay,30] min-w-[200px] rounded-[--radius] bg-card p-3 shadow-lg border border-border text-foreground {className}
             data-[state=open]:animate-popover-fade-in data-[state=closed]:animate-popover-fade-out focus:outline-none"
    >
      {@render children?.()}
    </BitsPopover.Content>
  </BitsPopover.Root>
</div>

<style>
  :global(.animate-popover-fade-in) {
    animation: popover-fade-in var(--duration-snappy, 150ms) ease-out forwards;
  }
  :global(.animate-popover-fade-out) {
    animation: popover-fade-out var(--duration-snappy, 150ms) ease-in forwards;
  }

  @keyframes popover-fade-in {
    from { opacity: 0; transform: scale(0.96); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes popover-fade-out {
    from { opacity: 1; transform: scale(1); }
    to { opacity: 0; transform: scale(0.96); }
  }
</style>
