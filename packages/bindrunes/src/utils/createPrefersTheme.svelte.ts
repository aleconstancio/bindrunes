import { createMediaQuery } from "./createMediaQuery.svelte";

export function createPrefersTheme() {
	const mql = createMediaQuery({ query: "(prefers-color-scheme: dark)" });

	$effect(() => {
		const root = document.documentElement;
		const original = root.classList.contains("dark");
		root.classList.toggle("dark", mql.matches);
		return () => {
			if (original) {
				root.classList.add("dark");
			} else {
				root.classList.remove("dark");
			}
		};
	});

	return {
		stop() {
			mql.stop();
		},
	};
}
