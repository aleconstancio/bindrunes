// jsdom/happy-dom polyfills required by bits-ui and other browser APIs.
// Only applied when a browser-like environment is active.

if (typeof window !== "undefined" && typeof document !== "undefined") {
	window.CSS = { supports: () => true, escape: (s: string) => s } as unknown as typeof CSS;
	window.Element.prototype.scrollTo = () => {};

	class MockResizeObserver {
		observe() {}
		unobserve() {}
		disconnect() {}
	}
	window.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

	class MockIntersectionObserver {
		observe() {}
		unobserve() {}
		disconnect() {}
	}
	window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
	window.HTMLElement.prototype.hasPointerCapture = () => false;

	// @internationalized/date needs Intl.DateTimeFormat().resolvedOptions().calendar
	if (typeof Intl !== "undefined" && Intl.DateTimeFormat) {
		const origResolved = Intl.DateTimeFormat.prototype.resolvedOptions;
		Intl.DateTimeFormat.prototype.resolvedOptions = function () {
			const result = origResolved.call(this);
			if (!result.calendar) {
				result.calendar = "gregory";
			}
			return result;
		};
	}
}
