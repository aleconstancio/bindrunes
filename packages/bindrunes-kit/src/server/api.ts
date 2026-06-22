import type { RequestEvent } from "@sveltejs/kit";

interface ServerApiClientOptions {
	baseUrl: string;
	auth?: boolean;
	headers?: Record<string, string>;
	onError?: (error: Error) => void;
}

export function createServerApiClient(options: ServerApiClientOptions) {
	const { baseUrl, auth = false, headers = {}, onError } = options;

	async function request<T>(
		path: string,
		fetchOptions: RequestInit = {},
		event?: RequestEvent,
	): Promise<T> {
		const requestHeaders: Record<string, string> = { ...headers };

		if (auth && event?.locals.session) {
			requestHeaders.Authorization = `Bearer ${event.locals.session.user.id}`;
		}

		if (fetchOptions.body && !requestHeaders["Content-Type"]) {
			requestHeaders["Content-Type"] = "application/json";
		}

		try {
			const response = await fetch(`${baseUrl}${path}`, {
				...fetchOptions,
				headers: { ...requestHeaders, ...Object.fromEntries(new Headers(fetchOptions.headers)) },
			});

			if (!response.ok) {
				const error = new Error(`API error: ${response.status} ${response.statusText}`);
				onError?.(error);
				throw error;
			}

			const text = await response.text();
			return text ? JSON.parse(text) : (undefined as T);
		} catch (error) {
			onError?.(error instanceof Error ? error : new Error(String(error)));
			throw error;
		}
	}

	return {
		get: <T>(path: string, event?: RequestEvent) => request<T>(path, {}, event),
		post: <T>(path: string, body?: unknown, event?: RequestEvent) =>
			request<T>(
				path,
				{
					method: "POST",
					body: body ? JSON.stringify(body) : undefined,
				},
				event,
			),
		put: <T>(path: string, body?: unknown, event?: RequestEvent) =>
			request<T>(
				path,
				{
					method: "PUT",
					body: body ? JSON.stringify(body) : undefined,
				},
				event,
			),
		patch: <T>(path: string, body?: unknown, event?: RequestEvent) =>
			request<T>(
				path,
				{
					method: "PATCH",
					body: body ? JSON.stringify(body) : undefined,
				},
				event,
			),
		delete: <T>(path: string, event?: RequestEvent) =>
			request<T>(path, { method: "DELETE" }, event),
	};
}
