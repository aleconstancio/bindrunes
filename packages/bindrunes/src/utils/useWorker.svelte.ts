import { isBrowser } from "./isBrowser";

/**
 * Offload heavy computations to a Web Worker.
 *
 * **Important:** `fn` must be a standalone function — no closures, no external
 * variable references, no imports. Only values that can be serialised via
 * `postMessage` may cross the worker boundary.
 *
 * @example
 * ```ts
 * const { run, terminate } = useWorker((n: number) => {
 *   let result = 0;
 *   for (let i = 0; i < n; i++) result += i;
 *   return result;
 * });
 * const sum = await run(1_000_000);
 * terminate(); // clean up when done
 * ```
 */
export function useWorker<TInput, TOutput>(
	fn: (input: TInput) => TOutput,
	options?: { timeout?: number },
) {
	const timeout = options?.timeout ?? 5000;

	if (!isBrowser) {
		return {
			run(input: TInput) {
				return Promise.resolve(fn(input));
			},
			terminate() {},
		};
	}

	const blob = new Blob(
		[`(${fn.toString()})(self.onmessage = (e) => self.postMessage(fn(e.data)));`],
		{
			type: "application/javascript",
		},
	);
	const url = URL.createObjectURL(blob);
	const worker = new Worker(url);

	function run(input: TInput): Promise<TOutput> {
		return new Promise((resolve, reject) => {
			const timer = setTimeout(() => {
				worker.terminate();
				reject(new Error("Worker timeout"));
			}, timeout);

			worker.onmessage = (e) => {
				clearTimeout(timer);
				resolve(e.data);
			};
			worker.onerror = (e) => {
				clearTimeout(timer);
				reject(e);
			};
			worker.postMessage(input);
		});
	}

	return {
		run,
		terminate() {
			worker.terminate();
			URL.revokeObjectURL(url);
		},
	};
}
