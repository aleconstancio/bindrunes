interface CreateApiClientOptions {
	baseUrl?: string;
	headers?: Record<string, string>;
	csrf?: boolean;
	csrfCookieName?: string;
	csrfHeaderName?: string;
	onUnauthorized?: () => void;
	onError?: (error: ApiError) => void;
}

interface ApiError {
	status: number;
	message: string;
	data?: unknown;
}

interface RequestOptions extends Omit<RequestInit, "method" | "body"> {
	params?: Record<string, string | number | boolean | undefined>;
	json?: unknown;
	formData?: FormData;
}

function getCookie(name: string): string | null {
	if (typeof document === "undefined") return null;
	const match = document.cookie.match(new RegExp(`${name}=([^;]+)`));
	return match ? decodeURIComponent(match[1]) : null;
}

export function createApiClient(options: CreateApiClientOptions = {}) {
	const {
		baseUrl = "",
		headers = {},
		csrf = false,
		csrfCookieName = "csrf-token",
		csrfHeaderName = "X-CSRF-Token",
		onUnauthorized,
		onError,
	} = options;

	async function request<T>(
		method: string,
		path: string,
		options: RequestOptions = {},
	): Promise<T> {
		const { params, json, formData, ...fetchOptions } = options;

		let url = `${baseUrl}${path}`;
		if (params) {
			const searchParams = new URLSearchParams();
			for (const [key, value] of Object.entries(params)) {
				if (value !== undefined && value !== null) {
					searchParams.set(key, String(value));
				}
			}
			const qs = searchParams.toString();
			if (qs) url += `?${qs}`;
		}

		const requestHeaders: Record<string, string> = { ...headers };

		if (json) {
			requestHeaders["Content-Type"] = "application/json";
		}

		if (csrf) {
			const token = getCookie(csrfCookieName);
			if (token) {
				requestHeaders[csrfHeaderName] = token;
			}
		}

		if (fetchOptions.headers) {
			Object.assign(requestHeaders, fetchOptions.headers);
		}

		try {
			const response = await fetch(url, {
				...fetchOptions,
				method,
				headers: requestHeaders,
				body: json ? JSON.stringify(json) : formData,
			});

			if (response.status === 401) {
				onUnauthorized?.();
				throw { status: 401, message: "Unauthorized" } as ApiError;
			}

			if (!response.ok) {
				let errorData: unknown;
				try {
					errorData = await response.json();
				} catch {
					// Response body isn't JSON
				}

				const error: ApiError = {
					status: response.status,
					message: (errorData as { message?: string })?.message ?? response.statusText,
					data: errorData,
				};

				onError?.(error);
				throw error;
			}

			const contentType = response.headers.get("content-type");
			if (!contentType?.includes("application/json")) {
				return undefined as T;
			}

			const text = await response.text();
			return text ? JSON.parse(text) : (undefined as T);
		} catch (error) {
			if ((error as ApiError).status) throw error;
			const apiError: ApiError = {
				status: 0,
				message: error instanceof Error ? error.message : "Network error",
			};
			onError?.(apiError);
			throw apiError;
		}
	}

	return {
		get: <T>(path: string, options?: RequestOptions) => request<T>("GET", path, options),
		post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
			request<T>("POST", path, { ...options, json: body }),
		put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
			request<T>("PUT", path, { ...options, json: body }),
		patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
			request<T>("PATCH", path, { ...options, json: body }),
		delete: <T>(path: string, options?: RequestOptions) => request<T>("DELETE", path, options),
		upload: <T>(path: string, formData: FormData, options?: RequestOptions) =>
			request<T>("POST", path, { ...options, formData }),
	};
}
