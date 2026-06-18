<script lang="ts">
import type { Snippet } from "svelte";
import DashboardShellHeader from "../../dashboard/DashboardShellHeader.svelte";
import PageShell from "../../PageShell.svelte";

let {
	title = "Shop",
	class: className = "",
	cartSnippet,
	header,
	children,
}: {
	title?: string;
	class?: string;
	cartSnippet?: Snippet;
	header?: Snippet;
	children?: Snippet;
} = $props();
</script>

{#snippet topbar()}
	<DashboardShellHeader resolvedTitle={title} {header} />
{/snippet}

{#snippet rightPanel()}
	{#if cartSnippet}
		<div class="p-4">
			{@render cartSnippet()}
		</div>
	{/if}
{/snippet}

<PageShell
	topbar={topbar}
	right={cartSnippet ? rightPanel : undefined}
	rightWidth="360px"
	rightCollapsible="icon"
	class={className}
>
	{#snippet main()}
		<div class="p-6">
			{@render children?.()}
		</div>
	{/snippet}
</PageShell>
