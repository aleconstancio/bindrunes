import { array, object, optional, safeParse, string } from "valibot";

export interface User {
	id: string;
	email: string;
	name?: string;
	avatar?: string;
	roles?: string[];
	permissions?: string[];
}

export interface Tenant {
	id: string;
	name?: string;
}

export interface CreateClientAuthOptions {
	fetchProfile?: () => Promise<User | null>;
	login?: (email: string, password: string) => Promise<{ token?: string; user?: User }>;
	logout?: () => Promise<void>;
	refresh?: () => Promise<{ token?: string }>;
	onUnauthorized?: () => void;
	onLogin?: (user: User) => void;
	onLogout?: () => void;
	tokenStorage?: "cookie" | "localStorage";
	tokenKey?: string;
}

const userSchema = object({
	id: string(),
	email: string(),
	name: optional(string()),
	avatar: optional(string()),
	roles: optional(array(string())),
	permissions: optional(array(string())),
});

/**
 * Reactive client-side auth composable for Svelte 5.
 *
 * Usage:
 * ```svelte
 * <script>
 *   import { createClientAuth } from 'bindrunes-kit/client';
 *   const auth = createClientAuth({
 *     fetchProfile: async () => { /* fetch user from API *\/ },
 *     login: async (email, password) => { /* call login API *\/ },
 *   });
 * </script>
 *
 * {#if auth.loading}
 *   <Spinner />
 * {:else if auth.isAuthenticated}
 *   <Dashboard user={auth.user} />
 * {:else}
 *   <LoginForm onsubmit={auth.login} />
 * {/if}
 * ```
 */
export function createClientAuth(options: CreateClientAuthOptions = {}) {
	const {
		fetchProfile,
		login: loginFn,
		logout: logoutFn,
		refresh: refreshFn,
		onUnauthorized,
		onLogin,
		onLogout,
		tokenStorage = "cookie",
		tokenKey = "bindrunes-session",
	} = options;

	let user = $state<User | null>(null);
	let tenant = $state<Tenant | null>(null);
	let loading = $state(true);
	let error = $state<string | null>(null);
	let token = $state<string | null>(null);

	const isAuthenticated = $derived(user !== null);

	function getToken(): string | null {
		if (typeof document === "undefined") return null;
		if (tokenStorage === "localStorage") {
			return localStorage.getItem(tokenKey);
		}
		const match = document.cookie.match(new RegExp(`${tokenKey}=([^;]+)`));
		return match ? match[1] : null;
	}

	function setToken(value: string) {
		if (typeof document === "undefined") return;
		token = value;
		if (tokenStorage === "localStorage") {
			localStorage.setItem(tokenKey, value);
		} else {
			// biome-ignore lint/suspicious/noDocumentCookie: cookie-based token storage is a core feature
			document.cookie = `${tokenKey}=${value}; path=/; SameSite=Lax`;
		}
	}

	function clearToken() {
		if (typeof document === "undefined") return;
		token = null;
		if (tokenStorage === "localStorage") {
			localStorage.removeItem(tokenKey);
		} else {
			// biome-ignore lint/suspicious/noDocumentCookie: cookie-based token storage is a core feature
			document.cookie = `${tokenKey}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
		}
	}

	function parseUser(data: unknown): User | null {
		const { success, output } = safeParse(userSchema, data);
		return success ? (output as User) : null;
	}

	async function bootstrap() {
		if (typeof window === "undefined") {
			loading = false;
			return;
		}

		if (!fetchProfile) {
			loading = false;
			return;
		}

		const storedToken = getToken();
		if (!storedToken) {
			loading = false;
			return;
		}

		token = storedToken;

		try {
			const profile = await fetchProfile();
			const parsed = profile ? parseUser(profile) : null;
			if (parsed) {
				user = parsed;
				onLogin?.(parsed);
			} else {
				clearToken();
			}
		} catch (err) {
			error = err instanceof Error ? err.message : "Failed to load profile";
			clearToken();
		} finally {
			loading = false;
		}
	}

	async function login(email: string, password: string) {
		if (!loginFn) throw new Error("login function not provided");

		loading = true;
		error = null;

		try {
			const result = await loginFn(email, password);

			if (result.token) {
				setToken(result.token);
			}

			if (result.user) {
				const parsed = parseUser(result.user);
				if (parsed) {
					user = parsed;
					onLogin?.(parsed);
				}
			} else if (fetchProfile) {
				const profile = await fetchProfile();
				const parsed = profile ? parseUser(profile) : null;
				if (parsed) {
					user = parsed;
					onLogin?.(parsed);
				}
			}

			return result;
		} catch (err) {
			error = err instanceof Error ? err.message : "Login failed";
			throw err;
		} finally {
			loading = false;
		}
	}

	async function logout() {
		try {
			await logoutFn?.();
		} finally {
			user = null;
			tenant = null;
			clearToken();
			onLogout?.();
		}
	}

	async function refresh() {
		if (!refreshFn) return;

		try {
			const result = await refreshFn();
			if (result.token) {
				setToken(result.token);
			}
		} catch {
			await logout();
			onUnauthorized?.();
		}
	}

	function setUser(newUser: User | null) {
		user = newUser;
	}

	function setTenant(newTenant: Tenant | null) {
		tenant = newTenant;
	}

	bootstrap();

	return {
		get user() {
			return user;
		},
		get tenant() {
			return tenant;
		},
		get isAuthenticated() {
			return isAuthenticated;
		},
		get loading() {
			return loading;
		},
		get error() {
			return error;
		},
		get token() {
			return token;
		},
		login,
		logout,
		refresh,
		setUser,
		setTenant,
		setToken,
		clearToken,
	};
}
