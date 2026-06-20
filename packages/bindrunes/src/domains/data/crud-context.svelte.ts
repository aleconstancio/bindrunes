import { createMetaContext, useMetaContext } from "../../../utils/createMetaContext.svelte";

const CRUD_KEY = Symbol("crud");

export interface CrudItem {
	id: string | number;
	[key: string]: unknown;
}

export interface CrudProviderState<T extends CrudItem = CrudItem> {
	items: T[];
	loading: boolean;
	error: string | null;
	selectedIds: Set<string | number>;
	totalCount: number;
	page: number;
	pageSize: number;
	sort: { key: string; direction: "asc" | "desc" } | null;
	search: string;
	filters: Record<string, string>;

	setItems: (items: T[]) => void;
	setLoading: (loading: boolean) => void;
	setError: (error: string | null) => void;
	toggleSelect: (id: string | number) => void;
	selectAll: (ids: (string | number)[]) => void;
	clearSelection: () => void;
	setPage: (page: number) => void;
	setPageSize: (size: number) => void;
	setSort: (sort: { key: string; direction: "asc" | "desc" } | null) => void;
	setSearch: (search: string) => void;
	setFilter: (key: string, value: string) => void;
	clearFilters: () => void;
	refresh: () => void;
}

export function createCrudProvider<T extends CrudItem = CrudItem>(
	onRefresh?: () => void,
): CrudProviderState<T> {
	let items = $state<T[]>([]);
	let loading = $state(false);
	let error = $state<string | null>(null);
	let selectedIds = $state(new Set<string | number>());
	let totalCount = $state(0);
	let page = $state(1);
	let pageSize = $state(20);
	let sort = $state<{ key: string; direction: "asc" | "desc" } | null>(null);
	let search = $state("");
	let filters = $state<Record<string, string>>({});

	const state: CrudProviderState<T> = {
		get items() {
			return items;
		},
		get loading() {
			return loading;
		},
		get error() {
			return error;
		},
		get selectedIds() {
			return selectedIds;
		},
		get totalCount() {
			return totalCount;
		},
		get page() {
			return page;
		},
		get pageSize() {
			return pageSize;
		},
		get sort() {
			return sort;
		},
		get search() {
			return search;
		},
		get filters() {
			return filters;
		},

		setItems(newItems: T[]) {
			items = newItems;
			totalCount = newItems.length;
		},
		setLoading(v: boolean) {
			loading = v;
		},
		setError(v: string | null) {
			error = v;
		},
		toggleSelect(id: string | number) {
			const next = new Set(selectedIds);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			selectedIds = next;
		},
		selectAll(ids: (string | number)[]) {
			selectedIds = new Set(ids);
		},
		clearSelection() {
			selectedIds = new Set();
		},
		setPage(p: number) {
			page = p;
		},
		setPageSize(s: number) {
			pageSize = s;
			page = 1;
		},
		setSort(s) {
			sort = s;
		},
		setSearch(s: string) {
			search = s;
			page = 1;
		},
		setFilter(key: string, value: string) {
			filters = { ...filters, [key]: value };
		},
		clearFilters() {
			filters = {};
		},
		refresh() {
			onRefresh?.();
		},
	};

	return createMetaContext(CRUD_KEY, () => state);
}

export function useCrud<T extends CrudItem = CrudItem>(): CrudProviderState<T> {
	return useMetaContext<CrudProviderState<T>>(CRUD_KEY);
}
