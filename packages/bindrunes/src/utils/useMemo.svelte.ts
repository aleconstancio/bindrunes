import { dequal } from "./dequal";

export function useMemo<T>(compute: () => T, equality?: (a: T, b: T) => boolean): { value: T } {
	const eq = equality ?? dequal;
	let prev = $state(compute());
	let current = prev;

	$effect(() => {
		const next = compute();
		if (!eq(prev, next)) {
			prev = next;
			current = next;
		}
	});

	return {
		get value() {
			return current;
		},
	};
}
