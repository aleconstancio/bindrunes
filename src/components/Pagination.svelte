<script lang="ts">
let {
	currentPage = 1,
	totalPages = 1,
	siblingCount = 2,
	showTotal = false,
	pageSize = 20,
	pageSizeOptions = [10, 20, 50, 100],
	onPageChange = undefined as ((page: number) => void) | undefined,
	onPageSizeChange = undefined as ((size: number) => void) | undefined,
	t = (key: string, params?: Record<string, string | number>): string => {
		const fallbacks: Record<string, string> = {
			"table.page": `Page ${params?.current ?? "?"} of ${params?.total ?? "?"}`,
			"pagination.perPage": `${params?.count ?? "?"} per page`,
		};
		return fallbacks[key] ?? key;
	},
}: {
	currentPage?: number;
	totalPages?: number;
	siblingCount?: number;
	showTotal?: boolean;
	pageSize?: number;
	pageSizeOptions?: number[];
	onPageChange?: (page: number) => void;
	onPageSizeChange?: (size: number) => void;
	t?: (key: string, params?: Record<string, string | number>) => string;
} = $props();

let _pages = $derived.by(() => {
	const range: (number | string)[] = [];
	const start = Math.max(1, currentPage - siblingCount);
	const end = Math.min(totalPages, currentPage + siblingCount);
	if (start > 1) {
		range.push(1);
		if (start > 2) range.push("...");
	}
	for (let i = start; i <= end; i++) range.push(i);
	if (end < totalPages) {
		if (end < totalPages - 1) range.push("...");
		range.push(totalPages);
	}
	return range;
});
</script>

<BitsPagination.Root count={totalPages} perPage={1} page={currentPage} onPageChange={onPageChange}>
	<nav class="flex items-center gap-1" aria-label="Pagination">
		{#if showTotal}
			<span class="text-body-sm text-muted-foreground">{t('table.page', { current: currentPage, total: totalPages })}</span>
		{/if}

		{#if onPageSizeChange}
			<select
				value={pageSize}
				onchange={(e) => onPageSizeChange(Number((e.target as HTMLSelectElement).value))}
				class="h-8 rounded-[--radius] border border-border bg-transparent px-2 text-body-sm text-muted-foreground cursor-pointer"
				aria-label="Page size"
			>
				{#each pageSizeOptions as opt}
					<option value={opt}>{t('pagination.perPage', { count: opt })}</option>
				{/each}
			</select>
		{/if}

		<div class="flex items-center gap-1">
			<BitsPagination.PrevButton
				disabled={currentPage <= 1}
				class="inline-flex items-center justify-center h-8 w-8 rounded-[--radius] text-label-sm font-medium transition-colors cursor-pointer text-muted-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted"
				aria-label="Previous page"
			>
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
			</BitsPagination.PrevButton>

			{#each pages as p}
				{#if p === '...'}
					<span class="inline-flex items-center justify-center h-8 w-8 text-body-sm text-muted-foreground">...</span>
				{:else}
					<button
						onclick={() => onPageChange?.(p as number)}
						class="inline-flex items-center justify-center h-8 w-8 rounded-[--radius] text-label-sm font-medium transition-colors cursor-pointer"
						class:bg-primary={currentPage === p}
						class:text-primary-foreground={currentPage === p}
						class:text-muted-foreground={currentPage !== p}
						aria-current={currentPage === p ? 'page' : undefined}
					>
						{p}
					</button>
				{/if}
			{/each}

			<BitsPagination.NextButton
				disabled={currentPage >= totalPages}
				class="inline-flex items-center justify-center h-8 w-8 rounded-[--radius] text-label-sm font-medium transition-colors cursor-pointer text-muted-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted"
				aria-label="Next page"
			>
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
			</BitsPagination.NextButton>
		</div>
	</nav>
</BitsPagination.Root>
