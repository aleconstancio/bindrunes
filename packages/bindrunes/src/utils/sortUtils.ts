export type SortDirection = "asc" | "desc" | null;

export function toggleSort(
	currentKey: string | null,
	currentDir: SortDirection,
	newKey: string,
): {
	key: string;
	direction: SortDirection;
} {
	if (currentKey !== newKey) return { key: newKey, direction: "asc" };
	if (currentDir === "asc") return { key: newKey, direction: "desc" };
	return { key: newKey, direction: null };
}
