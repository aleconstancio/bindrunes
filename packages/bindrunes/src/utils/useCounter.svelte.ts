export function useCounter(initialValue: number = 0) {
	let count = $state(initialValue);

	return {
		get count() {
			return count;
		},
		set count(v: number) {
			count = v;
		},
		increment() {
			count++;
		},
		decrement() {
			count--;
		},
		reset() {
			count = initialValue;
		},
		set(v: number) {
			count = v;
		},
	};
}
