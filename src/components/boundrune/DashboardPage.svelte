<script lang="ts">
/** @deprecated Use DashboardShell from bindrunes/dashboard instead. This component will be removed in v2.0. */
import type { Component, Snippet } from "svelte";
import type { NavGroup, StatusVariant, TFunction } from "../../shared-types";
import PageShell from "../PageShell.svelte";
import DashboardShellBrand from "./dashboard/DashboardShellBrand.svelte";
import DashboardShellHeader from "./dashboard/DashboardShellHeader.svelte";
import NavMenu from "./dashboard/NavMenu.svelte";

let {
	appName = "",
	appSubtitle,
	brandIcon,
	navigation = [],
	pathname = "",
	onNavigate,
	sidebarCollapsible = "icon" as "icon" | "full" | "none",
	sidebarHeader,
	sidebarFooter,
	headerActions,
	statusChip,
	title,
	description,
	class: className = "",
	children,
}: {
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
	title?: string;
	description?: string;
	class?: string;
	children?: Snippet;
} = $props();
</script>

{#snippet topbar()}
	<DashboardShellHeader
		resolvedTitle={title ?? appName}
		resolvedDescription={description}
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
	<div class="flex-1 overflow-y-auto">
		<NavMenu groups={navigation} {pathname} {onNavigate} />
	</div>
	{#if sidebarFooter}
		<div class="p-4 border-t border-border">
			{@render sidebarFooter()}
		</div>
	{/if}
{/snippet}

<PageShell
	topbar={topbar}
	left={leftPanel}
	leftWidth="260px"
	leftCollapsible={sidebarCollapsible}
	class={className}
>
	{#snippet main()}
		{@render children?.()}
	{/snippet}
</PageShell>
