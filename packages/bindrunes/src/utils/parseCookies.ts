export function parseCookies(header: string): Record<string, string> {
	if (!header) return {};
	return Object.fromEntries(
		header.split(";").map((c) => {
			const [key, ...val] = c.trim().split("=");
			return [key, val.join("=")];
		}),
	);
}
