import { useForm } from "./useForm.svelte";

export type { CreateFormOptions, FormState, InferSchemaType } from "./useForm.svelte";

/** @deprecated Use `useForm` instead. `createForm` will be removed in v2.0. */
export const createForm = useForm;
