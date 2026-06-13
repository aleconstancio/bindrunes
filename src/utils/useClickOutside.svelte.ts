import { onDestroy } from "svelte";

export function useClickOutside(
	element: HTMLElement | null,
	callback: () => void,
	options?: { enabled?: boolean },
) {
	let enabled = options?.enabled ?? true;

	function handler(e: MouseEvent) {
		if (!enabled || !element) return;
		if (!element.contains(e.target as Node)) {
			callback();
		}
	}

	function setup() {
		document.addEventListener("click", handler, true);
	}

	function cleanup() {
		document.removeEventListener("click", handler, true);
	}

	if (element) setup();

	onDestroy(cleanup);

	return {
		setEnabled(value: boolean) {
			enabled = value;
		},
		destroy() {
			cleanup();
		},
	};
}
