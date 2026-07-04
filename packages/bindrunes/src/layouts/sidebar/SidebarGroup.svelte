<script lang="ts">
import type { Snippet } from "svelte";
import { useSidebar } from "./sidebar-context.svelte";

let {
	label,
	action,
	children,
}: {
	label?: string;
	action?: Snippet;
	children?: Snippet;
} = $props();

const sidebar = useSidebar();
</script>

<div class="mb-4">
	{#if label && sidebar.state === 'expanded'}
		<div class="flex items-center justify-between mb-1 px-2">
			<span class="text-body-sm font-medium uppercase tracking-[--text-letter-spacing-wider] text-sidebar-foreground/50">{label}</span>
			{#if action}
				<div class="text-sidebar-foreground/40 hover:text-sidebar-foreground">
					{@render action()}
				</div>
			{/if}
		</div>
	{/if}
	<div class="space-y-0.5">
		{@render children?.()}
	</div>
</div>
