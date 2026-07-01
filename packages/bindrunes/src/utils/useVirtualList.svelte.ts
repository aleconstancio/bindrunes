interface VirtualItem<T> {
	item: T;
	index: number;
	style: string;
}

export function useVirtualList<T>(
	items: T[],
	options: { itemHeight: number; overscan?: number },
): {
	visibleItems: VirtualItem<T>[];
	containerStyle: string;
	scrollTo: (index: number) => void;
	scrollHandler: (e: Event) => void;
} {
	const { itemHeight, overscan = 5 } = options;
	let scrollTop = $state(0);
	let containerHeight = $state(0);

	const totalHeight = $derived(items.length * itemHeight);
	const startIndex = $derived(Math.max(0, Math.floor(scrollTop / itemHeight) - overscan));
	const endIndex = $derived(
		Math.min(items.length, Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan),
	);

	const visibleItems = $derived(
		items.slice(startIndex, endIndex).map((item, i) => ({
			item,
			index: startIndex + i,
			style: `position:absolute;top:${(startIndex + i) * itemHeight}px;left:0;right:0;height:${itemHeight}px;`,
		})),
	);

	const containerStyle = $derived(`position:relative;height:${totalHeight}px;overflow:auto;`);

	function scrollTo(index: number) {
		scrollTop = index * itemHeight;
	}

	function scrollHandler(e: Event) {
		const el = e.target as HTMLElement;
		scrollTop = el.scrollTop;
		containerHeight = el.clientHeight;
	}

	return {
		get visibleItems() {
			return visibleItems;
		},
		get containerStyle() {
			return containerStyle;
		},
		scrollTo,
		scrollHandler,
	};
}
