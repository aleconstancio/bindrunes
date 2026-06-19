import { isBrowser } from "./isBrowser";

export function useReducedMotion(): { current: boolean } {
	let current = $state(false);

	if (isBrowser) {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		current = mq.matches;

		const handler = (e: MediaQueryListEvent) => {
			current = e.matches;
		};

		mq.addEventListener("change", handler);

		// No cleanup needed - matchMedia listeners persist for the page lifetime
		// and are cleaned up when the page unloads
	}

	return {
		get current() {
			return current;
		},
	};
}
