<script lang="ts">
import { ContextMenu } from "bits-ui";
import type { Snippet } from "svelte";

const BitsContextMenu = ContextMenu;

let {
	items = [] as {
		label: string;
		value: string;
		icon?: Snippet;
		disabled?: boolean;
		separator?: boolean;
	}[],
	onSelect = undefined as ((value: string) => void) | undefined,
	children,
}: {
	items?: {
		label: string;
		value: string;
		icon?: Snippet;
		disabled?: boolean;
		separator?: boolean;
	}[];
	onSelect?: (value: string) => void;
	children?: Snippet;
} = $props();
</script>

<BitsContextMenu.Root>
  <BitsContextMenu.Trigger class="inline-flex">
    {@render children?.()}
  </BitsContextMenu.Trigger>
  <BitsContextMenu.Content
    class="z-[--z-overlay,30] min-w-48 rounded-[--radius] border border-border bg-card p-1 shadow-[--shadow-md]
           data-[state=open]:animate-in data-[state=closed]:animate-out
           data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
           data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
  >
    {#each items as item}
      {#if item.separator}
        <BitsContextMenu.Separator class="my-1 h-px bg-border" />
      {:else}
        <BitsContextMenu.Item
          disabled={item.disabled}
          class="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-body-md
                 text-foreground hover:bg-muted focus:outline-none focus:bg-muted
                 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          onclick={() => onSelect?.(item.value)}
        >
          {#if item.icon}
            <span class="text-muted-foreground">{@render item.icon()}</span>
          {/if}
          {item.label}
        </BitsContextMenu.Item>
      {/if}
    {/each}
  </BitsContextMenu.Content>
</BitsContextMenu.Root>
