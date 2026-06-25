import { isBrowser } from "./isBrowser";

type InViewOptions = {
	threshold?: number;
	rootMargin?: string;
	once?: boolean;
};

export function useInView(
	element: () => HTMLElement | undefined | null,
	options: InViewOptions = {},
) {
	const { threshold = 0, rootMargin = "0px", once = true } = options;

	if (!isBrowser) {
		return {
			get inView() {
				return false;
			},
			get hasEntered() {
				return false;
			},
			destroy() {},
		};
	}

	let inView = $state(false);
	let hasEntered = $state(false);

	$effect(() => {
		const el = element();
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				const isVisible = entry?.isIntersecting ?? false;
				inView = isVisible;
				if (isVisible) hasEntered = true;
				if (once && isVisible) observer.disconnect();
			},
			{ threshold, rootMargin },
		);

		observer.observe(el);
		return () => observer.disconnect();
	});

	return {
		get inView() {
			return inView;
		},
		get hasEntered() {
			return hasEntered;
		},
		destroy() {},
	};
}
