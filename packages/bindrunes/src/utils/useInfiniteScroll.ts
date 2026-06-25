import { useIntersectionObserver } from "./useIntersectionObserver.svelte";

interface UseInfiniteScrollOptions {
	onLoadMore: () => Promise<boolean> | boolean;
	threshold?: number;
	rootMargin?: string;
}

export function useInfiniteScroll(
	sentinel: HTMLElement | null | undefined,
	options: UseInfiniteScrollOptions,
): void {
	const { onLoadMore, threshold = 0, rootMargin = "100px" } = options;
	if (!sentinel) return;
	useIntersectionObserver(
		sentinel,
		async (isIntersecting) => {
			if (isIntersecting) {
				await onLoadMore();
			}
		},
		{ threshold, rootMargin },
	);
}
