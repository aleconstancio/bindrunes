export function getGridClass(columns: number): string {
	if (columns === 1) return "grid-cols-1";
	if (columns === 2) return "grid-cols-1 sm:grid-cols-2";
	if (columns === 4) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
	return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
}
