<script lang="ts">
import type { Component, Snippet } from "svelte";
import EmptyState from "../components/EmptyState.svelte";
import DashboardShellBrand from "../layouts/dashboard/DashboardShellBrand.svelte";
import DashboardShellHeader from "../layouts/dashboard/DashboardShellHeader.svelte";
import NavMenu from "../layouts/dashboard/NavMenu.svelte";
import PageShell from "../layouts/PageShell.svelte";
import type { NavGroup, StatusVariant } from "../shared-types";

let {
	title = "",
	appName = "",
	appSubtitle,
	brandIcon,
	navigation = [],
	pathname = "",
	onNavigate,
	sidebarCollapsible = "none" as "icon" | "full" | "none",
	sidebarHeader,
	sidebarFooter,
	headerActions,
	statusChip,
	selectedItem = undefined as Record<string, unknown> | undefined,
	emptyTitle = "Select an item",
	emptyDescription = "Choose an item from the list to view its details.",
	class: className = "",
	listPanel,
	detailPanel,
	children,
}: {
	title?: string;
	appName?: string;
	appSubtitle?: string;
	brandIcon?: string | Component;
	navigation?: NavGroup[];
	pathname?: string;
	onNavigate?: (to: string) => void;
	sidebarCollapsible?: "icon" | "full" | "none";
	sidebarHeader?: Snippet;
	sidebarFooter?: Snippet;
	headerActions?: Snippet;
	statusChip?: { variant?: StatusVariant; label?: string; dot?: boolean; animate?: boolean };
	selectedItem?: Record<string, unknown>;
	emptyTitle?: string;
	emptyDescription?: string;
	class?: string;
	listPanel?: Snippet;
	detailPanel?: Snippet;
	children?: Snippet;
} = $props();
</script>

{#snippet topbar()}
	<DashboardShellHeader
		resolvedTitle={title}
		{headerActions}
		{statusChip}
	/>
{/snippet}

{#snippet leftPanel()}
	<div class="p-4">
		{#if sidebarHeader}
			{@render sidebarHeader()}
		{:else}
			<DashboardShellBrand {appName} {appSubtitle} {brandIcon} />
		{/if}
	</div>
	{#if navigation.length > 0}
		<div class="flex-1 overflow-y-auto">
			<NavMenu groups={navigation} {pathname} {onNavigate} />
		</div>
	{/if}
	{#if sidebarFooter}
		<div class="p-4 border-t border-border">
			{@render sidebarFooter()}
		</div>
	{/if}
{/snippet}

<PageShell
	topbar={topbar}
	left={leftPanel}
	leftWidth="400px"
	leftCollapsible={sidebarCollapsible}
	class={className}
>
	{#snippet main()}
		{#if detailPanel}
			{@render detailPanel()}
		{:else if children}
			{@render children()}
		{:else if selectedItem}
			<div class="flex items-center justify-center h-full text-muted-foreground p-6">
				<p class="text-body-md">Select an item from the list to view details.</p>
			</div>
		{:else}
			<div class="flex items-center justify-center h-full">
				<EmptyState title={emptyTitle} description={emptyDescription} />
			</div>
		{/if}
	{/snippet}
</PageShell>
