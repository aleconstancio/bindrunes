<script lang="ts">
  import type { ComponentType } from 'svelte';
  import { derivePageInfo } from '../../types.ts';
  import type { NavGroup } from '../../types.ts';
  import StatusChip from '../StatusChip.svelte';
  import ThemeToggle from '../ThemeToggle.svelte';

  type StatusVariant = 'success' | 'warning' | 'danger' | 'info';

  let {
    appName = '',
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
    headerActions,
    children,
  }: {
    appName?: string;
    brandIcon?: string | ComponentType;
    navigation?: NavGroup[];
    headerPrefix?: string;
    defaultTitle?: string;
    defaultDescription?: string;
    statusChipVariant?: StatusVariant;
    statusChipLabel?: string;
    statusChipDot?: boolean;
    statusChipAnimate?: boolean;
    headerActions?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
  } = $props();

  let pagePath = $derived(pathname ?? (typeof window !== 'undefined' ? window.location.pathname : ''));
  let pageInfo = $derived(derivePageInfo(pagePath, navigation, { title: defaultTitle, description: defaultDescription }));
</script>

<div class="flex flex-col min-h-screen">
  <!-- Top Navigation -->
  <header class="sticky top-0 z-20 shrink-0 transition-all duration-300 border-b"
    style="background: oklch(from var(--background) l c h / 0.45); backdrop-filter: blur(12px); border-color: var(--border);">
    <div class="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
      <!-- Left: Brand + Nav -->
      <div class="flex items-center gap-6">
        {#if brandIcon}
          {#if typeof brandIcon === 'string'}
            <span class="text-2xl">{brandIcon}</span>
          {:else}
            <svelte:component this={brandIcon} size={24} style="color: var(--primary)" />
          {/if}
        {/if}
        {#if appName}
          <span class="text-sm font-bold uppercase tracking-[0.2em]" style="color: var(--muted-foreground)">{appName}</span>
        {/if}
        <nav class="hidden md:flex items-center gap-1">
          {#each navigation as group}
            {#each group.items as item}
              <a
                href={item.to}
                class="px-3 py-1.5 text-sm rounded transition-colors"
                style="color: {pagePath.startsWith(item.to) ? 'var(--foreground)' : 'var(--muted-foreground)'}; background: {pagePath.startsWith(item.to) ? 'var(--muted)' : 'transparent'};"
              >
                {item.title}
              </a>
            {/each}
          {/each}
        </nav>
      </div>

      <!-- Right: Actions -->
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

  <!-- Content -->
  <main class="flex-1 min-w-0 overflow-y-auto">
    {@render children?.()}
  </main>
</div>
