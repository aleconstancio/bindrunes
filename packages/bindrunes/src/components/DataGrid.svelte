<script lang="ts">
interface Column {
	key: string;
	label: string;
	sortable?: boolean;
	width?: string;
	render?: (value: unknown, row: Record<string, unknown>) => string;
}

interface Props {
	columns?: Column[];
	rows?: ReadonlyArray<Record<string, unknown>>;
	selectable?: boolean;
	selectedIds?: string[];
	onSelectionChange?: (ids: string[]) => void;
	sort?: { key: string; direction: "asc" | "desc" } | null;
	onSort?: (sort: { key: string; direction: "asc" | "desc" } | null) => void;
	onRowClick?: (row: Record<string, unknown>) => void;
	class?: string;
}

let {
	columns = [],
	rows = [],
	selectable = false,
	selectedIds = [],
	onSelectionChange,
	sort = null,
	onSort,
	onRowClick,
	class: className = "",
}: Props = $props();

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
	const allSelected = rows.length > 0 && rows.every((r) => selectedIds.includes(r.id as string));
	onSelectionChange?.(allSelected ? [] : rows.map((r) => r.id as string));
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
							checked={rows.length > 0 && rows.every((r) => selectedIds.includes(r.id as string))}
							onchange={toggleAllSelection}
							class="rounded border-border"
						/>
					</th>
				{/if}
				{#each columns as column}
					<th
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
			{#each rows as row}
				<tr
					class="border-b border-border hover:bg-muted/50 {onRowClick ? 'cursor-pointer' : ''}"
					onclick={() => onRowClick?.(row)}
				>
					{#if selectable}
						<td class="px-3 py-2">
							<input
								type="checkbox"
								checked={selectedIds.includes(row.id as string)}
								onchange={() => toggleRowSelection(row.id as string)}
								class="rounded border-border"
							/>
						</td>
					{/if}
					{#each columns as column}
						<td class="px-3 py-2 text-body-md">
							{column.render ? column.render(row[column.key], row) : row[column.key]}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
