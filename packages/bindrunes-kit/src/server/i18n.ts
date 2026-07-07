import type { Handle, RequestEvent } from "@sveltejs/kit";

interface CreateServerI18nOptions {
	locales: string[];
	defaultLocale: string;
	strategy?: "path" | "cookie" | "header";
}

export function createServerI18n(options: CreateServerI18nOptions) {
	const { locales, defaultLocale, strategy = "path" } = options;

	function detectLocale(event: RequestEvent): string {
		if (strategy === "path") {
			const match = event.url.pathname.match(/^\/([a-z]{2}(?:-[A-Z]{2})?)\//);
			return match?.[1] && locales.includes(match[1]) ? match[1] : defaultLocale;
		}

		if (strategy === "cookie") {
			const cookie = event.cookies.get("locale");
			return cookie && locales.includes(cookie) ? cookie : defaultLocale;
		}

		const acceptLanguage = event.request.headers.get("accept-language");
		if (acceptLanguage) {
			const preferred = acceptLanguage.split(",")[0]?.split("-")[0];
			if (preferred && locales.includes(preferred)) return preferred;
		}

		return defaultLocale;
	}

	function getPathLocale(pathname: string): string | null {
		const match = pathname.match(/^\/([a-z]{2}(?:-[A-Z]{2})?)\//);
		return match?.[1] && locales.includes(match[1]) ? match[1] : null;
	}

	const handle: Handle = async ({ event, resolve }) => {
		event.locals.locale = detectLocale(event);
		event.locals.pathLocale = getPathLocale(event.url.pathname);
		return resolve(event);
	};

	return { detectLocale, getPathLocale, handle };
}

declare global {
	namespace App {
		interface Locals {
			locale: string;
			pathLocale: string | null;
		}
	}
}
