import { onDestroy } from "svelte";
import { isBrowser } from "./isBrowser";

export function useEventListener<K extends keyof WindowEventMap>(
	event: K,
	handler: (e: WindowEventMap[K]) => void,
	options?: AddEventListenerOptions,
) {
	function setup() {
		if (!isBrowser) return;
		window.addEventListener(event, handler, options);
	}

	function cleanup() {
		if (!isBrowser) return;
		window.removeEventListener(event, handler, options);
	}

	setup();
	onDestroy(cleanup);

	return {
		destroy() {
			cleanup();
		},
	};
}
