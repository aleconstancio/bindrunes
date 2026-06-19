import type { Column, PaginationState, SortState } from "../shared-types";

export type { Column, PaginationState, SortState };

type CreateTableOptions<T> = {
	data: T[] | (() => T[]);
	columns: Column<T>[];
	initialState?: {
		sort?: SortState;
		filters?: Record<string, string>;
		pagination?: Partial<PaginationState>;
		selected?: Set<string>;
	};
	getRowId?: (row: T) => string;
	onSortChange?: (sort: SortState | null) => void;
	onFilterChange?: (filters: Record<string, string>) => void;
	onPageChange?: (page: number) => void;
};

export function createTable<T extends Record<string, unknown>>(options: CreateTableOptions<T>) {
	const {
		columns,
		initialState,
		getRowId = (row: T) => row.id as string,
		onSortChange,
		onFilterChange,
		onPageChange,
	} = options;

	let rawData = $state(typeof options.data === "function" ? options.data() : options.data);
	let sort = $state<SortState | null>(initialState?.sort ?? null);
	let filters = $state<Record<string, string>>(initialState?.filters ?? {});
	let pagination = $state<PaginationState>({
		page: initialState?.pagination?.page ?? 1,
		pageSize: initialState?.pagination?.pageSize ?? 20,
	});
	let selected = $state<Set<string>>(initialState?.selected ?? new Set());
	let columnWidths = $state<Record<string, number | string>>(
		Object.fromEntries(
			columns.filter((c) => c.width).map((c) => [c.key, c.width as number | string]),
		),
	);

	$effect(() => {
		rawData = typeof options.data === "function" ? options.data() : options.data;
	});

	const filteredData = $derived.by(() => {
		let result = rawData;
		for (const [key, value] of Object.entries(filters)) {
			if (!value) continue;
			result = result.filter((row) => {
				const cell = row[key];
				if (cell == null) return false;
				return String(cell).toLowerCase().includes(value.toLowerCase());
			});
		}
		return result;
	});

	const sortedData = $derived.by(() => {
		const currentSort = sort;
		if (!currentSort) return filteredData;
		return [...filteredData].sort((a, b) => {
			const aVal = a[currentSort.key];
			const bVal = b[currentSort.key];
			if (aVal == null) return 1;
			if (bVal == null) return -1;
			const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
			return currentSort.direction === "asc" ? cmp : -cmp;
		});
	});

	const totalRows = $derived(sortedData.length);
	const totalPages = $derived(Math.max(1, Math.ceil(totalRows / pagination.pageSize)));

	const paginatedData = $derived.by(() => {
		const start = (pagination.page - 1) * pagination.pageSize;
		return sortedData.slice(start, start + pagination.pageSize);
	});

	const selectedRows = $derived.by(() => {
		return paginatedData.filter((row) => selected.has(getRowId(row)));
	});

	const isAllSelected = $derived(
		paginatedData.length > 0 && paginatedData.every((row) => selected.has(getRowId(row))),
	);

	function sortColumn(key: string) {
		if (!sort || sort.key !== key) {
			sort = { key, direction: "asc" };
		} else if (sort.direction === "asc") {
			sort = { key, direction: "desc" };
		} else {
			sort = null;
		}
		onSortChange?.(sort);
	}

	function setFilter(key: string, value: string) {
		filters = { ...filters, [key]: value };
		pagination = { ...pagination, page: 1 };
		onFilterChange?.(filters);
	}

	function setPage(page: number) {
		pagination = { ...pagination, page: Math.max(1, Math.min(page, totalPages)) };
		onPageChange?.(pagination.page);
	}

	function setPageSize(pageSize: number) {
		pagination = { ...pagination, pageSize, page: 1 };
		onPageChange?.(1);
	}

	function toggleRow(id: string) {
		const next = new Set(selected);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		selected = next;
	}

	function toggleAll() {
		if (isAllSelected) {
			selected = new Set();
		} else {
			selected = new Set(paginatedData.map((row) => getRowId(row)));
		}
	}

	function setColumnWidth(key: string, width: number | string) {
		columnWidths = { ...columnWidths, [key]: width };
	}

	function reset() {
		sort = initialState?.sort ?? null;
		filters = initialState?.filters ?? {};
		pagination = {
			page: initialState?.pagination?.page ?? 1,
			pageSize: initialState?.pagination?.pageSize ?? 20,
		};
		selected = initialState?.selected ?? new Set();
	}

	return {
		get data() {
			return paginatedData;
		},
		get allData() {
			return sortedData;
		},
		get totalRows() {
			return totalRows;
		},
		get totalPages() {
			return totalPages;
		},
		get page() {
			return pagination.page;
		},
		get pageSize() {
			return pagination.pageSize;
		},
		get sort() {
			return sort;
		},
		get filters() {
			return filters;
		},
		get selected() {
			return selected;
		},
		get selectedRows() {
			return selectedRows;
		},
		get isAllSelected() {
			return isAllSelected;
		},
		get columnWidths() {
			return columnWidths;
		},
		columns,
		sortColumn,
		setFilter,
		setPage,
		setPageSize,
		toggleRow,
		toggleAll,
		setColumnWidth,
		reset,
	};
}

export type { CreateTableOptions };
