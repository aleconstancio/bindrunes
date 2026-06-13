import { onDestroy } from "svelte";

export function useInterval(callback: () => void, delay: number | null) {
	let id: ReturnType<typeof setInterval> | undefined;

	function start() {
		if (delay === null || delay <= 0) return;
		id = setInterval(callback, delay);
	}

	function stop() {
		if (id !== undefined) {
			clearInterval(id);
			id = undefined;
		}
	}

	function reset(newDelay?: number) {
		stop();
		if (newDelay !== undefined) {
			delay = newDelay;
		}
		start();
	}

	start();
	onDestroy(stop);

	return { stop, reset };
}
