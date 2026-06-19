export function useToggle(initialValue: boolean = false) {
	let value = $state(initialValue);

	return {
		get value() {
			return value;
		},
		set value(v: boolean) {
			value = v;
		},
		toggle() {
			value = !value;
		},
		setOn() {
			value = true;
		},
		setOff() {
			value = false;
		},
	};
}
