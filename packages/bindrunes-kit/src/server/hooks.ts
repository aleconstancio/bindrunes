import type { Handle } from "@sveltejs/kit";
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
