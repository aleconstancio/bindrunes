import type { Handle, RequestEvent } from "@sveltejs/kit";

export interface SessionData {
	user: { id: string; email: string; name?: string; roles?: string[] };
	expiresAt: number;
}

export interface OAuthProfile {
	id: string;
	email: string;
	name?: string;
	avatar?: string;
	provider: string;
}

export type OAuthProvider = "google" | "github" | "discord" | "microsoft";

interface CreateServerAuthOptions {
	cookieName?: string;
	maxAge?: number;
	validate: (token: string) => Promise<SessionData | null>;
	refresh?: (token: string) => Promise<{ token: string; session: SessionData } | null>;
}

export function createServerAuth(options: CreateServerAuthOptions) {
	const { cookieName = "bindrunes-session", maxAge = 60 * 60 * 24 * 7, validate } = options;

	async function getSession(event: RequestEvent): Promise<SessionData | null> {
		const token = event.cookies.get(cookieName);
		if (!token) return null;
		try {
			return await validate(token);
		} catch {
			return null;
		}
	}

	function setSession(event: RequestEvent, data: SessionData) {
		event.cookies.set(cookieName, JSON.stringify(data), {
			path: "/",
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			maxAge,
		});
	}

	function deleteSession(event: RequestEvent) {
		event.cookies.delete(cookieName, { path: "/", maxAge: 0 });
	}

	const handle: Handle = async ({ event, resolve }) => {
		event.locals.session = await getSession(event);
		return resolve(event);
	};

	return { getSession, setSession, deleteSession, handle };
}

export function validateSession(
	token: string,
	validate: (token: string) => Promise<SessionData | null>,
): Promise<SessionData | null> {
	return validate(token);
}

export async function refreshToken(
	token: string,
	refreshFn: (token: string) => Promise<{ token: string; session: SessionData } | null>,
): Promise<{ token: string; session: SessionData } | null> {
	try {
		return await refreshFn(token);
	} catch {
		return null;
	}
}

export function setSessionCookie(
	event: RequestEvent,
	session: SessionData,
	options?: { cookieName?: string; maxAge?: number },
) {
	const { cookieName = "bindrunes-session", maxAge = 60 * 60 * 24 * 7 } = options ?? {};
	event.cookies.set(cookieName, JSON.stringify(session), {
		path: "/",
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		maxAge,
	});
}

export function clearSessionCookie(event: RequestEvent, cookieName = "bindrunes-session") {
	event.cookies.delete(cookieName, { path: "/", maxAge: 0 });
}

export function createOAuthHandler(
	provider: OAuthProvider,
	options: {
		authorize: (code: string) => Promise<{ token: string; profile: OAuthProfile } | null>;
		callbackUrl?: string;
	},
) {
	const { authorize, callbackUrl = "/auth/callback" } = options;

	return {
		provider,
		callbackUrl,

		async handleCallback(
			code: string,
			_state?: string,
		): Promise<{ token: string; profile: OAuthProfile } | null> {
			try {
				const result = await authorize(code);
				return result;
			} catch {
				return null;
			}
		},

		getAuthorizationUrl(state?: string): string {
			const params = new URLSearchParams({ provider, redirect_uri: callbackUrl });
			if (state) params.set("state", state);
			return `/auth/authorize?${params.toString()}`;
		},
	};
}

declare global {
	namespace App {
		interface Locals {
			session: SessionData | null;
		}
	}
}
