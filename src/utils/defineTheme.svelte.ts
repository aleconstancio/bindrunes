export function defineTheme(name: string, tokens: Record<string, string>) {
	if (typeof document === "undefined") return { apply: () => {}, remove: () => {} };

	const style = document.createElement("style");
	style.setAttribute("data-bindrunes-theme", name);

	function buildCSS() {
		const body = Object.entries(tokens)
			.map(([key, value]) => `  ${key}: ${value};`)
			.join("\n");
		return `[data-theme="${name}"] {\n${body}\n}`;
	}

	return {
		apply() {
			style.textContent = buildCSS();
			document.head.appendChild(style);
		},
		remove() {
			style.remove();
		},
	};
}
