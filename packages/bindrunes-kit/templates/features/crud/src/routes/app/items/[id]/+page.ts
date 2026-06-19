import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, fetch }) => {
	const res = await fetch(`/api/items/${params.id}`);
	if (!res.ok) {
		return { item: null };
	}
	const item = await res.json();
	return { item };
};
