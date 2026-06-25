import { isBrowser } from "./isBrowser";

/**
 * Typed localStorage wrapper with prefix.
 *
 * Usage:
 * const storage = createStorage('myapp');
 * storage.set('token', 'abc123');
 * storage.get('token'); // 'abc123'
 * storage.remove('token');
 */
export function createStorage(prefix: string) {
	const key = (k: string) => (prefix ? `${prefix}_${k}` : k);

	return {
		get<T = string>(k: string): T | null {
			if (!isBrowser) return null;
			try {
				const raw = localStorage.getItem(key(k));
				return raw ? (JSON.parse(raw) as T) : null;
			} catch {
				return null;
			}
		},
		set<T>(k: string, v: T): void {
			if (!isBrowser) return;
			try {
				localStorage.setItem(key(k), JSON.stringify(v));
			} catch {
				/* ignore */
			}
		},
		remove(k: string): void {
			if (!isBrowser) return;
			try {
				localStorage.removeItem(key(k));
			} catch {
				/* ignore */
			}
		},
		clear(): void {
			if (!isBrowser) return;
			try {
				const keys = prefix
					? Object.keys(localStorage).filter((k) => k.startsWith(`${prefix}_`))
					: [];
				for (const k of keys) localStorage.removeItem(k);
			} catch {
				/* ignore */
			}
		},
	};
}
