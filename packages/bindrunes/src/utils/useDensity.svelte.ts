import { createPersistedDataAttribute } from "./createPersistedDataAttribute.svelte";

const DENSITIES = ["compact", "comfortable", "spacious"] as const;
export type Density = (typeof DENSITIES)[number];

export function useDensity(options?: { default?: Density }) {
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
