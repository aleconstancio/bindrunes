import { parseCookies } from "./parseCookies";

type Density = "compact" | "comfortable" | "spacious";
type Result = { density: Density };

export function useDensityServer(request?: Request, opts?: { default?: Density }): Result {
	const fallback = opts?.default ?? "comfortable";
	if (!request) return { density: fallback };
	const cookies = parseCookies(request.headers.get("cookie") ?? "");
	return { density: (cookies.density as Density) ?? fallback };
}
