type AsyncStatus = "idle" | "loading" | "success" | "error";

export function createAsyncState() {
	let status = $state<AsyncStatus>("idle");
	let error = $state<Error | null>(null);

	async function run<T>(fn: () => Promise<T>): Promise<T> {
		status = "loading";
		error = null;
		try {
			const result = await fn();
			status = "success";
			return result;
		} catch (e) {
			error = e instanceof Error ? e : new Error(String(e));
			status = "error";
			throw e;
		}
	}

	return {
		get status() {
			return status;
		},
		get error() {
			return error;
		},
		get isLoading() {
			return status === "loading";
		},
		get isSuccess() {
			return status === "success";
		},
		get isError() {
			return status === "error";
		},
		run,
		reset() {
			status = "idle";
			error = null;
		},
	};
}
