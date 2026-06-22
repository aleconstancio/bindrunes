import { createMediaQuery } from "./createMediaQuery.svelte";

export interface ResponsiveDensityOptions {
	readonly default?: "compact" | "comfortable" | "spacious";
	readonly breakpoints?: {
		compact?: string;
		comfortable?: string;
		spacious?: string;
	};
}

export function useResponsiveDensity(options: ResponsiveDensityOptions = {}) {
	const { default: defaultDensity = "comfortable", breakpoints = {} } = options;

	const compactQuery = createMediaQuery({
		query: breakpoints.compact ?? "(max-width: 768px)",
	});
	const spaciousQuery = createMediaQuery({
		query: breakpoints.spacious ?? "(min-width: 1201px)",
	});

	function getCurrentDensity(): "compact" | "comfortable" | "spacious" {
		if (compactQuery.matches) return "compact";
		if (spaciousQuery.matches) return "spacious";
		return defaultDensity;
	}

	let density = $state(getCurrentDensity());

	$effect(() => {
		const _compact = compactQuery.matches;
		const _spacious = spaciousQuery.matches;
		density = getCurrentDensity();
	});

	return {
		get current() {
			return density;
		},
		get isCompact() {
			return density === "compact";
		},
		get isComfortable() {
			return density === "comfortable";
		},
		get isSpacious() {
			return density === "spacious";
		},
	};
}
