<script lang="ts">
import type { Snippet } from "svelte";
import DashboardShellHeader from "../layouts/dashboard/DashboardShellHeader.svelte";
import PageShell from "../layouts/PageShell.svelte";

let {
	title = "Shop",
	cartCollapsible = "icon" as "icon" | "full" | "none",
	class: className = "",
	cartSnippet,
	header,
	children,
}: {
	title?: string;
	cartCollapsible?: "icon" | "full" | "none";
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
	rightCollapsible={cartCollapsible}
	class={className}
>
	{#snippet main()}
		<div class="p-6">
			{@render children?.()}
		</div>
	{/snippet}
</PageShell>
