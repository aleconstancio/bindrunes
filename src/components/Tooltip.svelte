<script lang="ts">
  import { Tooltip as BitsTooltip } from 'bits-ui';

  let {
    content = '',
    side = 'top' as 'top' | 'right' | 'bottom' | 'left',
    openDelay = 700,
    closeDelay = 300,
    children,
  }: {
    content?: string;
    side?: 'top' | 'right' | 'bottom' | 'left';
    openDelay?: number;
    closeDelay?: number;
    children?: import('svelte').Snippet;
  } = $props();
</script>

<BitsTooltip.Provider {openDelay} {closeDelay}>
<BitsTooltip.Root>
  <BitsTooltip.Trigger class="inline-flex">{@render children?.()}</BitsTooltip.Trigger>
  <BitsTooltip.Content
    {side}
    class="z-[--z-overlay,30] rounded-[--radius] bg-foreground px-2.5 py-1.5 text-body-sm text-background shadow-md
           data-[state=delayed-open]:animate-in data-[state=closed]:animate-out
           data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
           data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
    style="max-width: 20rem;"
  >
    {content}
  </BitsTooltip.Content>
</BitsTooltip.Root>
</BitsTooltip.Provider>
