<script lang="ts">
	import type { Component } from 'svelte';
	import { SidebarProvider, Sidebar, SidebarTrigger } from '../sidebar/index';
	import MetaLayout from '../MetaLayout.svelte';
	import MetaScrollable from '../MetaScrollable.svelte';
	import { derivePageInfo } from '../../utils/navigation';
	import type { NavGroup, StatusVariant, TFunction } from '../../shared-types';
	import NavMenu from './NavMenu.svelte';
	import StatusChip from '../StatusChip.svelte';
	import ThemeToggle from '../ThemeToggle.svelte';
	import RuleFootnote from '../RuleFootnote.svelte';
	import DashboardShellBrand from './DashboardShellBrand.svelte';
	import DashboardShellHeader from './DashboardShellHeader.svelte';

	let {
		variant = 'default' as 'default' | 'right' | 'topnav',
		appName = '',
		appSubtitle = undefined as string | undefined,
		brandIcon = undefined as string | Component | undefined,
		navigation = [] as NavGroup[],
		pathname = undefined as string | undefined,
		scopeLabel = undefined as string | undefined,
		scopeTitle = undefined as string | undefined,
		scopeDescription = undefined as string | undefined,
		ruleTitle = undefined as string | undefined,
		ruleDescription = undefined as string | undefined,
		ruleChildren = undefined as import('svelte').Snippet | undefined,
		headerPrefix = '',
		defaultTitle = 'Home',
		defaultDescription = '',
		pageTitle = undefined as string | undefined,
		pageDescription = undefined as string | undefined,
		sidebarCollapsible = 'icon' as 'icon' | 'full',
		statusChipVariant = undefined as StatusVariant | undefined,
		statusChipLabel = undefined as string | undefined,
		statusChipDot = true,
		statusChipAnimate = false,
		onNavigate = undefined as ((to: string) => void) | undefined,
		t = undefined as TFunction | undefined,
		sidebarHeader,
		sidebarFooter,
		headerActions,
		children,
	}: {
		variant?: 'default' | 'right' | 'topnav';
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
		ruleChildren?: import('svelte').Snippet;
		headerPrefix?: string;
		defaultTitle?: string;
		defaultDescription?: string;
		pageTitle?: string;
		pageDescription?: string;
		sidebarCollapsible?: 'icon' | 'full';
		statusChipVariant?: StatusVariant;
		statusChipLabel?: string;
		statusChipDot?: boolean;
		statusChipAnimate?: boolean;
		onNavigate?: (to: string) => void;
		t?: TFunction;
		sidebarHeader?: import('svelte').Snippet;
		sidebarFooter?: import('svelte').Snippet;
		headerActions?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
	} = $props();

	let pagePath = $derived(pathname ?? (typeof window !== 'undefined' ? window.location.pathname : ''));
	let pageInfo = $derived(derivePageInfo(pagePath, navigation, { title: defaultTitle, description: defaultDescription }));
	let resolvedTitle = $derived(pageTitle ?? pageInfo.title);
	let resolvedDescription = $derived(pageDescription ?? pageInfo.description);
	let resolvedRuleTitle = $derived(ruleTitle ?? (t?.('dashboard.RuleFootnote.title') ?? 'Regra Crítica'));

	let sidebarCollapsibleProp = $derived(sidebarCollapsible === 'full' ? 'none' as const : 'icon' as const);
	let sidebarCollapsibleComputed = $derived(variant === 'right' ? 'icon' : sidebarCollapsibleProp);
</script>

{#if variant === 'topnav'}
	<div class="flex flex-col min-h-screen">
		<header class="sticky top-0 z-20 shrink-0 border-b border-border bg-background/45 backdrop-blur-md transition-all duration-300">
			<div class="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
				<div class="flex items-center gap-6">
					<DashboardShellBrand {brandIcon} {appName} />
					<nav class="hidden md:flex items-center gap-1">
						{#each navigation as group}
							{#each group.items as item}
								<a
									href={item.to}
									class="px-3 py-1.5 text-label-md rounded transition-colors"
									class:text-foreground={pagePath.startsWith(item.to)}
									class:text-muted-foreground={!pagePath.startsWith(item.to)}
									class:bg-muted={pagePath.startsWith(item.to)}
									class:bg-transparent={!pagePath.startsWith(item.to)}
								>
									{item.title}
								</a>
							{/each}
						{/each}
					</nav>
				</div>
				<div class="flex items-center gap-3">
					{#if headerActions}
						{@render headerActions()}
					{:else if statusChipLabel}
						<StatusChip variant={statusChipVariant ?? 'info'} label={statusChipLabel} dot={statusChipDot} animate={statusChipAnimate} />
					{/if}
					<ThemeToggle />
				</div>
			</div>
		</header>
		<main class="flex-1 min-w-0">
			<MetaScrollable class="h-full">
				{@render children?.()}
			</MetaScrollable>
		</main>
	</div>
{:else}
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
				{#if variant === 'default' && scopeLabel}
					<div class="rounded-[--radius] p-3 mb-4 bg-card border border-border">
						<p class="font-mono text-mono-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">{scopeLabel}</p>
						{#if scopeTitle}<p class="text-label-md font-semibold mt-1 text-foreground">{scopeTitle}</p>{/if}
						{#if scopeDescription}<p class="text-body-sm mt-0.5 text-muted-foreground">{scopeDescription}</p>{/if}
					</div>
				{/if}
				<NavMenu groups={navigation} pathname={pagePath} onNavigate={onNavigate} />
			</MetaLayout>

			<MetaLayout position="footer">
				{#if sidebarFooter}
					{@render sidebarFooter()}
				{:else if variant === 'default'}
					<ThemeToggle />
					{#if resolvedRuleTitle}
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
				{statusChipVariant}
				{statusChipLabel}
				{statusChipDot}
				{statusChipAnimate}
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
{/if}
