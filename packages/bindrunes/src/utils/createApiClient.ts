/**
 * Creates a typed API client with Bearer token auth, JSON parsing, and error handling.
 *
 * Usage:
 * <script lang="ts">
 *   import { createApiClient } from 'urupe-ui';
 *
 *   const api = createApiClient('/api/v1', {
 *     getToken: () => localStorage.getItem('token'),
 *   });
 *
 *   const items = await api.get<Item[]>('/items', { state: 'pending' });
 *   await api.post('/items/123/transition', { state: 'approved' });
 * </script>
 */

export interface ApiClientOptions {
	baseUrl: string;
	getToken?: () => string | null;
	onError?: (error: Error, path: string) => void;
	onUnauthorized?: () => void;
	timeout?: number;
}

export function createApiClient<
	TBase extends Record<string, (...args: never[]) => Promise<unknown>> = Record<string, never>,
>(options: ApiClientOptions, domainApis?: TBase) {
	const { baseUrl, getToken, onError, onUnauthorized } = options;
	const timeoutMs = options.timeout ?? 30_000;

	async function request<T>(path: string, method: string = "GET", body?: unknown): Promise<T> {
		const headers = new Headers();
		const token = getToken?.();
		if (token) headers.set("Authorization", `Bearer ${token}`);
		if (body && !(body instanceof FormData)) {
			headers.set("Content-Type", "application/json");
		}

		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), timeoutMs);

		try {
			const response = await fetch(`${baseUrl}${path}`, {
				method,
				headers,
				credentials: "same-origin",
				body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
				signal: controller.signal,
			});

			if (response.status === 401) {
				onUnauthorized?.();
				throw new Error(`Unauthorized: ${method} ${path}`);
			}

			if (!response.ok) {
				const errorData = await response
					.json()
					.catch(() => ({ message: `HTTP ${response.status}` }));
				const error = new Error(errorData.message || errorData.code || `HTTP ${response.status}`);
				onError?.(error, path);
				throw error;
			}

			if (response.status === 204) return {} as T;
			return response.json();
		} finally {
			clearTimeout(timer);
		}
	}

	const client = {
		get<T>(path: string, params?: Record<string, string>): Promise<T> {
			const qs = params ? `?${new URLSearchParams(params).toString()}` : "";
			return request<T>(`${path}${qs}`, "GET");
		},
		post<T>(path: string, body?: unknown): Promise<T> {
			return request<T>(path, "POST", body);
		},
		put<T>(path: string, body?: unknown): Promise<T> {
			return request<T>(path, "PUT", body);
		},
		patch<T>(path: string, body?: unknown): Promise<T> {
			return request<T>(path, "PATCH", body);
		},
		delete<T>(path: string): Promise<T> {
			return request<T>(path, "DELETE");
		},
		upload<T>(path: string, file: File, extraData?: Record<string, string>): Promise<T> {
			const formData = new FormData();
			formData.append("file", file);
			if (extraData) {
				for (const [k, v] of Object.entries(extraData)) formData.append(k, v);
			}
			return request<T>(path, "POST", formData);
		},
	};

	return Object.assign(client, domainApis || {});
}
