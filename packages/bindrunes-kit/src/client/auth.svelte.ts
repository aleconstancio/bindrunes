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

export interface OAuthProvider {
	/** OAuth provider name (e.g. "google", "github") */
	name: string;
	/** OAuth authorize endpoint URL */
	authorizeUrl: string;
	/** OAuth client ID */
	clientId: string;
	/** Optional scopes to request */
	scopes?: string[];
	/** Optional state parameter for CSRF protection */
	state?: string;
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
	/** Map of OAuth provider names to their configuration */
	oauthProviders?: Record<string, OAuthProvider>;
	/** Base URL of the OAuth callback endpoint (default: current origin + "/auth/callback") */
	oauthCallbackUrl?: string;
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
		oauthProviders = {},
		oauthCallbackUrl,
	} = options;

	let user = $state<User | null>(null);
	let tenant = $state<Tenant | null>(null);
	let loading = $state(true);
	let error = $state<string | null>(null);
	let token = $state<string | null>(null);
	let sessionEnabled = $state(true);
	let sessionTimeoutMs = $state(0);
	let sessionTimeoutTimer = $state<ReturnType<typeof setTimeout> | null>(null);
	let sessionTimeoutCallback = $state<(() => void) | null>(null);

	const isAuthenticated = $derived(user !== null);

	function getToken(): string | null {
		if (typeof document === "undefined") return null;
		if (!sessionEnabled) return null;
		if (tokenStorage === "localStorage") {
			return localStorage.getItem(tokenKey);
		}
		const match = document.cookie.match(new RegExp(`${tokenKey}=([^;]+)`));
		return match ? match[1] : null;
	}

	function setToken(value: string) {
		if (typeof document === "undefined") return;
		token = value;
		if (!sessionEnabled) return;
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

	function resetSessionTimeout() {
		if (sessionTimeoutTimer) {
			clearTimeout(sessionTimeoutTimer);
			sessionTimeoutTimer = null;
		}
		if (sessionTimeoutMs > 0 && user) {
			sessionTimeoutTimer = setTimeout(() => {
				sessionTimeoutCallback?.();
				logout();
			}, sessionTimeoutMs);
		}
	}

	function bootstrap() {
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

		fetchProfile()
			.then((profile) => {
				const parsed = profile ? parseUser(profile) : null;
				if (parsed) {
					user = parsed;
					onLogin?.(parsed);
					resetSessionTimeout();
				} else {
					clearToken();
				}
			})
			.catch((err) => {
				error = err instanceof Error ? err.message : "Failed to load profile";
				clearToken();
			})
			.finally(() => {
				loading = false;
			});
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
					resetSessionTimeout();
				}
			} else if (fetchProfile) {
				const profile = await fetchProfile();
				const parsed = profile ? parseUser(profile) : null;
				if (parsed) {
					user = parsed;
					onLogin?.(parsed);
					resetSessionTimeout();
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

	function loginWithOAuth(provider: string, redirectUrl?: string) {
		const config = oauthProviders[provider];
		if (!config) {
			throw new Error(`OAuth provider "${provider}" not configured`);
		}

		if (typeof window === "undefined") return;

		const callbackUrl =
			redirectUrl || oauthCallbackUrl || `${window.location.origin}/auth/callback`;
		const state = config.state || crypto.randomUUID();

		const params = new URLSearchParams({
			client_id: config.clientId,
			redirect_uri: callbackUrl,
			response_type: "code",
			state,
		});

		if (config.scopes && config.scopes.length > 0) {
			params.set("scope", config.scopes.join(" "));
		}

		// Persist state for CSRF validation on callback
		if (tokenStorage === "localStorage") {
			localStorage.setItem(`${tokenKey}-oauth-state`, state);
		} else {
			// biome-ignore lint/suspicious/noDocumentCookie: CSRF state is required for OAuth security
			document.cookie = `${tokenKey}-oauth-state=${state}; path=/; SameSite=Lax`;
		}

		window.location.href = `${config.authorizeUrl}?${params.toString()}`;
	}

	function persistSession(enabled: boolean) {
		sessionEnabled = enabled;
		if (!enabled) {
			clearToken();
		}
	}

	function onSessionTimeout(callback: () => void) {
		sessionTimeoutCallback = callback;
	}

	function setSessionTimeout(ms: number) {
		sessionTimeoutMs = ms;
		if (ms > 0 && user) {
			resetSessionTimeout();
		} else if (sessionTimeoutTimer) {
			clearTimeout(sessionTimeoutTimer);
			sessionTimeoutTimer = null;
		}
	}

	async function logout() {
		if (sessionTimeoutTimer) {
			clearTimeout(sessionTimeoutTimer);
			sessionTimeoutTimer = null;
		}
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
				resetSessionTimeout();
			}
		} catch {
			await logout();
			onUnauthorized?.();
		}
	}

	/**
	 * Wraps a fetch call with automatic token refresh on 401 responses.
	 */
	async function fetchWithAuth(url: string, init?: RequestInit): Promise<Response> {
		const doFetch = async (withToken: boolean) => {
			const headers = new Headers(init?.headers);
			if (withToken && token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return fetch(url, { ...init, headers });
		};

		let response = await doFetch(true);

		if (response.status === 401 && refreshFn) {
			try {
				const result = await refreshFn();
				if (result.token) {
					setToken(result.token);
					resetSessionTimeout();
					// Retry the request with the new token
					response = await doFetch(true);
				} else {
					await logout();
					onUnauthorized?.();
				}
			} catch {
				await logout();
				onUnauthorized?.();
			}
		}

		return response;
	}

	function setUser(newUser: User | null) {
		user = newUser;
		if (newUser) {
			resetSessionTimeout();
		}
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
		loginWithOAuth,
		fetchWithAuth,
		persistSession,
		onSessionTimeout,
		setSessionTimeout,
		setUser,
		setTenant,
		setToken,
		clearToken,
	};
}
