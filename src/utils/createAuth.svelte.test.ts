import { describe, expect, it, vi } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { createAuth } from "./createAuth.svelte";

function makeStorage(
	overrides: Partial<{
		getToken: () => string | null;
		setToken: (t: string) => void;
		clearToken: () => void;
		getUser: () => unknown;
		setUser: (u: unknown) => void;
		clearUser: () => void;
	}> = {},
) {
	return {
		getToken: vi.fn(() => null),
		setToken: vi.fn(),
		clearToken: vi.fn(),
		getUser: vi.fn(() => null),
		setUser: vi.fn(),
		clearUser: vi.fn(),
		...overrides,
	};
}

const sampleUser = {
	id: "u1",
	email: "a@b.com",
	name: "A",
	roles: ["admin", "editor"],
	permissions: ["read", "write", "*"],
	tenantId: "t1",
};

describe("createAuth", () => {
	it("initializes with null token when storage returns null", async () => {
		const storage = makeStorage();
		const auth = await mountComposable(() => createAuth({ storage: storage as never }));
		expect(auth.token).toBeNull();
		expect(auth.isAuthenticated).toBe(false);
	});

	it("initializes with token from storage", async () => {
		const storage = makeStorage({ getToken: () => "tok_existing" });
		const auth = await mountComposable(() => createAuth({ storage: storage as never }));
		expect(auth.token).toBe("tok_existing");
		expect(auth.isAuthenticated).toBe(true);
	});

	it("login sets token and calls storage.setToken", async () => {
		const storage = makeStorage();
		const auth = await mountComposable(() => createAuth({ storage: storage as never }));
		auth.login("tok_new");
		expect(auth.token).toBe("tok_new");
		expect(auth.isAuthenticated).toBe(true);
		expect(storage.setToken).toHaveBeenCalledWith("tok_new");
	});

	it("login with user sets user, calls setUser, derives roles/permissions/tenantId", async () => {
		const storage = makeStorage();
		const auth = await mountComposable(() => createAuth({ storage: storage as never }));
		auth.login("tok", sampleUser);
		expect(auth.user).toEqual(sampleUser);
		expect(storage.setUser).toHaveBeenCalledWith(sampleUser);
		expect(auth.roles).toEqual(["admin", "editor"]);
		expect(auth.permissions).toEqual(["read", "write", "*"]);
		expect(auth.tenantId).toBe("t1");
	});

	it("logout clears token, calls storage.clearToken, calls onLogout", async () => {
		const onLogout = vi.fn();
		const storage = makeStorage({ getToken: () => "tok_active", clearUser: vi.fn() });
		const auth = await mountComposable(() => createAuth({ storage: storage as never, onLogout }));
		auth.logout();
		expect(auth.token).toBeNull();
		expect(auth.user).toBeNull();
		expect(storage.clearToken).toHaveBeenCalled();
		expect(storage.clearUser).toHaveBeenCalled();
		expect(onLogout).toHaveBeenCalled();
	});

	it("refreshToken updates token and persists to storage", async () => {
		const storage = makeStorage();
		const auth = await mountComposable(() => createAuth({ storage: storage as never }));
		auth.refreshToken("tok_refreshed");
		expect(auth.token).toBe("tok_refreshed");
		expect(storage.setToken).toHaveBeenCalledWith("tok_refreshed");
	});

	it("isAuthenticated transitions false → true → false through login/logout", async () => {
		const storage = makeStorage();
		const auth = await mountComposable(() => createAuth({ storage: storage as never }));
		expect(auth.isAuthenticated).toBe(false);
		auth.login("tok");
		expect(auth.isAuthenticated).toBe(true);
		auth.logout();
		expect(auth.isAuthenticated).toBe(false);
	});

	it("uses default localStorage storage when no storage option provided", async () => {
		localStorage.setItem("bindrunes_token", "tok_ls");
		const auth = await mountComposable(() => createAuth());
		expect(auth.token).toBe("tok_ls");
		localStorage.clear();
	});

	it("setUser updates user and persists", async () => {
		const storage = makeStorage();
		const auth = await mountComposable(() => createAuth({ storage: storage as never }));
		auth.setUser(sampleUser);
		expect(auth.user).toEqual(sampleUser);
		expect(storage.setUser).toHaveBeenCalledWith(sampleUser);
	});

	it("hasRole returns true for present role, false for missing", async () => {
		const storage = makeStorage();
		const auth = await mountComposable(() => createAuth({ storage: storage as never }));
		auth.login("tok", sampleUser);
		expect(auth.hasRole("admin")).toBe(true);
		expect(auth.hasRole("nobody")).toBe(false);
	});

	it("hasAnyRole returns true if any role in list is present", async () => {
		const storage = makeStorage();
		const auth = await mountComposable(() => createAuth({ storage: storage as never }));
		auth.login("tok", sampleUser);
		expect(auth.hasAnyRole(["nobody", "admin"])).toBe(true);
		expect(auth.hasAnyRole(["nobody", "ghost"])).toBe(false);
	});

	it("hasPermission returns true for explicit permission", async () => {
		const storage = makeStorage();
		const auth = await mountComposable(() => createAuth({ storage: storage as never }));
		auth.login("tok", { ...sampleUser, permissions: ["read", "write"] });
		expect(auth.hasPermission("read")).toBe(true);
		expect(auth.hasPermission("nonexistent")).toBe(false);
	});

	it("hasPermission returns true for * wildcard", async () => {
		const storage = makeStorage();
		const auth = await mountComposable(() => createAuth({ storage: storage as never }));
		auth.login("tok", { ...sampleUser, permissions: ["*"] });
		expect(auth.hasPermission("anything")).toBe(true);
	});

	it("hasAllRequired returns true only if all permissions are met", async () => {
		const storage = makeStorage();
		const auth = await mountComposable(() => createAuth({ storage: storage as never }));
		auth.login("tok", { ...sampleUser, permissions: ["read", "write"] });
		expect(auth.hasAllRequired(["read", "write"])).toBe(true);
		expect(auth.hasAllRequired(["read", "admin"])).toBe(false);
	});

	it("hasAnyPermission returns true if any in list is granted", async () => {
		const storage = makeStorage();
		const auth = await mountComposable(() => createAuth({ storage: storage as never }));
		auth.login("tok", { ...sampleUser, permissions: ["read"] });
		expect(auth.hasAnyPermission(["read", "admin"])).toBe(true);
		expect(auth.hasAnyPermission(["admin", "ghost"])).toBe(false);
	});

	it("uses default storage with corrupt user JSON", async () => {
		localStorage.setItem("bindrunes_user", "{not json");
		const auth = await mountComposable(() => createAuth());
		expect(auth.user).toBeNull();
		localStorage.clear();
	});
});
