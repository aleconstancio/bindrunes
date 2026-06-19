import { invalidateQuery } from "./queryCache";

export type SSEEventRouter = {
	[eventType: string]: string | string[];
};

export function handleSSEEvent(type: string, routes: SSEEventRouter): void {
	const cacheKey = routes[type];
	if (cacheKey) {
		if (Array.isArray(cacheKey)) {
			for (const key of cacheKey) invalidateQuery(key);
		} else {
			invalidateQuery(cacheKey);
		}
	}
}
