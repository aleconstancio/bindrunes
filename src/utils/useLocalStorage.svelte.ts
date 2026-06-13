import { isBrowser } from "./isBrowser";

export function useLocalStorage<T>(
	key: string,
	defaultValue: T,
): { value: T; set: (v: T) => void; remove: () => void } {
	function getStored(): T {
		if (!isBrowser) return defaultValue;
		try {
			const item = localStorage.getItem(key);
			return item ? (JSON.parse(item) as T) : defaultValue;
		} catch {
			return defaultValue;
		}
	}

	let value = $state(getStored());

	function set(v: T) {
		value = v;
		if (isBrowser) {
			try {
				localStorage.setItem(key, JSON.stringify(v));
			} catch {
				// quota exceeded or private browsing
			}
		}
	}

	function remove() {
		value = defaultValue;
		if (isBrowser) {
			try {
				localStorage.removeItem(key);
			} catch {
				// silent
			}
		}
	}

	return {
		get value() {
			return value;
		},
		set,
		remove,
	};
}
