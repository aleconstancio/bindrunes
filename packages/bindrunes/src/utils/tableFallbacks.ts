export const defaultTableFallbacks = (
	key: string,
	params?: Record<string, string | number>,
): string => {
	const fallbacks: Record<string, string> = {
		"table.page": `Page ${params?.current ?? "?"} of ${params?.total ?? "?"}`,
		"pagination.perPage": `${params?.count ?? "?"} per page`,
	};
	return fallbacks[key] ?? key;
};
