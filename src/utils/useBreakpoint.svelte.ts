import { untrack } from "svelte";

const breakpoints = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	"2xl": 1536,
} as const;

type Breakpoint = keyof typeof breakpoints;

export function useBreakpoint(breakpoint: Breakpoint = "md") {
	if (typeof window === "undefined") {
		return {
			get isAbove() {
				return true;
			},
			get isBelow() {
				return false;
			},
		};
	}

	const width = $state<number>(window.innerWidth);
	const bp = breakpoints[breakpoint];

	let isAbove = $derived(width >= bp);
	let isBelow = $derived(width < bp);

	function update() {
		const w = window.innerWidth;
		isAbove = w >= bp;
		isBelow = w < bp;
	}

	$effect(() => {
		const mq = window.matchMedia(`(min-width: ${bp}px)`);
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	});

	return {
		get isAbove() {
			return isAbove;
		},
		get isBelow() {
			return isBelow;
		},
	};
}
