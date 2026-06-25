import { isBrowser } from "./isBrowser";

type ScrollLinkedOptions = {
	element?: () => HTMLElement | undefined | null;
	direction?: "vertical" | "horizontal";
	offset?: [number, number];
};

export function useScrollLinked(options: ScrollLinkedOptions = {}) {
	const { direction = "vertical", offset = [0, 1] } = options;

	if (!isBrowser) {
		return {
			get progress() {
				return 0;
			},
			get value() {
				return 0;
			},
			destroy() {},
		};
	}

	let progress = $state(0);
	let rafId = 0;

	$effect(() => {
		const el = options.element?.() ?? document.documentElement;

		function onScroll() {
			cancelAnimationFrame(rafId);
			rafId = requestAnimationFrame(() => {
				const scrollMax =
					direction === "vertical"
						? el.scrollHeight - el.clientHeight
						: el.scrollWidth - el.clientWidth;
				const scrollPos = direction === "vertical" ? el.scrollTop : el.scrollLeft;
				const raw = scrollMax > 0 ? scrollPos / scrollMax : 0;
				const [start, end] = offset;
				progress = Math.max(0, Math.min(1, (raw - start) / (end - start)));
			});
		}

		el.addEventListener("scroll", onScroll, { passive: true });
		onScroll();

		return () => {
			el.removeEventListener("scroll", onScroll);
			cancelAnimationFrame(rafId);
		};
	});

	return {
		get progress() {
			return progress;
		},
		get value() {
			return progress;
		},
		destroy() {
			cancelAnimationFrame(rafId);
		},
	};
}
