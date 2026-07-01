export { createServerApiClient } from "./api";
export { createErrorResponse, createJsonResponse, createTypedHandler } from "./apiHandler";
export type { OAuthProfile, OAuthProvider, SessionData } from "./auth";
export {
	clearSessionCookie,
	createOAuthHandler,
	createServerAuth,
	refreshToken,
	setSessionCookie,
	validateSession,
} from "./auth";
export type { MagicLinkOptions, MagicLinkToken } from "./auth-magic-link";
export { createMagicLinkAuth } from "./auth-magic-link";
export type {
	PasskeyAuthenticationOptions,
	PasskeyCredential,
	PasskeyOptions,
	PasskeyRegistrationOptions,
} from "./auth-passkey";
export { createPasskeyAuth } from "./auth-passkey";
export { createCrudRouter, defineSchema, field } from "./db";
export { createDrizzleAdapter } from "./db-drizzle";
export { createPrismaAdapter } from "./db-prisma";
export type { LogEntry } from "./hooks";
export {
	combineHooks,
	createAuthGuard,
	createCorsHook,
	createCsrfGuard,
	createLocaleRedirect,
	createLogger,
	createRateLimit,
	createSecurityHeaders,
} from "./hooks";
export { createServerI18n } from "./i18n";
