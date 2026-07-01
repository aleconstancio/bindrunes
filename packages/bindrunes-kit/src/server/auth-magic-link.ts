import type { RequestEvent } from "@sveltejs/kit";
import type { SessionData } from "./auth";

export interface MagicLinkOptions {
	secret?: string;
	expiresIn?: number;
	cookieName?: string;
	maxAge?: number;
	issuer?: string;
}

export interface MagicLinkToken {
	email: string;
	expiresAt: number;
	issuer: string;
}

export function createMagicLinkAuth(options?: MagicLinkOptions) {
	const {
		secret = "bindrunes-magic-link",
		expiresIn = 15 * 60 * 1000, // 15 minutes
		cookieName = "bindrunes-magic",
		maxAge = 60 * 60 * 24 * 7,
		issuer = "bindrunes",
	} = options ?? {};

	function generateToken(email: string): string {
		const payload: MagicLinkToken = {
			email,
			expiresAt: Date.now() + expiresIn,
			issuer,
		};
		// In production, use HMAC signing with the secret
		return btoa(JSON.stringify(payload));
	}

	function verifyToken(token: string): MagicLinkToken | null {
		try {
			const payload = JSON.parse(atob(token)) as MagicLinkToken;
			if (payload.expiresAt < Date.now()) return null;
			if (payload.issuer !== issuer) return null;
			return payload;
		} catch {
			return null;
		}
	}

	return {
		/**
		 * Generate a magic link token for the given email.
		 * Send this link to the user's email.
		 */
		generateLink(email: string, baseUrl: string): string {
			const token = generateToken(email);
			const url = new URL("/auth/magic/verify", baseUrl);
			url.searchParams.set("token", token);
			return url.toString();
		},

		/**
		 * Verify a magic link token from the URL.
		 * Returns a session if valid, null otherwise.
		 */
		async verifyLink(
			token: string,
			findOrCreateUser: (email: string) => Promise<SessionData | null>,
		): Promise<SessionData | null> {
			const payload = verifyToken(token);
			if (!payload) return null;
			return findOrCreateUser(payload.email);
		},

		/**
		 * Create a SvelteKit handle for magic link auth.
		 */
		createHandle(): import("@sveltejs/kit").Handle {
			return async ({ event, resolve }) => {
				const token = event.cookies.get(cookieName);
				if (token) {
					const payload = verifyToken(token);
					if (payload) {
						event.locals.session = {
							user: { id: payload.email, email: payload.email },
							expiresAt: payload.expiresAt,
						};
					} else {
						event.locals.session = null;
					}
				}
				return resolve(event);
			};
		},

		/**
		 * Set the magic link session cookie.
		 */
		setSession(event: RequestEvent, session: SessionData) {
			event.cookies.set(cookieName, JSON.stringify(session), {
				path: "/",
				httpOnly: true,
				secure: true,
				sameSite: "lax",
				maxAge,
			});
		},

		/**
		 * Clear the magic link session cookie.
		 */
		clearSession(event: RequestEvent) {
			event.cookies.delete(cookieName, { path: "/", maxAge: 0 });
		},
	};
}
