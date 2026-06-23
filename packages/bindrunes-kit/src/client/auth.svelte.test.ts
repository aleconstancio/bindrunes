import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createClientAuth, type User } from "./auth.svelte";

function mockUser(overrides: Partial<User> = {}): User {
	return { id: "u1", email: "test@example.com", name: "Test", ...overrides };
}

describe("createClientAuth", () => {
	beforeEach(() => {
		localStorage.clear();
		sessionStorage.clear();
		// Override document.cookie to prevent stale cookies across tests
		const cookieStore: Record<string, string> = {};
		Object.defineProperty(document, "cookie", {
			get() {
				return Object.entries(cookieStore)
					.map(([k, v]) => `${k}=${v}`)
					.join("; ");
			},
			set(value: string) {
				const eqIdx = value.indexOf("=");
				if (eqIdx === -1) return;
				const name = value.substring(0, eqIdx).trim();
				const rest = value.substring(eqIdx + 1);
				if (
					rest.includes("expires=Thu, 01 Jan 1970") ||
					rest.includes("expires=Thu, 01 Jan 1970")
				) {
					delete cookieStore[name];
				} else {
					cookieStore[name] = rest.split(";")[0];
				}
			},
			configurable: true,
		});
		vi.restoreAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("initializes with no token and loading false (no fetchProfile)", () => {
		const auth = createClientAuth();
		expect(auth.user).toBeNull();
		expect(auth.isAuthenticated).toBe(false);
		expect(auth.token).toBeNull();
	});

	it("login sets user and token", async () => {
		const user = mockUser();
		const loginFn = vi.fn().mockResolvedValue({ token: "tok_123", user });
		const onLogin = vi.fn();

		const auth = createClientAuth({ login: loginFn, onLogin });
		await auth.login("a@b.com", "pass");

		expect(auth.token).toBe("tok_123");
		expect(auth.user).toEqual(user);
		expect(auth.isAuthenticated).toBe(true);
		expect(onLogin).toHaveBeenCalledWith(user);
	});

	it("login throws when no login function provided", async () => {
		const auth = createClientAuth();
		await expect(auth.login("a@b.com", "pass")).rejects.toThrow("login function not provided");
	});

	it("logout clears state and calls onLogout", async () => {
		const user = mockUser();
		const loginFn = vi.fn().mockResolvedValue({ token: "tok_123", user });
		const logoutFn = vi.fn().mockResolvedValue(undefined);
		const onLogout = vi.fn();

		const auth = createClientAuth({
			login: loginFn,
			logout: logoutFn,
			onLogout,
		});
		await auth.login("a@b.com", "pass");
		expect(auth.isAuthenticated).toBe(true);

		await auth.logout();
		expect(auth.user).toBeNull();
		expect(auth.token).toBeNull();
		expect(auth.isAuthenticated).toBe(false);
		expect(onLogout).toHaveBeenCalled();
	});

	it("onUnauthorized callback fires on refresh failure", async () => {
		const refreshFn = vi.fn().mockRejectedValue(new Error("expired"));
		const logoutFn = vi.fn().mockResolvedValue(undefined);
		const onUnauthorized = vi.fn();

		const auth = createClientAuth({
			refresh: refreshFn,
			logout: logoutFn,
			onUnauthorized,
		});
		await auth.refresh();

		expect(onUnauthorized).toHaveBeenCalled();
	});

	it("setUser and setTenant update state", () => {
		const auth = createClientAuth();
		const user = mockUser();
		auth.setUser(user);
		expect(auth.user).toEqual(user);

		auth.setTenant({ id: "t1", name: "Org" });
		expect(auth.tenant).toEqual({ id: "t1", name: "Org" });
	});

	it("login with user result parses and sets user", async () => {
		const user = mockUser();
		const loginFn = vi.fn().mockResolvedValue({ user });

		const auth = createClientAuth({ login: loginFn });
		await auth.login("a@b.com", "pass");

		expect(auth.user).toEqual(user);
	});

	it("login error sets error state", async () => {
		const loginFn = vi.fn().mockRejectedValue(new Error("bad creds"));
		const auth = createClientAuth({ login: loginFn });

		await expect(auth.login("a@b.com", "pass")).rejects.toThrow("bad creds");
		expect(auth.error).toBe("bad creds");
	});

	it("login with fetchProfile fallback when result has no user", async () => {
		const user = mockUser();
		const loginFn = vi.fn().mockResolvedValue({ token: "tok_1" });
		const fetchProfile = vi.fn().mockResolvedValue(user);

		const auth = createClientAuth({ login: loginFn, fetchProfile });
		await auth.login("a@b.com", "pass");

		expect(fetchProfile).toHaveBeenCalled();
		expect(auth.user).toEqual(user);
		expect(auth.token).toBe("tok_1");
	});

	it("login with fetchProfile fallback returns null user", async () => {
		const loginFn = vi.fn().mockResolvedValue({ token: "tok_1" });
		const fetchProfile = vi.fn().mockResolvedValue(null);

		const auth = createClientAuth({ login: loginFn, fetchProfile });
		await auth.login("a@b.com", "pass");

		expect(auth.user).toBeNull();
	});

	it("loginWithOAuth throws for unknown provider", () => {
		const auth = createClientAuth();
		expect(() => auth.loginWithOAuth("unknown")).toThrow('OAuth provider "unknown" not configured');
	});

	it("loginWithOAuth redirects with correct URL params (cookie storage)", () => {
		const auth = createClientAuth({
			oauthProviders: {
				google: {
					name: "google",
					authorizeUrl: "https://accounts.google.com/o/oauth2/auth",
					clientId: "g-client-id",
					scopes: ["openid", "email"],
				},
			},
		});

		try {
			auth.loginWithOAuth("google", "http://localhost:3000/callback");
		} catch {
			// location.href assignment may fail in jsdom
		}

		// Verify state was stored in cookie
		expect(document.cookie).toContain("bindrunes-session-oauth-state=");
	});

	it("loginWithOAuth persists state in localStorage when configured", () => {
		const auth = createClientAuth({
			tokenStorage: "localStorage",
			oauthProviders: {
				github: {
					name: "github",
					authorizeUrl: "https://github.com/login/oauth/authorize",
					clientId: "gh-client-id",
					scopes: ["user"],
					state: "my-csrf-state",
				},
			},
		});

		try {
			auth.loginWithOAuth("github");
		} catch {
			// location.href assignment may fail in jsdom
		}

		expect(localStorage.getItem("bindrunes-session-oauth-state")).toBe("my-csrf-state");
	});

	it("loginWithOAuth uses default callback URL", () => {
		const auth = createClientAuth({
			oauthProviders: {
				google: {
					name: "google",
					authorizeUrl: "https://accounts.google.com/o/oauth2/auth",
					clientId: "g-client-id",
				},
			},
		});

		try {
			auth.loginWithOAuth("google");
		} catch {
			// location.href assignment may fail in jsdom
		}

		expect(document.cookie).toContain("bindrunes-session-oauth-state=");
	});

	it("persistSession(false) clears token and disables persistence", async () => {
		const user = mockUser();
		const loginFn = vi.fn().mockResolvedValue({ token: "tok_123", user });
		const auth = createClientAuth({ login: loginFn });

		await auth.login("a@b.com", "pass");
		expect(auth.token).toBe("tok_123");

		auth.persistSession(false);
		expect(auth.token).toBeNull();
	});

	it("persistSession(true) re-enables persistence", async () => {
		const user = mockUser();
		const loginFn = vi.fn().mockResolvedValue({ token: "tok_123", user });
		const auth = createClientAuth({ login: loginFn });

		await auth.login("a@b.com", "pass");
		auth.persistSession(false);
		expect(auth.token).toBeNull();

		auth.persistSession(true);
		// Token should remain null but persistence is enabled
	});

	it("onSessionTimeout registers callback", () => {
		const auth = createClientAuth();
		const cb = vi.fn();
		auth.onSessionTimeout(cb);
		// Callback is registered (tested indirectly via setSessionTimeout)
	});

	it("setSessionTimeout activates when user is set", async () => {
		vi.useFakeTimers();
		const user = mockUser();
		const auth = createClientAuth();

		auth.setUser(user);
		auth.onSessionTimeout(vi.fn());
		auth.setSessionTimeout(5000);

		await vi.advanceTimersByTimeAsync(5001);
		expect(auth.user).toBeNull();
	});

	it("setSessionTimeout clears timer when ms is 0", () => {
		const auth = createClientAuth();
		const user = mockUser();
		auth.setUser(user);
		auth.setSessionTimeout(5000);
		auth.setSessionTimeout(0);
		// No error, timer cleared
	});

	it("refresh succeeds and sets new token", async () => {
		const refreshFn = vi.fn().mockResolvedValue({ token: "new_tok" });
		const auth = createClientAuth({ refresh: refreshFn });

		await auth.refresh();
		expect(auth.token).toBe("new_tok");
	});

	it("refresh no-op when no refreshFn", async () => {
		const auth = createClientAuth();
		await auth.refresh();
		// No error
	});

	it("refresh failure calls logout and onUnauthorized", async () => {
		const refreshFn = vi.fn().mockRejectedValue(new Error("expired"));
		const logoutFn = vi.fn().mockResolvedValue(undefined);
		const onUnauthorized = vi.fn();

		const auth = createClientAuth({
			refresh: refreshFn,
			logout: logoutFn,
			onUnauthorized,
		});
		await auth.refresh();

		expect(logoutFn).toHaveBeenCalled();
		expect(onUnauthorized).toHaveBeenCalled();
	});

	it("fetchWithAuth adds Authorization header and returns response", async () => {
		const user = mockUser();
		const loginFn = vi.fn().mockResolvedValue({ token: "tok_123", user });
		const auth = createClientAuth({ login: loginFn });
		await auth.login("a@b.com", "pass");

		const mockResponse = new Response("ok", { status: 200 });
		const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(mockResponse);

		const res = await auth.fetchWithAuth("/api/data");
		expect(res).toBe(mockResponse);
		expect(fetchSpy).toHaveBeenCalledWith(
			"/api/data",
			expect.objectContaining({
				headers: expect.any(Headers),
			}),
		);
		fetchSpy.mockRestore();
	});

	it("fetchWithAuth refreshes token on 401 and retries", async () => {
		const user = mockUser();
		const loginFn = vi.fn().mockResolvedValue({ token: "old_tok", user });
		const refreshFn = vi.fn().mockResolvedValue({ token: "new_tok" });
		const auth = createClientAuth({ login: loginFn, refresh: refreshFn });
		await auth.login("a@b.com", "pass");

		const unauthorized = new Response("unauthorized", { status: 401 });
		const ok = new Response("ok", { status: 200 });
		const fetchSpy = vi
			.spyOn(globalThis, "fetch")
			.mockResolvedValueOnce(unauthorized)
			.mockResolvedValueOnce(ok);

		const res = await auth.fetchWithAuth("/api/data");
		expect(res.status).toBe(200);
		expect(refreshFn).toHaveBeenCalled();
		expect(auth.token).toBe("new_tok");
		fetchSpy.mockRestore();
	});

	it("fetchWithAuth logs out on 401 refresh failure", async () => {
		const user = mockUser();
		const loginFn = vi.fn().mockResolvedValue({ token: "tok", user });
		const refreshFn = vi.fn().mockRejectedValue(new Error("expired"));
		const logoutFn = vi.fn().mockResolvedValue(undefined);
		const onUnauthorized = vi.fn();
		const auth = createClientAuth({
			login: loginFn,
			refresh: refreshFn,
			logout: logoutFn,
			onUnauthorized,
		});
		await auth.login("a@b.com", "pass");

		const unauthorized = new Response("unauthorized", { status: 401 });
		vi.spyOn(globalThis, "fetch").mockResolvedValue(unauthorized);

		await auth.fetchWithAuth("/api/data");
		expect(logoutFn).toHaveBeenCalled();
		expect(onUnauthorized).toHaveBeenCalled();
	});

	it("fetchWithAuth logs out when refresh returns no token on 401", async () => {
		const user = mockUser();
		const loginFn = vi.fn().mockResolvedValue({ token: "tok", user });
		const refreshFn = vi.fn().mockResolvedValue({});
		const logoutFn = vi.fn().mockResolvedValue(undefined);
		const onUnauthorized = vi.fn();
		const auth = createClientAuth({
			login: loginFn,
			refresh: refreshFn,
			logout: logoutFn,
			onUnauthorized,
		});
		await auth.login("a@b.com", "pass");

		const unauthorized = new Response("unauthorized", { status: 401 });
		vi.spyOn(globalThis, "fetch").mockResolvedValue(unauthorized);

		await auth.fetchWithAuth("/api/data");
		expect(logoutFn).toHaveBeenCalled();
		expect(onUnauthorized).toHaveBeenCalled();
	});

	it("fetchWithAuth does not retry when no refreshFn on 401", async () => {
		const user = mockUser();
		const loginFn = vi.fn().mockResolvedValue({ token: "tok", user });
		const auth = createClientAuth({ login: loginFn });
		await auth.login("a@b.com", "pass");

		const unauthorized = new Response("unauthorized", { status: 401 });
		const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(unauthorized);

		const res = await auth.fetchWithAuth("/api/data");
		expect(res.status).toBe(401);
		expect(fetchSpy).toHaveBeenCalledTimes(1);
		fetchSpy.mockRestore();
	});

	it("login error with non-Error value sets generic message", async () => {
		const loginFn = vi.fn().mockRejectedValue("string error");
		const auth = createClientAuth({ login: loginFn });

		await expect(auth.login("a@b.com", "pass")).rejects.toThrow("string error");
		expect(auth.error).toBe("Login failed");
	});

	it("bootstrap with stored cookie token fetches profile", async () => {
		const user = mockUser();
		document.cookie = "bindrunes-session=stored_tok";
		const fetchProfile = vi.fn().mockResolvedValue(user);

		const auth = createClientAuth({ fetchProfile });
		// Bootstrap runs synchronously but fetchProfile is async
		await vi.waitFor(() => {
			expect(auth.user).toEqual(user);
		});
	});

	it("bootstrap clears token when fetchProfile returns invalid user", async () => {
		document.cookie = "bindrunes-session=stored_tok";
		const fetchProfile = vi.fn().mockResolvedValue({ invalid: true });

		const auth = createClientAuth({ fetchProfile });
		await vi.waitFor(() => {
			expect(auth.token).toBeNull();
		});
	});

	it("bootstrap sets error when fetchProfile throws", async () => {
		document.cookie = "bindrunes-session=stored_tok";
		const fetchProfile = vi.fn().mockRejectedValue(new Error("network error"));

		const auth = createClientAuth({ fetchProfile });
		await vi.waitFor(() => {
			expect(auth.error).toBe("network error");
			expect(auth.token).toBeNull();
		});
	});

	it("bootstrap with localStorage token", async () => {
		const user = mockUser();
		localStorage.setItem("bindrunes-session", "ls_tok");
		const fetchProfile = vi.fn().mockResolvedValue(user);

		const auth = createClientAuth({ fetchProfile, tokenStorage: "localStorage" });
		await vi.waitFor(() => {
			expect(auth.user).toEqual(user);
		});
	});

	it("bootstrap no-ops when no stored token", () => {
		// Ensure no cookies exist
		const fetchProfile = vi.fn();
		const auth = createClientAuth({ fetchProfile });
		expect(fetchProfile).not.toHaveBeenCalled();
	});

	it("bootstrap sets loading false with no fetchProfile", () => {
		const auth = createClientAuth();
		expect(auth.loading).toBe(false);
	});

	it("sessionTimeout fires and logs out user", async () => {
		vi.useFakeTimers();
		const user = mockUser();
		const loginFn = vi.fn().mockResolvedValue({ token: "tok", user });
		const logoutFn = vi.fn().mockResolvedValue(undefined);
		const onTimeout = vi.fn();

		const auth = createClientAuth({ login: loginFn, logout: logoutFn });
		auth.onSessionTimeout(onTimeout);
		auth.setSessionTimeout(5000);

		// Manually set user to trigger timeout
		auth.setUser(user);
		await vi.advanceTimersByTimeAsync(5001);

		expect(onTimeout).toHaveBeenCalled();
		expect(auth.user).toBeNull();
	});

	it("setToken with localStorage persists to localStorage", () => {
		const auth = createClientAuth({ tokenStorage: "localStorage" });
		auth.setToken("my_token");
		expect(localStorage.getItem("bindrunes-session")).toBe("my_token");
		expect(auth.token).toBe("my_token");
	});

	it("setToken with cookie persists to cookie", () => {
		const auth = createClientAuth({ tokenStorage: "cookie" });
		auth.setToken("cookie_token");
		expect(document.cookie).toContain("bindrunes-session=cookie_token");
	});

	it("clearToken with localStorage removes from localStorage", () => {
		const auth = createClientAuth({ tokenStorage: "localStorage" });
		auth.setToken("tok");
		auth.clearToken();
		expect(localStorage.getItem("bindrunes-session")).toBeNull();
	});

	it("clearToken with cookie clears cookie", () => {
		const auth = createClientAuth({ tokenStorage: "cookie" });
		auth.setToken("tok");
		auth.clearToken();
		expect(auth.token).toBeNull();
	});

	it("persistSession(false) disables token storage in setToken", () => {
		const auth = createClientAuth({ tokenStorage: "localStorage" });
		auth.persistSession(false);
		auth.setToken("tok");
		// Token is set on the state but not persisted
		expect(auth.token).toBe("tok");
		expect(localStorage.getItem("bindrunes-session")).toBeNull();
	});
});
