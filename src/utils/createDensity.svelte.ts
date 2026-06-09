import { createStorage } from "./createStorage";

const DENSITIES = ["compact", "comfortable", "spacious"] as const;
export type Density = (typeof DENSITIES)[number];

export function createDensity(options?: { default?: Density }) {
	const storage = createStorage("bindrunes");
	let density = $state<Density>(
		(storage.get<string>("density") as Density) ?? options?.default ?? "comfortable",
	);

	$effect(() => {
		document.documentElement.setAttribute("data-density", density);
		storage.set("density", density);
	});

	return {
		get density() {
			return density;
		},
		setDensity(d: Density) {
			density = d;
		},
		densities: DENSITIES,
	};
}
