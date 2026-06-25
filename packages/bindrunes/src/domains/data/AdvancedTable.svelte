<script lang="ts">
import { Search } from "lucide-svelte";
import type { Snippet } from "svelte";
import PageSection from "../../layouts/PageSection.svelte";
import Button from "../../primitives/Button.svelte";
import Input from "../../primitives/Input.svelte";
import Pagination from "../../primitives/Pagination.svelte";
import type { Column, SortState } from "../../shared-types";
import DataTable from "./DataTable.svelte";

let {
	columns = [] as Column[],
	rows = [] as ReadonlyArray<Record<string, unknown>>,
	searchPlaceholder = "Search...",
	createLabel = "",
	onCreate = undefined as (() => void) | undefined,
	onRowClick = undefined as ((row: Record<string, unknown>) => void) | undefined,
	currentPage = 1,
	totalPages = 1,
	onPageChange = undefined as ((page: number) => void) | undefined,
	sort = $bindable(null as SortState | null),
	onSort = undefined as ((sort: SortState | null) => void) | undefined,
	loading = false,
	searchValue = $bindable(""),
	emptyText = "No results found.",
	class: className = "",
	toolbar = undefined as Snippet | undefined,
	emptyState = undefined as Snippet | undefined,
	actions = undefined as Snippet | undefined,
	selectable = false,
	selectedRows = $bindable(new Set<string | number>()),
	onSelectAll = undefined as ((ids: (string | number)[]) => void) | undefined,
	onSelectRow = undefined as ((id: string | number, selected: boolean) => void) | undefined,
	rowIdKey = "id" as string,
}: {
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
	emptyText?: string;
	class?: string;
	toolbar?: Snippet;
	emptyState?: Snippet;
	actions?: Snippet;
	selectable?: boolean;
	selectedRows?: Set<string | number>;
	onSelectAll?: (ids: (string | number)[]) => void;
	onSelectRow?: (id: string | number, selected: boolean) => void;
	rowIdKey?: string;
} = $props();

function handleSelectAll() {
	const ids = rows.map((r) => r[rowIdKey] as string | number);
	if (selectedRows.size === rows.length) {
		selectedRows = new Set();
		onSelectAll?.([]);
	} else {
		selectedRows = new Set(ids);
		onSelectAll?.(ids);
	}
}

function handleSelectRow(row: Record<string, unknown>) {
	const id = row[rowIdKey] as string | number;
	const next = new Set(selectedRows);
	if (next.has(id)) next.delete(id);
	else next.add(id);
	selectedRows = next;
	onSelectRow?.(id, next.has(id));
}
</script>

<PageSection reveal={false} size="full" spacing="compact" class={className}>
  <div class="flex flex-col gap-4">
    {#if toolbar}
      {@render toolbar()}
    {:else}
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div class="relative w-full sm:w-72">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            bind:value={searchValue}
            placeholder={searchPlaceholder}
            class="pl-9"
          />
        </div>
        <div class="flex items-center gap-2">
          {@render actions?.()}
          {#if createLabel && onCreate}
            <Button onclick={onCreate}>{createLabel}</Button>
          {/if}
        </div>
      </div>
    {/if}

    <div class="rounded-[--radius] border border-border overflow-hidden">
      {#if selectable}
        <div class="flex items-center gap-3 px-4 py-2 bg-muted border-b border-border">
          <button
            type="button"
            class="h-4 w-4 rounded border border-border bg-background cursor-pointer
                   {selectedRows.size === rows.length && rows.length > 0 ? 'bg-primary border-primary' : ''}
                   {selectedRows.size > 0 && selectedRows.size < rows.length ? 'bg-primary/50 border-primary' : ''}"
            onclick={handleSelectAll}
            aria-label="Select all"
          ></button>
          <span class="text-label-sm text-muted-foreground">
            {selectedRows.size > 0 ? `${selectedRows.size} of ${rows.length} selected` : `${rows.length} rows`}
          </span>
        </div>
      {/if}
      <DataTable
        {columns}
        {rows}
        bind:sort
        {onSort}
        {loading}
        {emptyText}
        hoverable
        onRowClick={onRowClick ? (row, _i) => onRowClick(row) : undefined}
      />
    </div>

    {#if emptyState && rows.length === 0 && !loading}
      <div class="py-8">
        {@render emptyState()}
      </div>
    {/if}

    {#if totalPages > 1}
      <Pagination
        {currentPage}
        {totalPages}
        {onPageChange}
      />
    {/if}
  </div>
</PageSection>
