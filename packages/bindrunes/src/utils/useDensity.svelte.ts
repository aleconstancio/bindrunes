import { createPersistedDataAttribute } from "./createPersistedDataAttribute.svelte";
import { useMediaQuery } from "./useMediaQuery.svelte";

const DENSITIES = ["compact", "comfortable", "spacious"] as const;
export type Density = (typeof DENSITIES)[number];

export interface ResponsiveDensityOptions {
	readonly default?: Density;
	readonly breakpoints?: {
		compact?: string;
		comfortable?: string;
		spacious?: string;
	};
}

export function useDensity(
	options?: { default?: Density } & { responsive?: ResponsiveDensityOptions },
) {
	// Responsive mode: derive from media queries
	if (options?.responsive) {
		const { default: defaultDensity = "comfortable", breakpoints = {} } = options.responsive;

		const compactQuery = useMediaQuery({
			query: breakpoints.compact ?? "(max-width: 768px)",
		});
		const spaciousQuery = useMediaQuery({
			query: breakpoints.spacious ?? "(min-width: 1201px)",
		});

		function getCurrentDensity(): Density {
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
			get density() {
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

	// Default mode: persisted preference
	const state = createPersistedDataAttribute({
		storageKey: "density",
		attributeName: "data-density",
		values: DENSITIES,
		default: options?.default ?? "comfortable",
	});

	return {
		get density() {
			return state.value;
		},
		setDensity(d: Density) {
			state.setValue(d);
		},
		densities: DENSITIES,
	};
}
