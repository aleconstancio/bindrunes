<script lang="ts">
  import type { ComponentType } from 'svelte';
  import { SidebarProvider, Sidebar, SidebarLayout, SidebarTrigger } from '../sidebar/index.js';
  import { derivePageInfo } from '../../types.ts';
  import type { NavGroup } from '../../types.ts';
  import NavMenu from './NavMenu.svelte';
  import StatusChip from '../StatusChip.svelte';

  type StatusVariant = 'success' | 'warning' | 'danger' | 'info';

  let {
    appName = '',
    appSubtitle = undefined as string | undefined,
    brandIcon = undefined as string | ComponentType | undefined,
    navigation = [] as NavGroup[],
    pathname = undefined as string | undefined,
    headerPrefix = '',
    defaultTitle = 'Home',
    defaultDescription = '',
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
    headerPrefix?: string;
    defaultTitle?: string;
    defaultDescription?: string;
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
  let pageInfo = $derived(derivePageInfo(pagePath, navigation, { title: defaultTitle, description: defaultDescription }));
</script>

<div class="flex min-h-screen flex-row-reverse">
  <!-- Right Sidebar -->
  <SidebarProvider defaultOpen collapsible="icon">
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
                <svelte:component this={brandIcon} size={24} style="color: var(--primary)" />
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
        <NavMenu groups={navigation} pathname={pagePath} />
      </SidebarLayout>

      <SidebarLayout position="footer">
        {#if sidebarFooter}
          {@render sidebarFooter()}
        {/if}
      </SidebarLayout>
    </Sidebar>
  </SidebarProvider>

  <!-- Main Content (left side) -->
  <div class="flex-1 flex flex-col min-w-0 h-screen">
    <header class="sticky top-0 z-20 shrink-0 transition-all duration-300 border-b"
      style="background: oklch(from var(--background) l c h / 0.45); backdrop-filter: blur(12px); border-color: var(--border);">
      <div class="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div class="flex min-w-0 items-center gap-3">
          <SidebarTrigger />
          <div class="min-w-0">
            {#if headerPrefix}
              <p class="text-xs font-bold uppercase tracking-[0.24em]" style="color: var(--muted-foreground)">{headerPrefix}</p>
            {/if}
            <h1 class="truncate text-xl font-semibold tracking-tight" style="color: var(--foreground)">{pageInfo.title}</h1>
            {#if pageInfo.description}
              <p class="hidden text-sm md:block" style="color: var(--muted-foreground)">{pageInfo.description}</p>
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
</div>
