<script lang="ts">
import type { Component, Snippet } from "svelte";
import type { NavGroup, StatusVariant, TFunction } from "../../shared-types";
import DashboardShell from "./DashboardShell.svelte";

let {
	children,
	...rest
}: {
	children?: Snippet;
	variant?: never;
	appName?: string;
	appSubtitle?: string;
	brandIcon?: string | Component;
	navigation?: NavGroup[];
	pathname?: string;
	scopeLabel?: string;
	scopeTitle?: string;
	scopeDescription?: string;
	ruleTitle?: string;
	ruleDescription?: string;
	ruleChildren?: Snippet;
	headerPrefix?: string;
	defaultTitle?: string;
	defaultDescription?: string;
	pageTitle?: string;
	pageDescription?: string;
	sidebarCollapsible?: "icon" | "full";
	statusChip?: { variant?: StatusVariant; label?: string; dot?: boolean; animate?: boolean };
	onNavigate?: (to: string) => void;
	t?: TFunction;
	sidebarHeader?: Snippet;
	sidebarFooter?: Snippet;
	headerActions?: Snippet;
} = $props();
</script>

<DashboardShell variant="right" {...rest}>
  {#if children}
    {@render children()}
  {/if}
</DashboardShell>
