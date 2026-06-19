import { onDestroy } from "svelte";

export function useThrottle<T>(value: T, delay: number = 300): { current: T } {
	let lastExec = 0;
	let timeout: ReturnType<typeof setTimeout> | undefined;
	let _current = $state(value);

	$effect(() => {
		const now = Date.now();
		const elapsed = now - lastExec;

		if (elapsed >= delay) {
			lastExec = now;
			_current = value;
		} else {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				lastExec = Date.now();
				_current = value;
			}, delay - elapsed);
		}
	});

	onDestroy(() => clearTimeout(timeout));

	return {
		get current() {
			return _current;
		},
	};
}
