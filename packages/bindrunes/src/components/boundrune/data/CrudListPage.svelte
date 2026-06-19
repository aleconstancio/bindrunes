<script lang="ts">
import type { Snippet } from "svelte";
import type { Column, SortState } from "../../../shared-types";
import Button from "../../Button.svelte";
import EmptyState from "../../EmptyState.svelte";
import PageHeader from "../../PageHeader.svelte";
import Block from "../Block.svelte";
import AdvancedTable from "./AdvancedTable.svelte";
import { useCrudProvider } from "./crud-context.svelte";
import FacetedSearch from "./FacetedSearch.svelte";

let {
	title = "",
	description = "",
	columns = [] as Column[],
	rows = [] as ReadonlyArray<Record<string, unknown>>,
	searchPlaceholder = "Search...",
	createLabel = "Create",
	onCreate = undefined as (() => void) | undefined,
	onRowClick = undefined as ((row: Record<string, unknown>) => void) | undefined,
	currentPage = 1,
	totalPages = 1,
	onPageChange = undefined as ((page: number) => void) | undefined,
	sort = $bindable(null as SortState | null),
	onSort = undefined as ((sort: SortState | null) => void) | undefined,
	loading = false,
	searchValue = $bindable(""),
	filters = [] as { key: string; label: string; options: { label: string; value: string }[] }[],
	activeFilters = $bindable({} as Record<string, string>),
	onFilterChange = undefined as ((key: string, value: string) => void) | undefined,
	emptyText = "No results found.",
	class: className = "",
	headerActions = undefined as Snippet | undefined,
	bulkActions = undefined as Snippet | undefined,
	selectedRows = $bindable(new Set<string | number>()),
}: {
	title?: string;
	description?: string;
	columns?: Column[];
	rows?: ReadonlyArray<Record<string, unknown>>;
	searchPlaceholder?: string;
	createLabel?: string;
	onCreate?: () => void;
	onRowClick?: (row: Record<string, unknown>) => void;
	currentPage?: number;
	totalPages?: number;
	onPageChange?: (page: number) => void;
	sort?: SortState | null;
	onSort?: (sort: SortState | null) => void;
	loading?: boolean;
	searchValue?: string;
	filters?: { key: string; label: string; options: { label: string; value: string }[] }[];
	activeFilters?: Record<string, string>;
	onFilterChange?: (key: string, value: string) => void;
	emptyText?: string;
	class?: string;
	headerActions?: Snippet;
	bulkActions?: Snippet;
	selectedRows?: Set<string | number>;
} = $props();

// Try to use CrudProvider context, fall back to props
let crud = $state<ReturnType<typeof useCrudProvider> | null>(null);
try {
	crud = useCrudProvider();
} catch {
	// No context — use props
}

// When context exists, sync state bidirectionally
let effectiveSort = $derived(
	crud?.sort ? ({ key: crud.sort.key, direction: crud.sort.direction } as SortState) : sort,
);
let effectiveSearch = $derived(crud?.search ?? searchValue);
let effectiveLoading = $derived(crud?.loading ?? loading);
let effectiveRows = $derived(
	crud?.items.length ? (crud.items as ReadonlyArray<Record<string, unknown>>) : rows,
);
let effectiveSelectedRows = $derived(crud?.selectedIds ?? selectedRows);

function handleSort(s: SortState | null) {
	crud?.setSort(s ? { key: s.key, direction: s.direction } : null);
	onSort?.(s);
}

function handleSearch(value: string) {
	crud?.setSearch(value);
	searchValue = value;
}

function handleFilterChange(key: string, value: string) {
	crud?.setFilter(key, value);
	onFilterChange?.(key, value);
}

function handlePageChange(page: number) {
	crud?.setPage(page);
	onPageChange?.(page);
}
</script>

<Block size="full" spacing="compact" class={className}>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-title-1 text-foreground">{title}</h1>
        {#if description}
          <p class="text-body-md text-muted-foreground mt-1">{description}</p>
        {/if}
      </div>
      <div class="flex items-center gap-3">
        {#if headerActions}
          {@render headerActions()}
        {/if}
        {#if createLabel && onCreate}
          <Button onclick={onCreate}>{createLabel}</Button>
        {/if}
      </div>
    </div>

    {#if filters.length > 0}
      <FacetedSearch
        bind:searchValue={effectiveSearch}
        {searchPlaceholder}
        {filters}
        bind:activeFilters
        onFilterChange={handleFilterChange}
      />
    {/if}

    {#if effectiveSelectedRows.size > 0 && bulkActions}
      <div class="flex items-center gap-3 p-3 rounded-[--radius] bg-primary/5 border border-primary/20">
        <span class="text-label-sm text-primary">{effectiveSelectedRows.size} selected</span>
        {@render bulkActions()}
        <Button variant="ghost" size="sm" onclick={() => crud?.clearSelection() ?? (selectedRows = new Set())}>Clear</Button>
      </div>
    {/if}

    <AdvancedTable
      {columns}
      rows={effectiveRows}
      {searchPlaceholder}
      bind:sort={effectiveSort}
      onSort={handleSort}
      loading={effectiveLoading}
      searchValue={effectiveSearch}
      bind:selectedRows={effectiveSelectedRows}
      {emptyText}
      {onRowClick}
      {currentPage}
      {totalPages}
      onPageChange={handlePageChange}
    />
  </div>
</Block>
