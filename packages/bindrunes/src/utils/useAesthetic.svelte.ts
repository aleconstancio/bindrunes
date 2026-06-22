import { createPersistedDataAttribute } from "./createPersistedDataAttribute.svelte";

const AESTHETICS = [
	"minimal",
	"glass",
	"bento",
	"expressive",
	"neon",
	"brutalist",
	"organic",
] as const;
export type Aesthetic = (typeof AESTHETICS)[number];

export function useAesthetic(options?: { default?: Aesthetic }) {
	const state = createPersistedDataAttribute({
		storageKey: "aesthetic",
		attributeName: "data-aesthetic",
		values: AESTHETICS,
		default: options?.default ?? "minimal",
	});

	return {
		get aesthetic() {
			return state.value;
		},
		setAesthetic(a: Aesthetic) {
			state.setValue(a);
		},
		aesthetics: AESTHETICS,
	};
}
