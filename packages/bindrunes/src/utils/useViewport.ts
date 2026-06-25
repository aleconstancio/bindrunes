import { isBrowser } from "./isBrowser";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const BREAKPOINTS: Record<Breakpoint, string> = {
	xs: "(max-width: 639px)",
	sm: "(min-width: 640px)",
	md: "(min-width: 768px)",
	lg: "(min-width: 1024px)",
	xl: "(min-width: 1280px)",
	"2xl": "(min-width: 1536px)",
};

export function useViewport() {
	if (!isBrowser) {
		return {
			get current(): Breakpoint {
				return "lg";
			},
			get above() {
				return { xs: true, sm: true, md: true, lg: true, xl: false, "2xl": false } as Record<
					Breakpoint,
					boolean
				>;
			},
			get below() {
				return { xs: false, sm: false, md: false, lg: false, xl: true, "2xl": true } as Record<
					Breakpoint,
					boolean
				>;
			},
			get isMobile() {
				return false;
			},
			get isTablet() {
				return false;
			},
			get isDesktop() {
				return true;
			},
		};
	}

	let current = $state<Breakpoint>("lg");

	$effect(() => {
		const entries = Object.entries(BREAKPOINTS).map(([bp, query]) => ({
			bp: bp as Breakpoint,
			mql: window.matchMedia(query),
		}));

		function update() {
			for (const { bp, mql } of entries) {
				if (mql.matches) {
					current = bp;
					break;
				}
			}
		}

		update();
		for (const { mql } of entries) mql.addEventListener("change", update);
		return () => {
			for (const { mql } of entries) mql.removeEventListener("change", update);
		};
	});

	const order: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "2xl"];

	return {
		get current() {
			return current;
		},
		get above() {
			const idx = order.indexOf(current);
			return Object.fromEntries(order.map((bp) => [bp, order.indexOf(bp) <= idx])) as Record<
				Breakpoint,
				boolean
			>;
		},
		get below() {
			const idx = order.indexOf(current);
			return Object.fromEntries(order.map((bp) => [bp, order.indexOf(bp) > idx])) as Record<
				Breakpoint,
				boolean
			>;
		},
		get isMobile() {
			return order.indexOf(current) <= 1;
		},
		get isTablet() {
			return order.indexOf(current) === 2;
		},
		get isDesktop() {
			return order.indexOf(current) >= 3;
		},
	};
}
