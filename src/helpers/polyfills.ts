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
}
