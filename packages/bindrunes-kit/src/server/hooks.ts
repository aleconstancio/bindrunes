import type { Handle, RequestEvent } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

export function combineHooks(...hooks: Handle[]): Handle {
	return sequence(...hooks);
}

export function createAuthGuard(options?: {
	requireAuth?: boolean;
	loginPath?: string;
	appPath?: string;
}): Handle {
	const { requireAuth = true, loginPath = "/login", appPath = "/app" } = options ?? {};

	return async ({ event, resolve }) => {
		const session = event.locals.session;
		const isAuthRoute =
			event.url.pathname.startsWith(loginPath) ||
			event.url.pathname.startsWith("/register") ||
			event.url.pathname.startsWith("/forgot-password");

		if (requireAuth && !session && !isAuthRoute) {
			return new Response(null, {
				status: 302,
				headers: { Location: `${loginPath}?redirect=${event.url.pathname}` },
			});
		}

		if (session && isAuthRoute) {
			return new Response(null, {
				status: 302,
				headers: { Location: appPath },
			});
		}

		return resolve(event);
	};
}

export function createCsrfGuard(allowedOrigins: string[]): Handle {
	return async ({ event, resolve }) => {
		if (event.request.method === "GET") return resolve(event);

		const origin = event.request.headers.get("origin");
		if (origin && !allowedOrigins.includes(origin)) {
			return new Response("CSRF validation failed", { status: 403 });
		}

		return resolve(event);
	};
}

export function createLocaleRedirect(defaultLocale = "en"): Handle {
	return async ({ event, resolve }) => {
		const pathname = event.url.pathname;
		const hasLocale = /^\/[a-z]{2}(-[A-Z]{2})?\/?/.test(pathname);

		if (!hasLocale && !pathname.startsWith("/api") && !pathname.includes(".")) {
			return new Response(null, {
				status: 302,
				headers: { Location: `/${defaultLocale}${pathname}` },
			});
		}

		return resolve(event);
	};
}

export function createRateLimit(options?: {
	windowMs?: number;
	max?: number;
	keyGenerator?: (event: RequestEvent) => string;
	message?: string;
}): Handle {
	const {
		windowMs = 60_000,
		max = 100,
		keyGenerator,
		message = "Too many requests",
	} = options ?? {};

	const hits = new Map<string, { count: number; resetAt: number }>();

	const defaultKeyGenerator = (event: RequestEvent) => {
		return event.getClientAddress();
	};

	const getKey = keyGenerator ?? defaultKeyGenerator;

	return async ({ event, resolve }) => {
		const key = getKey(event);
		const now = Date.now();
		const entry = hits.get(key);

		if (entry) {
			if (now > entry.resetAt) {
				entry.count = 1;
				entry.resetAt = now + windowMs;
			} else if (entry.count >= max) {
				const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
				return new Response(JSON.stringify({ error: message, retryAfter }), {
					status: 429,
					headers: {
						"Content-Type": "application/json",
						"Retry-After": String(retryAfter),
					},
				});
			} else {
				entry.count++;
			}
		} else {
			hits.set(key, { count: 1, resetAt: now + windowMs });
		}

		return resolve(event);
	};
}

export function createCorsHook(options?: {
	origin?: string | string[];
	methods?: string[];
	allowedHeaders?: string[];
	exposedHeaders?: string[];
	credentials?: boolean;
	maxAge?: number;
}): Handle {
	const {
		origin = "*",
		methods = ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
		allowedHeaders = ["Content-Type", "Authorization"],
		exposedHeaders = [],
		credentials = false,
		maxAge = 86400,
	} = options ?? {};

	return async ({ event, resolve }) => {
		const requestOrigin = event.request.headers.get("origin");
		const allowed = Array.isArray(origin) ? origin : [origin];

		const allowOrigin =
			origin === "*" && !credentials
				? "*"
				: requestOrigin && allowed.includes(requestOrigin)
					? requestOrigin
					: null;

		const headers: Record<string, string> = {
			"Access-Control-Allow-Methods": methods.join(", "),
			"Access-Control-Allow-Headers": allowedHeaders.join(", "),
			"Access-Control-Max-Age": String(maxAge),
		};

		if (allowOrigin) {
			headers["Access-Control-Allow-Origin"] = allowOrigin;
		}

		if (credentials) {
			headers["Access-Control-Allow-Credentials"] = "true";
		}

		if (exposedHeaders.length) {
			headers["Access-Control-Expose-Headers"] = exposedHeaders.join(", ");
		}

		if (event.request.method === "OPTIONS") {
			return new Response(null, { status: 204, headers });
		}

		const response = await resolve(event);

		const responseHeaders = new Headers(response.headers);
		for (const [key, value] of Object.entries(headers)) {
			responseHeaders.set(key, value);
		}

		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: responseHeaders,
		});
	};
}

export function createSecurityHeaders(options?: {
	contentSecurityPolicy?: string;
	contentTypeOptions?: boolean;
	frameOptions?: string | null;
	referrerPolicy?: string;
	strictTransportSecurity?: string;
	xssProtection?: boolean;
	permissionsPolicy?: Record<string, string>;
}): Handle {
	const {
		contentSecurityPolicy = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';",
		contentTypeOptions = true,
		frameOptions = "SAMEORIGIN",
		referrerPolicy = "strict-origin-when-cross-origin",
		strictTransportSecurity = "max-age=31536000; includeSubDomains",
		xssProtection = true,
		permissionsPolicy = {},
	} = options ?? {};

	return async ({ event, resolve }) => {
		const response = await resolve(event);

		const headers = new Headers(response.headers);

		if (contentSecurityPolicy) {
			headers.set("Content-Security-Policy", contentSecurityPolicy);
		}

		if (contentTypeOptions) {
			headers.set("X-Content-Type-Options", "nosniff");
		}

		if (frameOptions) {
			headers.set("X-Frame-Options", frameOptions);
		}

		if (referrerPolicy) {
			headers.set("Referrer-Policy", referrerPolicy);
		}

		if (strictTransportSecurity) {
			headers.set("Strict-Transport-Security", strictTransportSecurity);
		}

		if (xssProtection) {
			headers.set("X-XSS-Protection", "1; mode=block");
		}

		if (Object.keys(permissionsPolicy).length) {
			const policy = Object.entries(permissionsPolicy)
				.map(([feature, value]) => `${feature}=${value}`)
				.join(", ");
			headers.set("Permissions-Policy", policy);
		}

		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers,
		});
	};
}

export function createLogger(options?: {
	logMethod?: (entry: LogEntry) => void;
	ignorePaths?: string[];
}): Handle {
	const {
		logMethod = (entry: LogEntry) =>
			console.log(
				`[${entry.timestamp}] ${entry.method} ${entry.url} ${entry.status} ${entry.duration}ms`,
			),
		ignorePaths = [],
	} = options ?? {};

	const shouldIgnore = (pathname: string) => ignorePaths.some((p) => pathname.startsWith(p));

	const startMap = new WeakMap<RequestEvent, number>();

	return async ({ event, resolve }) => {
		startMap.set(event, Date.now());
		const response = await resolve(event);
		const start = startMap.get(event);
		if (!shouldIgnore(event.url.pathname) && start) {
			logMethod({
				timestamp: new Date().toISOString(),
				method: event.request.method,
				url: event.url.pathname,
				status: response.status,
				duration: Date.now() - start,
				origin: event.request.headers.get("origin"),
				userAgent: event.request.headers.get("user-agent"),
			});
		}
		return response;
	};
}

export type LogEntry = {
	timestamp: string;
	method: string;
	url: string;
	status: number;
	duration: number;
	origin: string | null;
	userAgent: string | null;
};
