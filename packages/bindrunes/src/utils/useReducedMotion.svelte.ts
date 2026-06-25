import { isBrowser } from "./isBrowser";

export function useReducedMotion(): { current: boolean; destroy: () => void } {
	let current = $state(false);

	if (isBrowser) {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		current = mq.matches;

		$effect(() => {
			function onChange(e: MediaQueryListEvent) {
				current = e.matches;
			}
			mq.addEventListener("change", onChange);
			return () => mq.removeEventListener("change", onChange);
		});
	}

	return {
		get current() {
			return current;
		},
		destroy() {},
	};
}
