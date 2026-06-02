<script lang="ts">
  import type { ComponentType } from 'svelte';
  import { SidebarProvider, Sidebar, SidebarLayout, SidebarTrigger } from '../sidebar/index.js';
  import { derivePageInfo } from '../../types.ts';
  import type { NavGroup } from '../../types.ts';
  import NavMenu from './NavMenu.svelte';
  import StatusChip from '../StatusChip.svelte';
  import ThemeToggle from '../ThemeToggle.svelte';
  import RuleFootnote from '../RuleFootnote.svelte';
  import { toggleMode, mode } from 'mode-watcher';

  type StatusVariant = 'success' | 'warning' | 'danger' | 'info';

  let {
    appName = '',
    appSubtitle = undefined as string | undefined,
    brandIcon = undefined as string | ComponentType | undefined,
    navigation = [] as NavGroup[],
    pathname = undefined as string | undefined,
    scopeLabel = undefined as string | undefined,
    scopeTitle = undefined as string | undefined,
    scopeDescription = undefined as string | undefined,
    ruleTitle = 'Regra Crítica',
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
    sidebarHeader,
    sidebarFooter,
    headerActions,
    children,
  }: {
    appName?: string;
    appSubtitle?: string;
    brandIcon?: string | ComponentType;
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
    sidebarHeader?: import('svelte').Snippet;
    sidebarFooter?: import('svelte').Snippet;
    headerActions?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
  } = $props();

  let pagePath = $derived(pathname ?? (typeof window !== 'undefined' ? window.location.pathname : ''));

  let navMap = $derived.by(() => {
    const map = new Map<string, { title: string; description: string }>();
    for (const group of navigation) {
      for (const item of group.items) {
        map.set(item.match ?? item.to, { title: item.title, description: item.description });
      }
    }
    return map;
  });

  let pageInfo = $derived.by(() => {
    for (const [match, info] of navMap) {
      if (pagePath.startsWith(match)) return info;
    }
    return { title: defaultTitle, description: defaultDescription };
  });

  let resolvedTitle = $derived(pageTitle ?? pageInfo.title);
  let resolvedDescription = $derived(pageDescription ?? pageInfo.description);

  let sidebarCollapsibleProp = $derived(sidebarCollapsible === 'full' ? 'none' as const : 'icon' as const);
</script>

<SidebarProvider defaultOpen collapsible={sidebarCollapsibleProp}>
  <Sidebar>
    <SidebarLayout position="header">
      {#if sidebarHeader}
        {@render sidebarHeader()}
      {:else if appName || brandIcon}
        <div class="flex items-center gap-3 py-1">
            {#if brandIcon}
            {#if typeof brandIcon === 'string'}
              <span class="text-2xl">{brandIcon}</span>
            {:else}
              {@const BrandIcon = brandIcon}
              <BrandIcon size={24} style="color: var(--primary)" />
            {/if}
          {/if}
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.26em]" style="color: var(--muted-foreground)">{appName}</p>
            {#if appSubtitle}
              <p class="text-base font-semibold tracking-tight" style="color: var(--foreground)">{appSubtitle}</p>
            {/if}
          </div>
        </div>
      {/if}
    </SidebarLayout>

    <SidebarLayout position="content">
      {#if scopeLabel}
        <div class="rounded-[--radius] p-3 mb-4" style="background: var(--card); border: 1px solid var(--border)">
          <p class="mono text-[0.65rem] font-bold uppercase tracking-[0.1em]" style="color: var(--muted-foreground)">{scopeLabel}</p>
          {#if scopeTitle}<p class="text-sm font-semibold mt-1" style="color: var(--foreground)">{scopeTitle}</p>{/if}
          {#if scopeDescription}<p class="text-xs mt-0.5" style="color: var(--muted-foreground)">{scopeDescription}</p>{/if}
        </div>
      {/if}

      <NavMenu groups={navigation} pathname={pagePath} />
    </SidebarLayout>

    <SidebarLayout position="footer">
      {#if sidebarFooter}
        {@render sidebarFooter()}
      {:else}
        <ThemeToggle />
        {#if ruleTitle}
          <RuleFootnote title={ruleTitle} description={ruleDescription}>
            {#if ruleChildren}{@render ruleChildren()}{/if}
          </RuleFootnote>
        {/if}
      {/if}
    </SidebarLayout>
  </Sidebar>

  <div class="flex-1 flex flex-col min-w-0 h-screen">
    <header class="sticky top-0 z-20 shrink-0 transition-all duration-300"
      style="background: oklch(from var(--background) l c h / 0.45); background: color-mix(in srgb, var(--background) 45%, transparent); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border)">
      <div class="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div class="flex min-w-0 items-center gap-3">
          <SidebarTrigger />
          <div class="min-w-0">
            {#if headerPrefix}
              <p class="text-xs font-bold uppercase tracking-[0.24em]" style="color: var(--muted-foreground)">{headerPrefix}</p>
            {/if}
            <h1 class="truncate text-xl font-semibold tracking-tight" style="color: var(--foreground)">{resolvedTitle}</h1>
            {#if resolvedDescription}
              <p class="hidden text-sm md:block" style="color: var(--muted-foreground)">{resolvedDescription}</p>
            {/if}
          </div>
        </div>
        <div class="hidden lg:flex items-center gap-3">
          {#if headerActions}
            {@render headerActions()}
          {:else if statusChipLabel}
            <StatusChip variant={statusChipVariant ?? 'info'} label={statusChipLabel} dot={statusChipDot} animate={statusChipAnimate} />
          {/if}
        </div>
      </div>
    </header>
    <main class="flex-1 min-w-0 overflow-y-auto">
      {@render children?.()}
    </main>
  </div>
</SidebarProvider>
