import { useMutation } from "./useMutation.svelte";

export type { CreateMutationOptions, MutationResult } from "./useMutation.svelte";

/** @deprecated Use `useMutation` instead. `createMutation` will be removed in v2.0. */
export const createMutation = useMutation;
