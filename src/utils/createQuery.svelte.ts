import { fetchQuery, getEntry, removeEntry, subscribe } from "./queryCache";

export interface CreateQueryOptions<TData> {
	key: string;
	fetcher: () => Promise<TData>;
	staleTime?: number;
	enabled?: boolean;
	refetchOnWindowFocus?: boolean;
	refetchInterval?: number;
	retry?: number;
	gcTime?: number;
	onSuccess?: (data: TData) => void;
	onError?: (error: Error) => void;
}

export interface QueryResult<TData> {
	readonly data: TData | undefined;
	readonly error: Error | null;
	readonly status: "loading" | "success" | "error";
	readonly isLoading: boolean;
	readonly isSuccess: boolean;
	readonly isError: boolean;
	readonly isFetching: boolean;
	readonly isStale: boolean;
	refetch(): Promise<void>;
}

export function createQuery<TData>(options: CreateQueryOptions<TData>): QueryResult<TData> {
	const initialEntry = getEntry<TData>(options.key);
	let _data = $state<TData | undefined>(initialEntry?.data as TData | undefined);
	let _error = $state<Error | null>(initialEntry?.error ?? null);
	let _status = $state<"loading" | "success" | "error">(initialEntry?.status ?? "loading");
	let _fetchStatus = $state<"idle" | "fetching">(initialEntry?.fetchStatus ?? "idle");
	let _lastUpdatedAt = $state<number>(initialEntry?.lastUpdatedAt ?? 0);

	const isLoading = $derived(_status === "loading");
	const isSuccess = $derived(_status === "success");
	const isError = $derived(_status === "error");
	const isFetching = $derived(_fetchStatus === "fetching");
	const isStale = $derived(
		_lastUpdatedAt === 0 || Date.now() - _lastUpdatedAt > (options.staleTime ?? 0),
	);

	function syncFromCache() {
		const entry = getEntry<TData>(options.key);
		if (!entry) return;
		_data = entry.data as TData | undefined;
		_error = entry.error;
		_status = entry.status;
		_fetchStatus = entry.fetchStatus;
		_lastUpdatedAt = entry.lastUpdatedAt;
	}

	$effect(() => {
		const entry = getEntry<TData>(options.key);

		const unsubscribe = subscribe(options.key, () => {
			const prevStatus = _status;
			syncFromCache();
			if (prevStatus !== _status) {
				if (_status === "success") {
					options.onSuccess?.(_data!);
				} else if (_status === "error" && _error) {
					options.onError?.(_error);
				}
			}
		});

		syncFromCache();

		const enabled = options.enabled ?? true;
		if (enabled) {
			const staleTime = options.staleTime ?? 0;
			if (!entry || entry.data === undefined) {
				fetchQuery<TData>(options.key, options.fetcher, { retry: options.retry });
			} else if (staleTime > 0 && Date.now() - entry.lastUpdatedAt > staleTime) {
				fetchQuery<TData>(options.key, options.fetcher, { retry: options.retry });
			}
		}

		return () => {
			unsubscribe();
			const e = getEntry(options.key);
			if (e && e.subscribers.size === 0) {
				if (e.gcTimeout) clearTimeout(e.gcTimeout);
				const gcTime = options.gcTime ?? 5 * 60 * 1000;
				e.gcTimeout = setTimeout(() => {
					removeEntry(options.key);
				}, gcTime);
			}
		};
	});

	$effect(() => {
		const enabled = options.enabled ?? true;
		const refetchOnFocus = options.refetchOnWindowFocus ?? true;
		if (!enabled || !refetchOnFocus) return;

		function onFocus() {
			const entry = getEntry<TData>(options.key);
			const staleTime = options.staleTime ?? 0;
			if (
				entry &&
				entry.data !== undefined &&
				staleTime > 0 &&
				Date.now() - entry.lastUpdatedAt > staleTime
			) {
				fetchQuery<TData>(options.key, options.fetcher, { retry: options.retry });
			}
		}

		window.addEventListener("focus", onFocus);
		return () => window.removeEventListener("focus", onFocus);
	});

	$effect(() => {
		const enabled = options.enabled ?? true;
		const interval = options.refetchInterval;
		if (!enabled || !interval) return;

		const id = setInterval(() => {
			const entry = getEntry<TData>(options.key);
			if (entry && entry.fetchStatus !== "fetching") {
				fetchQuery<TData>(options.key, options.fetcher, { retry: options.retry });
			}
		}, interval);

		return () => clearInterval(id);
	});

	async function refetch(): Promise<void> {
		await fetchQuery<TData>(options.key, options.fetcher, { retry: options.retry });
		syncFromCache();
		const entry = getEntry<TData>(options.key);
		if (entry) {
			if (entry.status === "success" && entry.data !== undefined) {
				options.onSuccess?.(entry.data as TData);
			} else if (entry.status === "error") {
				options.onError?.(entry.error!);
			}
		}
	}

	return {
		get data() {
			return _data;
		},
		get error() {
			return _error;
		},
		get status() {
			return _status;
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
		get isStale() {
			return isStale;
		},
		refetch,
	};
}
