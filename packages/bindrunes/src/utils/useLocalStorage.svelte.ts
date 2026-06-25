import { createStorage } from "./createStorage";

export function useLocalStorage<T>(
	key: string,
	defaultValue: T,
): { value: T; set: (v: T) => void; remove: () => void } {
	const storage = createStorage("");

	let value = $state(storage.get<T>(key) ?? defaultValue);

	function set(v: T) {
		value = v;
		storage.set(key, v);
	}

	function remove() {
		value = defaultValue;
		storage.remove(key);
	}

	return {
		get value() {
			return value;
		},
		set,
		remove,
	};
}
