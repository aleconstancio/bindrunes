import { invalidateQuery as _invalidateQuery } from "./queryCache";
import { useQuery } from "./useQuery.svelte";

export type { CreateQueryOptions, QueryResult } from "./useQuery.svelte";

export const createQuery = useQuery;
export const invalidateQuery = _invalidateQuery;
