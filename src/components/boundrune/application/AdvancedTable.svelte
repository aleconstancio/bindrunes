<script lang="ts">
import type { Column, SortState } from "../../../shared-types";

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
} = $props();
</script>

<Block size="full" spacing="compact" class={className}>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div class="relative w-full sm:w-72">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          bind:value={searchValue}
          placeholder={searchPlaceholder}
          class="pl-9"
        />
      </div>
      {#if createLabel && onCreate}
        <Button onclick={onCreate}>{createLabel}</Button>
      {/if}
    </div>

    <div class="rounded-[--radius] border border-border overflow-hidden">
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

    {#if totalPages > 1}
      <Pagination
        {currentPage}
        {totalPages}
        {onPageChange}
      />
    {/if}
  </div>
</Block>
