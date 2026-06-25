import { isBrowser } from "./isBrowser";

type LazyLoadOptions = {
	rootMargin?: string;
	threshold?: number;
};

export function useLazyLoad(options: LazyLoadOptions = {}) {
	const { rootMargin = "200px", threshold = 0 } = options;

	if (!isBrowser) {
		return {
			get loaded() {
				return true;
			},
			get shouldLoad() {
				return true;
			},
			ref: (_el: HTMLElement) => {},
		};
	}

	let loaded = $state(false);
	let observer: IntersectionObserver | undefined;

	function ref(el: HTMLElement | null) {
		if (!el || observer) return;
		observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					loaded = true;
					observer?.disconnect();
				}
			},
			{ rootMargin, threshold },
		);
		observer.observe(el);
	}

	return {
		get loaded() {
			return loaded;
		},
		get shouldLoad() {
			return loaded;
		},
		ref,
	};
}
