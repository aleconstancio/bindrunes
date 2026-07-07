export function uid(prefix: string): string {
	const r = Math.random().toString(36).slice(2, 10);
	const t = Date.now().toString(36);
	return `${prefix}_${t}${r}`;
}
