export function supportsViewTransitions(): boolean {
	return typeof document !== "undefined" && "startViewTransition" in document;
}

export function withViewTransition(fn: () => void): void {
	if (supportsViewTransitions()) {
		document.startViewTransition(() => fn());
	} else {
		fn();
	}
}
