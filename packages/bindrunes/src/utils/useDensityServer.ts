type Density = "compact" | "comfortable" | "spacious";
type Result = { density: Density };

function parseCookies(header: string): Record<string, string> {
	return Object.fromEntries(
		header.split(";").map((c) => {
			const [key, ...val] = c.trim().split("=");
			return [key, val.join("=")];
		}),
	);
}

export function useDensityServer(request?: Request, opts?: { default?: Density }): Result {
	const fallback = opts?.default ?? "comfortable";
	if (!request) return { density: fallback };
	const cookies = parseCookies(request.headers.get("cookie") ?? "");
	return { density: (cookies["density"] as Density) ?? fallback };
}
