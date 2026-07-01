<script lang="ts">
import type { Snippet } from "svelte";

interface TreeNode {
	id: string;
	label: string;
	children?: TreeNode[];
	icon?: Snippet;
	disabled?: boolean;
}

interface Props {
	nodes?: TreeNode[];
	selectedId?: string;
	onSelect?: (id: string) => void;
	expandedIds?: string[];
	onToggle?: (id: string, expanded: boolean) => void;
	class?: string;
}

let {
	nodes = [],
	selectedId,
	onSelect,
	expandedIds = [],
	onToggle,
	class: className = "",
}: Props = $props();

let internalExpanded = $state<string[]>([]);

let internalExpandedSet = $derived(new Set(internalExpanded));
let externalExpandedSet = $derived(new Set(expandedIds));

function isExpanded(id: string): boolean {
	return (onToggle ? externalExpandedSet : internalExpandedSet).has(id);
}

function toggleNode(id: string) {
	if (onToggle) {
		const newExpanded = !isExpanded(id);
		onToggle(id, newExpanded);
	} else {
		if (internalExpanded.includes(id)) {
			internalExpanded = internalExpanded.filter((e) => e !== id);
		} else {
			internalExpanded = [...internalExpanded, id];
		}
	}
}
</script>

{#snippet TreeNode(node, depth = 0)}
	<div class="flex flex-col tree-node">
		<button
			role="treeitem"
			aria-expanded={node.children?.length ? isExpanded(node.id) : undefined}
			aria-selected={selectedId === node.id}
			class="flex items-center gap-2 px-2 py-1 text-body-md rounded-[--radius-md] text-left
			       {selectedId === node.id ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-muted'}
			       {node.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}"
			style:padding-left="{depth * 1.5 + 0.5}rem"
			onclick={() => {
				if (!node.disabled) {
					if (node.children?.length) toggleNode(node.id);
					onSelect?.(node.id);
				}
			}}
			disabled={node.disabled}
		>
			{#if node.children?.length}
				<span class="text-xs transition-transform {isExpanded(node.id) ? 'rotate-90' : ''}">▶</span>
			{:else}
				<span class="w-3"></span>
			{/if}
			{#if node.icon}
				{@render node.icon()}
			{/if}
			{node.label}
		</button>
		{#if node.children?.length && isExpanded(node.id)}
			{#each node.children as child}
				{@render TreeNode(child, depth + 1)}
			{/each}
		{/if}
	</div>
{/snippet}

<div class="flex flex-col {className}" role="tree">
	{#each nodes as node}
		{@render TreeNode(node)}
	{/each}
</div>

<style>
  .tree-node {
    contain: layout style;
  }
</style>
