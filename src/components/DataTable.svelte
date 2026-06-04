<script lang="ts">
  import Pagination from './Pagination.svelte';
  import type { Column, SortState } from '../shared-types';

  let {
    columns = [] as Column[],
    rows = [] as ReadonlyArray<Record<string, unknown>>,
    currentPage = 1,
    totalPages = 1,
    onPageChange = undefined as ((page: number) => void) | undefined,
    sort = $bindable(null as SortState | null),
    onSort = undefined as ((sort: SortState | null) => void) | undefined,
    hoverable = true,
    striped = false,
    loading = false,
    onRowClick = undefined as ((row: Record<string, unknown>, index: number) => void) | undefined,
    emptyText = 'No results found.',
    selectedIndex = undefined as number | undefined,
    rowClass = undefined as ((row: Record<string, unknown>, index: number) => string) | undefined,
    t = (key: string, params?: Record<string, string | number>): string => {
      const fallbacks: Record<string, string> = {
        'table.page': `Página ${params?.current ?? '?'} de ${params?.total ?? '?'}`,
      };
      return fallbacks[key] ?? key;
    },
  }: {
    columns?: Column[];
    rows?: ReadonlyArray<Record<string, unknown>>;
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
    sort?: SortState | null;
    onSort?: (sort: SortState | null) => void;
    hoverable?: boolean;
    striped?: boolean;
    loading?: boolean;
    onRowClick?: (row: Record<string, unknown>, index: number) => void;
    emptyText?: string;
    selectedIndex?: number;
    rowClass?: (row: Record<string, unknown>, index: number) => string;
    t?: (key: string, params?: Record<string, string | number>) => string;
  } = $props();

  function toggleSort(key: string) {
    if (!sort || sort.key !== key) { onSort?.({ key, direction: 'asc' }); }
    else if (sort.direction === 'asc') { onSort?.({ key, direction: 'desc' }); }
    else { onSort?.(null); }
  }

  function getSkeletonWidth(i: number): string {
    const widths = ['65%', '85%', '50%', '75%', '60%', '90%', '55%', '70%'];
    return widths[i % widths.length];
  }
</script>

<div class="w-full overflow-x-auto rounded-[--radius] border border-border">
  <table class="w-full text-body-md">
    <caption class="sr-only">Data table</caption>
    <thead>
      <tr class="border-b border-border bg-muted">
        {#each columns as col}
          <th class="px-4 py-3 text-xs font-bold uppercase tracking-[0.05em] select-none text-muted-foreground"
            class:text-right={col.align === 'right'}
            class:text-center={col.align === 'center'}
            class:text-left={col.align !== 'right' && col.align !== 'center'}
            style={col.width ? `width: ${col.width};` : undefined}
            role="columnheader"
            aria-sort={col.sortable ? (sort?.key === col.key ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none') : undefined}>
            {#if col.sortable}
              <button
                type="button"
                class="inline-flex items-center cursor-pointer bg-transparent border-none p-0 text-inherit font-inherit uppercase tracking-wider text-muted-foreground"
                class:ml-auto={col.align === 'right'}
                class:mx-auto={col.align === 'center'}
                onclick={() => toggleSort(col.key)}
              >
                {col.label}
                {#if sort?.key === col.key}
                  <span class="ml-1" aria-hidden="true">{sort.direction === 'asc' ? '↑' : '↓'}</span>
                {/if}
              </button>
            {:else}
              {col.label}
            {/if}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#if loading}
        {#each { length: 5 } as _, i}
          <tr class="border-b border-border">
            {#each columns as col, j}
              <td class="px-4 py-3">
                <div class="animate-thoth-shimmer rounded-[--radius] bg-muted h-4" style="width: {getSkeletonWidth(j)};"></div>
              </td>
            {/each}
          </tr>
        {/each}
      {:else if rows.length === 0}
        <tr>
          <td colspan={columns.length} class="px-4 py-12 text-center text-sm text-muted-foreground">{emptyText}</td>
        </tr>
      {:else}
        {#each rows as row, i}
          <tr class="transition-colors border-b border-border {hoverable ? 'hover:bg-muted/50' : ''} {striped && i % 2 === 1 ? 'bg-muted/30' : ''} {rowClass ? rowClass(row, i) : ''} {selectedIndex === i ? 'bg-muted/60 ring-1 ring-inset ring-border translate-x-0.5 shadow-sm' : ''}"
            class:cursor-pointer={!!onRowClick}
            onclick={() => onRowClick?.(row, i)}
            onkeydown={onRowClick ? (e: KeyboardEvent) => { if (e.key === 'Enter') onRowClick?.(row, i); } : undefined}
            tabindex={onRowClick ? 0 : -1}
            aria-selected={selectedIndex === i || undefined}>
            {#each columns as col}
              <td class="px-4 py-3 text-foreground"
                class:text-right={col.align === 'right'}
                class:text-center={col.align === 'center'}
                class:text-left={col.align !== 'right' && col.align !== 'center'}>
                {#if col.cell}
                  {@render col.cell(row, i)}
                {:else}
                  {row[col.key] ?? ''}
                {/if}
              </td>
            {/each}
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>

  {#if totalPages > 1}
    <div class="px-4 py-3 flex items-center justify-between border-t border-border">
      <span class="text-xs text-muted-foreground">{t('table.page', { current: currentPage, total: totalPages })}</span>
      <Pagination {currentPage} {totalPages} {onPageChange} siblingCount={1} />
    </div>
  {/if}
</div>

<style>
  :global(.animate-thoth-shimmer) {
    background: linear-gradient(
      90deg,
      var(--muted, oklch(1 0 0 / 0.04)) 25%,
      var(--muted-foreground, oklch(0.55 0.03 280)) 50%,
      var(--muted, oklch(1 0 0 / 0.04)) 75%
    );
    background-size: 200% 100%;
    animation: thoth-shimmer 1.5s ease-in-out infinite;
  }

</style>
