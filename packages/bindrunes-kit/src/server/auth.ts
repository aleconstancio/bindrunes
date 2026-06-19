import type { Handle, RequestEvent } from "@sveltejs/kit";

export interface SessionData {
	user: { id: string; email: string; name?: string; roles?: string[] };
	expiresAt: number;
}

interface CreateServerAuthOptions {
	cookieName?: string;
	maxAge?: number;
	validate: (token: string) => Promise<SessionData | null>;
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

declare global {
	namespace App {
		interface Locals {
			session: SessionData | null;
		}
	}
}
