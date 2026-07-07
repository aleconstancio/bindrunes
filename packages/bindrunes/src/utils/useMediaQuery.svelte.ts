import { createStorage } from "./createStorage";

type ReactiveMediaQueryOptions = {
	query: string;
	defaultValue?: boolean;
	storageKey?: string;
};

export function useMediaQuery(options: ReactiveMediaQueryOptions) {
	if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
		return {
			get matches() {
				return false;
			},
			destroy() {},
		};
	}

	const mql = window.matchMedia(options.query);
	const storage = options.storageKey ? createStorage("bindrunes") : null;

	let matches = $state(mql.matches);

	$effect(() => {
		function onChange() {
			matches = mql.matches;
			const key = options.storageKey;
			if (key) storage?.set(key, mql.matches);
		}
		mql.addEventListener("change", onChange);
		return () => mql.removeEventListener("change", onChange);
	});

	return {
		get matches() {
			return matches;
		},
		destroy() {},
	};
}
