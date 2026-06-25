// ── Data Layer ──
/** Cached server query with stale-time, refetch, and invalidation support. */

export { invalidateQuery, setQueryData } from "../utils/queryCache.ts";
export { defaultTableFallbacks } from "../utils/tableFallbacks.ts";
/** Server state mutation with optimistic updates and invalidation. */
export type { CreateMutationOptions, MutationResult } from "../utils/useMutation.svelte.ts";
export { useMutation } from "../utils/useMutation.svelte.ts";
// ── Omnibar ──
export type {
	CreateOmnibarOptions,
	OmnibarOption,
	OmnibarState,
} from "../utils/useOmnibar.svelte.ts";
export { useOmnibar } from "../utils/useOmnibar.svelte.ts";
export type { CreateQueryOptions, QueryResult } from "../utils/useQuery.svelte.ts";
export { useQuery } from "../utils/useQuery.svelte.ts";
export type { CreateTableOptions } from "../utils/useTable.svelte.ts";
export { useTable } from "../utils/useTable.svelte.ts";
