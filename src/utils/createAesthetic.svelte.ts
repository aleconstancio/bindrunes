import { createStorage } from "./createStorage";

const AESTHETICS = ["editorial", "glass", "bento", "expressive"] as const;
export type Aesthetic = (typeof AESTHETICS)[number];

export function createAesthetic(options?: { default?: Aesthetic }) {
	const storage = createStorage("bindrunes");
	let aesthetic = $state<Aesthetic>(
		(storage.get<string>("aesthetic") as Aesthetic) ?? options?.default ?? "editorial",
	);

	$effect(() => {
		document.documentElement.setAttribute("data-aesthetic", aesthetic);
		storage.set("aesthetic", aesthetic);
	});

	return {
		get aesthetic() {
			return aesthetic;
		},
		setAesthetic(a: Aesthetic) {
			aesthetic = a;
		},
		aesthetics: AESTHETICS,
	};
}
