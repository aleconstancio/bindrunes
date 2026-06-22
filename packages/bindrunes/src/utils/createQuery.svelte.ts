import { invalidateQuery as _invalidateQuery } from "./queryCache";
import { useQuery } from "./useQuery.svelte";

export type { CreateQueryOptions, QueryResult } from "./useQuery.svelte";

/** @deprecated Use `useQuery` instead. `createQuery` will be removed in v2.0. */
export const createQuery = useQuery;
export const invalidateQuery = _invalidateQuery;
