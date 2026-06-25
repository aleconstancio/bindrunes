type Result = { theme: string; isDark: boolean };

function parseCookies(header: string): Record<string, string> {
	return Object.fromEntries(
		header.split(";").map((c) => {
			const [key, ...val] = c.trim().split("=");
			return [key, val.join("=")];
		}),
	);
}

export function useThemeServer(request?: Request, opts?: { default?: string }): Result {
	const fallback = opts?.default ?? "editorial";
	if (!request) return { theme: fallback, isDark: true };
	const cookies = parseCookies(request.headers.get("cookie") ?? "");
	return {
		theme: cookies["theme"] ?? fallback,
		isDark: (cookies["color-scheme"] ?? "dark") === "dark",
	};
}
