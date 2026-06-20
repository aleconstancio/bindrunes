<script lang="ts">
import type { Snippet } from "svelte";
import DashboardShellHeader from "../../dashboard/DashboardShellHeader.svelte";
import PageShell from "../../PageShell.svelte";

let {
	title = "Blog",
	sidebarCollapsible = "icon" as "icon" | "full" | "none",
	class: className = "",
	sidebar,
	header,
	children,
}: {
	title?: string;
	sidebarCollapsible?: "icon" | "full" | "none";
	class?: string;
	sidebar?: Snippet;
	header?: Snippet;
	children?: Snippet;
} = $props();
</script>

{#snippet topbar()}
	<DashboardShellHeader resolvedTitle={title} {header} />
{/snippet}

{#snippet leftPanel()}
	{#if sidebar}
		<div class="p-4">
			{@render sidebar()}
		</div>
	{/if}
{/snippet}

<PageShell
	topbar={topbar}
	left={sidebar ? leftPanel : undefined}
	leftWidth="280px"
	leftCollapsible={sidebarCollapsible}
	class={className}
>
	{#snippet main()}
		<div class="p-6">
			{@render children?.()}
		</div>
	{/snippet}
</PageShell>
