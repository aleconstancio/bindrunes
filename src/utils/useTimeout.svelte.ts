import { onDestroy } from "svelte";

export function useTimeout(callback: () => void, delay: number) {
	let id: ReturnType<typeof setTimeout> | undefined;
	let fired = $state(false);

	function start() {
		fired = false;
		id = setTimeout(() => {
			fired = true;
			callback();
		}, delay);
	}

	function clear() {
		if (id !== undefined) {
			clearTimeout(id);
			id = undefined;
		}
	}

	start();
	onDestroy(clear);

	return {
		get fired() {
			return fired;
		},
		clear,
		reset() {
			clear();
			start();
		},
	};
}
