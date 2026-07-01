import type { RequestEvent } from "@sveltejs/kit";
import type { SessionData } from "./auth";

export interface PasskeyOptions {
	rpName: string;
	rpId?: string;
	origin: string;
	sessionCookieName?: string;
	maxAge?: number;
}

export interface PasskeyCredential {
	id: string;
	publicKey: Uint8Array;
	counter: number;
	userId: string;
}

export interface PasskeyRegistrationOptions {
	userId: string;
	email: string;
	name?: string;
}

export interface PasskeyAuthenticationOptions {
	credentialId: string;
}

export function createPasskeyAuth(options: PasskeyOptions) {
	const {
		rpName,
		rpId = "localhost",
		origin,
		sessionCookieName = "bindrunes-passkey",
		maxAge = 60 * 60 * 24 * 7,
	} = options;

	return {
		rpName,
		rpId,
		origin,

		/**
		 * Generate registration options for a new passkey.
		 * Send the returned options to the client's navigator.credentials.create().
		 */
		async generateRegistrationOptions(registration: PasskeyRegistrationOptions): Promise<object> {
			return {
				rp: { name: rpName, id: rpId },
				user: {
					id: new TextEncoder().encode(registration.userId),
					name: registration.email,
					displayName: registration.name ?? registration.email,
				},
				challenge: crypto.getRandomValues(new Uint8Array(32)),
				pubKeyCredParams: [
					{ type: "public-key", alg: -7 }, // ES256
					{ type: "public-key", alg: -257 }, // RS256
				],
				timeout: 60000,
				attestation: "none",
			};
		},

		/**
		 * Verify a registration response from the client.
		 * Store the credential in your database.
		 */
		async verifyRegistration(
			_response: object,
			_expectedChallenge: Uint8Array,
		): Promise<{ verified: boolean; credential?: PasskeyCredential }> {
			// In production, implement full WebAuthn verification
			// This is a stub that consumers extend with their verification logic
			return { verified: true };
		},

		/**
		 * Generate authentication options for an existing passkey.
		 * Send the returned options to the client's navigator.credentials.get().
		 */
		async generateAuthenticationOptions(credentialIds: string[]): Promise<object> {
			return {
				challenge: crypto.getRandomValues(new Uint8Array(32)),
				allowCredentials: credentialIds.map((id) => ({
					id,
					type: "public-key",
					transports: ["internal"],
				})),
				timeout: 60000,
				rpId,
			};
		},

		/**
		 * Verify an authentication response from the client.
		 * Returns a session that can be set via setSessionCookie.
		 */
		async verifyAuthentication(
			_response: object,
			_credential: PasskeyCredential,
			_expectedChallenge: Uint8Array,
		): Promise<SessionData | null> {
			// In production, implement full WebAuthn verification
			// This is a stub that consumers extend with their verification logic
			return null;
		},

		/**
		 * Create a SvelteKit handle for passkey auth.
		 */
		createHandle(): import("@sveltejs/kit").Handle {
			return async ({ event, resolve }) => {
				const token = event.cookies.get(sessionCookieName);
				if (token) {
					try {
						event.locals.session = JSON.parse(token) as SessionData;
					} catch {
						event.locals.session = null;
					}
				}
				return resolve(event);
			};
		},
	};
}
