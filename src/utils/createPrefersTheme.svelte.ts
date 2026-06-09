export function createPrefersTheme() {
	if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
		return { stop: () => {} };
	}

	const mql = window.matchMedia("(prefers-color-scheme: dark)");
	const apply = () => {
		document.documentElement.classList.toggle("dark", mql.matches);
	};
	apply();
	mql.addEventListener("change", apply);
	return {
		stop() {
			mql.removeEventListener("change", apply);
		},
	};
}
