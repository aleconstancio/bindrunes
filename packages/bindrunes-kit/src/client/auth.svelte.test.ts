import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createClientAuth, type User } from "./auth.svelte";

function mockUser(overrides: Partial<User> = {}): User {
	return { id: "u1", email: "test@example.com", name: "Test", ...overrides };
}

describe("createClientAuth", () => {
	beforeEach(() => {
		localStorage.clear();
		document.cookie = "";
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
});
