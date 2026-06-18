export type AuthView =
	| "login"
	| "register"
	| "forgot-password"
	| "reset-password"
	| "verify-email"
	| "two-factor";

export interface AuthPageConfig {
	view?: AuthView;
	brandImage?: string;
	brandTitle?: string;
	brandDescription?: string;
}
