<script lang="ts">
import { DropdownMenu } from "bits-ui";
import type { Snippet } from "svelte";
import type { SelectOption } from "../shared-types";

const BitsDropdown = DropdownMenu;

let {
	trigger,
	items = [] as SelectOption[],
	onSelect = undefined as ((value: string) => void) | undefined,
	side = "bottom" as "top" | "right" | "bottom" | "left",
	align = "start" as "start" | "center" | "end",
	itemSnippet = undefined as Snippet<[{ item: SelectOption }]> | undefined,
}: {
	trigger?: Snippet;
	items?: SelectOption[];
	onSelect?: (value: string) => void;
	side?: "top" | "right" | "bottom" | "left";
	align?: "start" | "center" | "end";
	itemSnippet?: Snippet<[{ item: SelectOption }]>;
} = $props();
</script>

<BitsDropdown.Root>
  <BitsDropdown.Trigger class="inline-flex cursor-pointer">{@render trigger?.()}</BitsDropdown.Trigger>
  <BitsDropdown.Content
    {side} {align}
    class="z-[--z-overlay,30] min-w-40 rounded-[--radius] border border-border bg-card p-1 shadow-md
           data-[state=open]:animate-in data-[state=closed]:animate-out
           data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
           data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
  >
    <BitsDropdown.Group class="space-y-0.5">
      {#each items as item}
        <BitsDropdown.Item
          disabled={item.disabled}
          onclick={() => onSelect?.(item.value)}
          class="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-body-md
                 text-foreground hover:bg-muted focus:outline-none focus:bg-muted"
        >
          {#if itemSnippet}
            {@render itemSnippet({ item })}
          {:else}
            {item.label}
          {/if}
        </BitsDropdown.Item>
      {/each}
    </BitsDropdown.Group>
  </BitsDropdown.Content>
</BitsDropdown.Root>
