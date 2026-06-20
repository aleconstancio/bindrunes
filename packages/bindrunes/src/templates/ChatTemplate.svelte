<script lang="ts">
import type { Snippet } from "svelte";
import DashboardShellHeader from "../layouts/dashboard/DashboardShellHeader.svelte";
import PageShell from "../layouts/PageShell.svelte";

let {
	title = "Chat",
	sidebarCollapsible = "icon" as "icon" | "full" | "none",
	class: className = "",
	conversationList,
	chatHeader,
	children,
}: {
	title?: string;
	sidebarCollapsible?: "icon" | "full" | "none";
	class?: string;
	conversationList?: Snippet;
	chatHeader?: Snippet;
	children?: Snippet;
} = $props();
</script>

{#snippet topbar()}
	<DashboardShellHeader resolvedTitle={title} />
{/snippet}

{#snippet leftPanel()}
	{#if conversationList}
		{@render conversationList()}
	{/if}
{/snippet}

<PageShell
	topbar={topbar}
	left={conversationList ? leftPanel : undefined}
	leftWidth="300px"
	leftCollapsible={sidebarCollapsible}
	class={className}
>
	{#snippet main()}
		{#if chatHeader}
			<div class="border-b border-border px-6 py-3">
				{@render chatHeader()}
			</div>
		{/if}
		<div class="flex-1 overflow-y-auto p-6">
			{@render children?.()}
		</div>
	{/snippet}
</PageShell>
