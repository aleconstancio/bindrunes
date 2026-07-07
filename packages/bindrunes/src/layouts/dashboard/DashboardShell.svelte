<script lang="ts">
import type { Component, Snippet } from "svelte";
import RuleFootnote from "../../primitives/RuleFootnote.svelte";
import ThemeToggle from "../../primitives/ThemeToggle.svelte";
import type { NavGroup, StatusVariant, TFunction } from "../../shared-types";
import { isBrowser } from "../../utils/isBrowser";
import { derivePageInfo } from "../../utils/navigation";
import MetaLayout from "../MetaLayout.svelte";
import MetaScrollable from "../MetaScrollable.svelte";
import { Sidebar, SidebarProvider, SidebarTrigger } from "../sidebar";
import { useSidebar } from "../sidebar/sidebar-context.svelte";
import DashboardShellBrand from "./DashboardShellBrand.svelte";
import DashboardShellHeader from "./DashboardShellHeader.svelte";
import NavMenu from "./NavMenu.svelte";

let {
	variant = "default" as "default" | "right",
	appName = "",
	appSubtitle = undefined as string | undefined,
	brandIcon = undefined as string | Component | undefined,
	navigation = [] as NavGroup[],
	pathname = undefined as string | undefined,
	scopeLabel = undefined as string | undefined,
	scopeTitle = undefined as string | undefined,
	scopeDescription = undefined as string | undefined,
	ruleTitle = undefined as string | undefined,
	ruleDescription = undefined as string | undefined,
	ruleChildren = undefined as Snippet | undefined,
	headerPrefix = "",
	defaultTitle = "Home",
	defaultDescription = "",
	pageTitle = undefined as string | undefined,
	pageDescription = undefined as string | undefined,
	/** Controls sidebar collapse behavior.
	 *  - "icon": Sidebar can collapse to icon-only mode (default)
	 *  - "full": Sidebar is always expanded, no collapse (maps to bindrunes "none")
	 */
	sidebarCollapsible = "icon" as "icon" | "full",
	statusChip = undefined as
		| { variant?: StatusVariant; label?: string; dot?: boolean; animate?: boolean }
		| undefined,
	onNavigate = undefined as ((to: string) => void) | undefined,
	t = undefined as TFunction | undefined,
	sidebarHeader,
	sidebarFooter,
	headerActions,
	children,
}: {
	variant?: "default" | "right";
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
	children?: Snippet;
} = $props();

let pagePath = $derived(pathname ?? (isBrowser ? window.location.pathname : ""));
let pageInfo = $derived(
	derivePageInfo(pagePath, navigation, { title: defaultTitle, description: defaultDescription }),
);
let resolvedTitle = $derived(pageTitle ?? pageInfo.title);
let resolvedDescription = $derived(pageDescription ?? pageInfo.description);
let resolvedRuleTitle = $derived(
	ruleTitle ?? t?.("dashboard.RuleFootnote.title") ?? "Regra Crítica",
);

const sidebar = useSidebar();

let sidebarCollapsibleProp = $derived(
	sidebarCollapsible === "full" ? ("none" as const) : ("icon" as const),
);
let sidebarCollapsibleComputed = $derived(variant === "right" ? "icon" : sidebarCollapsibleProp);
</script>

<SidebarProvider
	defaultOpen
	collapsible={sidebarCollapsibleComputed}
	style={variant === 'right' ? 'flex-direction: row-reverse' : ''}
>
	<Sidebar
		side={variant === 'right' ? 'right' : 'left'}
		class={variant === 'right' ? 'border-l border-r-0' : ''}
	>
		<MetaLayout position="header">
			{#if sidebarHeader}
				{@render sidebarHeader()}
			{:else}
				<DashboardShellBrand {brandIcon} {appName} {appSubtitle} />
			{/if}
		</MetaLayout>

		<MetaLayout position="content">
			{#if variant === 'default' && scopeLabel && sidebar.state === 'expanded'}
				<div class="rounded-[--radius] p-3 mb-4 bg-card border border-border">
					<p class="font-mono text-mono-xs font-bold uppercase tracking-[--text-letter-spacing-widest] text-muted-foreground">{scopeLabel}</p>
					{#if scopeTitle}<p class="text-label-md font-semibold mt-1 text-foreground">{scopeTitle}</p>{/if}
					{#if scopeDescription}<p class="text-body-sm mt-0.5 text-muted-foreground">{scopeDescription}</p>{/if}
				</div>
			{/if}
			<NavMenu groups={navigation} pathname={pagePath} onNavigate={onNavigate} />
		</MetaLayout>

		<MetaLayout position="footer">
			{#if sidebarFooter}
				{#if sidebar.state === 'expanded'}
					{@render sidebarFooter()}
				{:else}
					<ThemeToggle />
				{/if}
			{:else if variant === 'default'}
				<ThemeToggle />
				{#if sidebar.state === 'expanded' && resolvedRuleTitle}
					<RuleFootnote title={resolvedRuleTitle} description={ruleDescription}>
						{#if ruleChildren}{@render ruleChildren()}{/if}
					</RuleFootnote>
				{/if}
			{/if}
		</MetaLayout>
	</Sidebar>

	<div class="flex-1 flex flex-col min-w-0 h-screen">
		<DashboardShellHeader
			{headerPrefix}
			{resolvedTitle}
			{resolvedDescription}
			{headerActions}
			{statusChip}
		>
			{#snippet trigger()}
				<SidebarTrigger />
			{/snippet}
		</DashboardShellHeader>
		<main class="flex-1 min-w-0">
			<MetaScrollable class="h-full">
				{@render children?.()}
			</MetaScrollable>
		</main>
	</div>
</SidebarProvider>
