import { onDestroy } from "svelte";

export function useDebounce<T>(value: T, delay: number = 300): { current: T } {
	let timeout: ReturnType<typeof setTimeout> | undefined;
	let _current = $state(value);

	$effect(() => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			_current = value;
		}, delay);
	});

	onDestroy(() => clearTimeout(timeout));

	return {
		get current() {
			return _current;
		},
	};
}
