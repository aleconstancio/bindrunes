/**
 * Debounce a reactive value.
 * useDebounce(value, delay) → returns { current } with debounced value
 */
export function useDebounce<T>(value: T, delay?: number): { current: T };
/**
 * Debounce a callback function.
 * useDebounce(fn, delay) → returns debounced wrapper function
 */
export function useDebounce<T extends (...args: unknown[]) => unknown>(
	fn: T,
	delay: number,
): (...args: Parameters<T>) => void;
export function useDebounce<T>(
	valueOrFn: T | ((...args: unknown[]) => unknown),
	delay: number = 300,
): { current: T } | ((...args: unknown[]) => void) {
	// If it's a function, return a debounced callback
	if (typeof valueOrFn === "function") {
		let timer: ReturnType<typeof setTimeout> | undefined;
		return (...args: unknown[]) => {
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => (valueOrFn as (...args: unknown[]) => unknown)(...args), delay);
		};
	}

	// Otherwise, debounce the reactive value
	let timeout: ReturnType<typeof setTimeout> | undefined;
	let _current = $state(valueOrFn as T);

	$effect(() => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			_current = valueOrFn as T;
		}, delay);

		return () => clearTimeout(timeout);
	});

	return {
		get current() {
			return _current;
		},
	};
}
