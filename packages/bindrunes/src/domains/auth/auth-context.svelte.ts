import { AUTH_CONTEXT_KEY } from "../../../utils/auth-keys";
import { createMetaContext, useMetaContext } from "../../../utils/createMetaContext.svelte";
import { toError } from "../../../utils/toError";

export interface AuthUser {
	id: string | number;
	email: string;
	name?: string;
	avatar?: string;
	roles?: string[];
	[key: string]: unknown;
}

export interface AuthProviderState {
	user: AuthUser | null;
	isAuthenticated: boolean;
	loading: boolean;
	error: string | null;

	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	setUser: (user: AuthUser | null) => void;
	setLoading: (loading: boolean) => void;
	setError: (error: string | null) => void;
}

export function createAuthProvider(options?: {
	onLogin?: (email: string, password: string) => Promise<AuthUser>;
	onLogout?: () => void;
	initialUser?: AuthUser | null;
}): AuthProviderState {
	let user = $state<AuthUser | null>(options?.initialUser ?? null);
	let loading = $state(false);
	let error = $state<string | null>(null);

	const state: AuthProviderState = {
		get user() {
			return user;
		},
		get isAuthenticated() {
			return user !== null;
		},
		get loading() {
			return loading;
		},
		get error() {
			return error;
		},

		async login(email: string, password: string) {
			loading = true;
			error = null;
			try {
				if (options?.onLogin) {
					user = await options.onLogin(email, password);
				}
			} catch (err) {
				error = toError(err).message || "Login failed";
				throw err;
			} finally {
				loading = false;
			}
		},
		logout() {
			user = null;
			options?.onLogout?.();
		},
		setUser(u: AuthUser | null) {
			user = u;
		},
		setLoading(v: boolean) {
			loading = v;
		},
		setError(e: string | null) {
			error = e;
		},
	};

	return createMetaContext(AUTH_CONTEXT_KEY, () => state);
}

export function useAuth(): AuthProviderState {
	return useMetaContext<AuthProviderState>(AUTH_CONTEXT_KEY);
}
