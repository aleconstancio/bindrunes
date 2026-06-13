import { onDestroy } from "svelte";
import { isBrowser } from "./isBrowser";

export function useIntersectionObserver(
	element: HTMLElement | null,
	callback: (isIntersecting: boolean) => void,
	options?: IntersectionObserverInit,
) {
	let observer: IntersectionObserver | undefined;

	function setup() {
		if (!isBrowser || !element) return;
		observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				callback(entry.isIntersecting);
			}
		}, options);
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
