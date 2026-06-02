<script lang="ts">
  import { DropdownMenu as BitsDropdown } from 'bits-ui';

  type Item = { label: string; value: string; disabled?: boolean };

  let {
    trigger,
    items = [] as Item[],
    onSelect = undefined as ((value: string) => void) | undefined,
    side = 'bottom' as 'top' | 'right' | 'bottom' | 'left',
    align = 'start' as 'start' | 'center' | 'end',
  }: {
    trigger?: import('svelte').Snippet;
    items?: Item[];
    onSelect?: (value: string) => void;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
  } = $props();
</script>

<BitsDropdown.Root>
  <BitsDropdown.Trigger class="inline-flex cursor-pointer">{@render trigger?.()}</BitsDropdown.Trigger>
  <BitsDropdown.Content
    {side} {align}
    class="z-[--z-overlay,30] min-w-40 rounded-[--radius] border bg-card p-1 shadow-md
           data-[state=open]:animate-in data-[state=closed]:animate-out
           data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
           data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
    style="border-color: var(--border)"
  >
    <BitsDropdown.Group class="space-y-0.5">
      {#each items as item}
        <BitsDropdown.Item
          disabled={item.disabled}
          onclick={() => onSelect?.(item.value)}
          class="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm
                 text-foreground hover:bg-muted focus:outline-none focus:bg-muted"
        >
          {item.label}
        </BitsDropdown.Item>
      {/each}
    </BitsDropdown.Group>
  </BitsDropdown.Content>
</BitsDropdown.Root>
