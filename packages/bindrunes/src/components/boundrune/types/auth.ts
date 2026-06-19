export type AuthView =
	| "login"
	| "register"
	| "forgot-password"
	| "reset-password"
	| "verify-email"
	| "two-factor";

export interface SocialLoginConfig {
	onGoogle?: () => void;
	onGitHub?: () => void;
	onApple?: () => void;
	providers?: ("google" | "github" | "apple")[];
}

export interface AuthPageConfig {
	view?: AuthView;
	brandImage?: string;
	brandTitle?: string;
	brandDescription?: string;
}
