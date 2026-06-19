<script lang="ts">
import type { Component, Snippet } from "svelte";
import type { NavGroup, StatusVariant } from "../../shared-types";
import DashboardShell from "./DashboardShell.svelte";

let {
	appName,
	appSubtitle,
	brandIcon,
	navigation,
	pathname,
	onNavigate,
	headerActions,
	statusChip,
	sidebarCollapsible = "icon",
	sidebarHeader,
	sidebarFooter,
	children,
}: {
	appName?: string;
	appSubtitle?: string;
	brandIcon?: string | Component;
	navigation?: NavGroup[];
	pathname?: string;
	onNavigate?: (to: string) => void;
	headerActions?: Snippet;
	statusChip?: { variant?: StatusVariant; label?: string; dot?: boolean; animate?: boolean };
	sidebarCollapsible?: "icon" | "full";
	sidebarHeader?: Snippet;
	sidebarFooter?: Snippet;
	children?: Snippet;
} = $props();
</script>

<DashboardShell variant="right" {appName} {appSubtitle} {brandIcon} {navigation} {pathname} {onNavigate} {headerActions} {statusChip} {sidebarCollapsible} {sidebarHeader} {sidebarFooter}>
	{@render children?.()}
</DashboardShell>
