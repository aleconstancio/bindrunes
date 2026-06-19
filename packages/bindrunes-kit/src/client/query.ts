const cache = new Map<
	string,
	{ data: unknown; timestamp: number; subscribers: Set<(data: unknown) => void> }
>();

interface CreateQueryOptions<T> {
	key: string;
	fetcher: () => Promise<T>;
	staleTime?: number;
	enabled?: boolean;
	refetchOnWindowFocus?: boolean;
	refetchInterval?: number;
	onSuccess?: (data: T) => void;
	onError?: (error: Error) => void;
}

export function createQuery<T>(options: CreateQueryOptions<T>) {
	const {
		key,
		fetcher,
		staleTime = 30_000,
		enabled = true,
		refetchOnWindowFocus = false,
		refetchInterval,
		onSuccess,
		onError,
	} = options;

	let data = $state<T | undefined>(undefined);
	let error = $state<Error | null>(null);
	let status = $state<"idle" | "loading" | "success" | "error">("idle");

	const isLoading = $derived(status === "loading");
	const isSuccess = $derived(status === "success");
	const isError = $derived(status === "error");
	const isFetching = $derived(isLoading);

	let fetchCount = 0;

	async function execute() {
		if (!enabled) return;

		fetchCount++;
		const currentFetch = fetchCount;
		status = "loading";

		try {
			const result = await fetcher();
			if (currentFetch !== fetchCount) return;

			data = result;
			status = "success";
			error = null;
			onSuccess?.(result);

			cache.set(key, {
				data: result,
				timestamp: Date.now(),
				subscribers: cache.get(key)?.subscribers ?? new Set(),
			});
		} catch (err) {
			if (currentFetch !== fetchCount) return;

			error = err instanceof Error ? err : new Error(String(err));
			status = "error";
			onError?.(error);
		}
	}

	function refetch() {
		execute();
	}

	if (enabled) {
		execute();
	}

	if (refetchOnWindowFocus && typeof window !== "undefined") {
		const handler = () => {
			if (status === "success") {
				const cached = cache.get(key);
				if (cached && Date.now() - cached.timestamp > staleTime) {
					execute();
				}
			}
		};
		window.addEventListener("focus", handler);
	}

	if (refetchInterval && refetchInterval > 0) {
		const interval = setInterval(() => {
			if (status === "success" || status === "idle") {
				execute();
			}
		}, refetchInterval);
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
		get isFetching() {
			return isFetching;
		},
		refetch,
	};
}

export function invalidateQuery(key: string) {
	const entry = cache.get(key);
	if (entry) {
		entry.subscribers.forEach((cb) => cb(entry.data));
	}
}

interface CreateMutationOptions<TData, TVariables> {
	mutator: (variables: TVariables) => Promise<TData>;
	onSuccess?: (data: TData, variables: TVariables) => void;
	onError?: (error: Error, variables: TVariables) => void;
	onSettled?: (data: TData | undefined, error: Error | undefined, variables: TVariables) => void;
	invalidateKeys?: string[];
}

export function createMutation<TData, TVariables = void>(
	options: CreateMutationOptions<TData, TVariables>,
) {
	const { mutator, onSuccess, onError, onSettled, invalidateKeys = [] } = options;

	let data = $state<TData | undefined>(undefined);
	let error = $state<Error | null>(null);
	let status = $state<"idle" | "loading" | "success" | "error">("idle");
	let variables = $state<TVariables | undefined>(undefined);

	const isLoading = $derived(status === "loading");
	const isSuccess = $derived(status === "success");
	const isError = $derived(status === "error");

	async function mutate(vars: TVariables) {
		variables = vars;
		status = "loading";
		error = null;

		try {
			const result = await mutator(vars);
			data = result;
			status = "success";
			onSuccess?.(result, vars);
			onSettled?.(result, undefined, vars);

			for (const key of invalidateKeys) {
				invalidateQuery(key);
			}

			return result;
		} catch (err) {
			const normalizedError = err instanceof Error ? err : new Error(String(err));
			error = normalizedError;
			status = "error";
			onError?.(normalizedError, vars);
			onSettled?.(undefined, normalizedError, vars);
			throw normalizedError;
		}
	}

	function reset() {
		data = undefined;
		error = null;
		status = "idle";
		variables = undefined;
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
		get variables() {
			return variables;
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
