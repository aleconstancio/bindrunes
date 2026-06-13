import { createMediaQuery } from "./createMediaQuery.svelte";

export function createPrefersTheme() {
	const mql = createMediaQuery({ query: "(prefers-color-scheme: dark)" });

	$effect(() => {
		document.documentElement.classList.toggle("dark", mql.matches);
	});

	return {
		stop() {
			mql.stop();
		},
	};
}
