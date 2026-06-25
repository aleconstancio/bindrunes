import { parseCookies } from "./parseCookies";

type Result = { theme: string; isDark: boolean };

export function useThemeServer(request?: Request, opts?: { default?: string }): Result {
	const fallback = opts?.default ?? "editorial";
	if (!request) return { theme: fallback, isDark: true };
	const cookies = parseCookies(request.headers.get("cookie") ?? "");
	return {
		theme: cookies["theme"] ?? fallback,
		isDark: (cookies["color-scheme"] ?? "dark") === "dark",
	};
}
