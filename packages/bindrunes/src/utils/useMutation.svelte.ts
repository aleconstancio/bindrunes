import { invalidateQuery } from "./queryCache";
import { toError } from "./toError";

export interface CreateMutationOptions<TData, TVariables = void> {
	mutator: (variables: TVariables) => Promise<TData>;
	onSuccess?: (data: TData, variables: TVariables) => void;
	onError?: (error: Error, variables: TVariables) => void;
	onSettled?: (data: TData | undefined, error: Error | null, variables: TVariables) => void;
	onMutate?: (variables: TVariables) => Promise<void> | void;
	invalidateKeys?: string[];
}

export interface MutationResult<TData, TVariables> {
	readonly data: TData | undefined;
	readonly error: Error | null;
	readonly status: "idle" | "loading" | "success" | "error";
	readonly isLoading: boolean;
	readonly isSuccess: boolean;
	readonly isError: boolean;
	mutate(variables: TVariables): Promise<TData>;
	reset(): void;
}

export function useMutation<TData, TVariables = void>(
	options: CreateMutationOptions<TData, TVariables>,
): MutationResult<TData, TVariables> {
	let data = $state<TData | undefined>();
	let error = $state<Error | null>(null);
	let status = $state<"idle" | "loading" | "success" | "error">("idle");

	const isLoading = $derived(status === "loading");
	const isSuccess = $derived(status === "success");
	const isError = $derived(status === "error");

	async function mutate(vars: TVariables): Promise<TData> {
		status = "loading";
		error = null;

		try {
			await options.onMutate?.(vars);
			const result = await options.mutator(vars);
			data = result;
			status = "success";
			options.onSuccess?.(result, vars);
			if (options.invalidateKeys) {
				for (const key of options.invalidateKeys) {
					invalidateQuery(key);
				}
			}
			options.onSettled?.(result, null, vars);
			return result;
		} catch (err) {
			const e = toError(err);
			error = e;
			status = "error";
			options.onError?.(e, vars);
			options.onSettled?.(undefined, e, vars);
			throw e;
		}
	}

	function reset() {
		data = undefined;
		error = null;
		status = "idle";
	}

	return {
		get data() {
			return data;
		},
		get error() {
			return error;
		},
		get status() {
			return status;
		},
		get isLoading() {
			return isLoading;
		},
		get isSuccess() {
			return isSuccess;
		},
		get isError() {
			return isError;
		},
		mutate,
		reset,
	};
}
