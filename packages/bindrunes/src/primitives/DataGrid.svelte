<script lang="ts">
import type { Column, SortState } from "../shared-types";

interface Props {
	columns?: Column[];
	rows?: ReadonlyArray<Record<string, unknown>>;
	rowKey?: string;
	selectable?: boolean;
	selectedIds?: string[];
	onSelectionChange?: (ids: string[]) => void;
	sort?: SortState | null;
	onSort?: (sort: SortState | null) => void;
	onRowClick?: (row: Record<string, unknown>) => void;
	emptyText?: string;
	class?: string;
}

let {
	columns = [],
	rows = [],
	rowKey = "id",
	selectable = false,
	selectedIds = [],
	onSelectionChange,
	sort = null,
	onSort,
	onRowClick,
	emptyText = "No data available",
	class: className = "",
}: Props = $props();

function getRowId(row: Record<string, unknown>): string {
	return String(row[rowKey]);
}

function toggleSort(key: string) {
	if (!sort || sort.key !== key) {
		onSort?.({ key, direction: "asc" });
	} else if (sort.direction === "asc") {
		onSort?.({ key, direction: "desc" });
	} else {
		onSort?.(null);
	}
}

function toggleRowSelection(id: string) {
	if (!selectable) return;
	const newSelection = selectedIds.includes(id)
		? selectedIds.filter((i) => i !== id)
		: [...selectedIds, id];
	onSelectionChange?.(newSelection);
}

function toggleAllSelection() {
	if (!selectable) return;
	const allSelected = rows.length > 0 && rows.every((r) => selectedIds.includes(getRowId(r)));
	onSelectionChange?.(allSelected ? [] : rows.map((r) => getRowId(r)));
}
</script>

<div class="overflow-x-auto {className}">
	<table class="w-full border-collapse">
		<thead>
			<tr class="border-b border-border">
				{#if selectable}
					<th class="w-10 px-3 py-2">
						<input
							type="checkbox"
							checked={rows.length > 0 && rows.every((r) => selectedIds.includes(getRowId(r)))}
							onchange={toggleAllSelection}
							class="rounded border-border"
						/>
					</th>
				{/if}
				{#each columns as column}
					<th
						role="columnheader"
						aria-sort={column.sortable && sort?.key === column.key
							? sort.direction === "asc"
								? "ascending"
								: "descending"
							: column.sortable
								? "none"
								: undefined}
						class="px-3 py-2 text-left text-label-sm text-muted-foreground font-medium {column.sortable
							? 'cursor-pointer hover:text-foreground'
							: ''}"
						style:width={column.width}
						onclick={() => column.sortable && toggleSort(column.key)}
					>
						<div class="flex items-center gap-1">
							{column.label}
							{#if column.sortable && sort?.key === column.key}
								<span class="text-xs">{sort.direction === "asc" ? "↑" : "↓"}</span>
							{/if}
						</div>
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#if rows.length === 0}
				<tr>
					<td
						colspan={columns.length + (selectable ? 1 : 0)}
						class="px-3 py-12 text-center text-body-sm text-muted-foreground"
					>
						{emptyText}
					</td>
				</tr>
			{:else}
				{#each rows as row}
					<tr
						class="border-b border-border hover:bg-muted/50 {onRowClick ? 'cursor-pointer' : ''}"
						tabindex={onRowClick ? 0 : undefined}
						onkeydown={(e) => {
							if (onRowClick && (e.key === "Enter" || e.key === " ")) {
								e.preventDefault();
								onRowClick(row);
							}
						}}
						onclick={() => onRowClick?.(row)}
					>
						{#if selectable}
							<td class="px-3 py-2">
								<input
									type="checkbox"
									checked={selectedIds.includes(getRowId(row))}
									onchange={() => toggleRowSelection(getRowId(row))}
									class="rounded border-border"
								/>
							</td>
						{/if}
						{#each columns as column, columnIndex}
							<td class="px-3 py-2 text-body-md">
								{#if column.cell}
									{@render column.cell(row, columnIndex)}
								{:else}
									{row[column.key] ?? ""}
								{/if}
							</td>
						{/each}
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>
