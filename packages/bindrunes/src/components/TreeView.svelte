<script lang="ts">
import { ChevronRight } from "lucide-svelte";
import type { Snippet } from "svelte";

interface TreeNode {
	id: string;
	label: string;
	icon?: string;
	expanded?: boolean;
	disabled?: boolean;
	children?: TreeNode[];
}

let {
	nodes = [] as TreeNode[],
	selected = $bindable(undefined as string | undefined),
	onSelect = undefined as ((id: string) => void) | undefined,
	class: className = "",
	itemSnippet = undefined as
		| Snippet<[{ node: TreeNode; depth: number; isExpanded: boolean; isSelected: boolean }]>
		| undefined,
}: {
	nodes?: TreeNode[];
	selected?: string;
	onSelect?: (id: string) => void;
	class?: string;
	itemSnippet?: Snippet<
		[{ node: TreeNode; depth: number; isExpanded: boolean; isSelected: boolean }]
	>;
} = $props();

let expandedIds = $state(new Set<string>());

function toggleExpand(id: string) {
	const next = new Set(expandedIds);
	if (next.has(id)) next.delete(id);
	else next.add(id);
	expandedIds = next;
}

function handleSelect(id: string) {
	selected = id;
	onSelect?.(id);
}

function isExpanded(id: string): boolean {
	return expandedIds.has(id);
}
</script>

<div class="space-y-0.5 {className}" role="tree">
  {#each nodes as node}
    {#if itemSnippet}
      {@render itemSnippet({ node, depth: 0, isExpanded: isExpanded(node.id), isSelected: selected === node.id })}
    {:else}
      <div>
        <button
          type="button"
          class="flex items-center gap-1.5 w-full rounded-[--radius] px-2 py-1.5 text-body-md text-left
                 hover:bg-muted transition-colors cursor-pointer
                 {selected === node.id ? 'bg-muted text-foreground font-medium' : 'text-muted-foreground'}
                 {node.disabled ? 'opacity-50 cursor-not-allowed' : ''}"
          onclick={() => {
            if (node.children?.length) toggleExpand(node.id);
            handleSelect(node.id);
          }}
          disabled={node.disabled}
          aria-expanded={node.children?.length ? isExpanded(node.id) : undefined}
          aria-selected={selected === node.id}
          role="treeitem"
        >
          {#if node.children?.length}
            <ChevronRight
              class="h-4 w-4 shrink-0 transition-transform duration-[--duration-snappy]
                     {isExpanded(node.id) ? 'rotate-90' : ''}"
            />
          {:else}
            <span class="w-4"></span>
          {/if}
          <span class="truncate">{node.label}</span>
        </button>
        {#if node.children?.length && isExpanded(node.id)}
          <div class="ml-4" role="group">
            {#each node.children as child}
              <svelte:self
                nodes={[child]}
                bind:selected
                {onSelect}
                {itemSnippet}
              />
            {/each}
          </div>
        {/if}
      </div>
    {/if}
  {/each}
</div>
