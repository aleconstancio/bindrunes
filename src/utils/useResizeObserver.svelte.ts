import { onDestroy } from "svelte";
import { isBrowser } from "./isBrowser";

export function useResizeObserver(
	element: HTMLElement | null,
	callback: (entry: ResizeObserverEntry) => void,
) {
	let observer: ResizeObserver | undefined;

	function setup() {
		if (!isBrowser || !element) return;
		observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				callback(entry);
			}
		});
		observer.observe(element);
	}

	function cleanup() {
		observer?.disconnect();
		observer = undefined;
	}

	if (element) setup();

	onDestroy(cleanup);

	return {
		destroy() {
			cleanup();
		},
	};
}
