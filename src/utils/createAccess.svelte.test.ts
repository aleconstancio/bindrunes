import { describe, expect, it } from "vitest";
import { createAccess } from "./createAccess.svelte";

const makeAuth = (
	overrides: Partial<{
		isAuthenticated: boolean;
		roles: string[];
		permissions: string[];
		hasRole: (r: string) => boolean;
		hasAnyRole: (rs: string[]) => boolean;
		hasAllRequired: (rs: string[]) => boolean;
		hasAnyPermission: (ps: string[]) => boolean;
		tenantId: string | null;
		user: { id: string } | null;
	}> = {},
) => ({
	isAuthenticated: false,
	roles: [],
	permissions: [],
	hasRole: () => false,
	hasAnyRole: () => false,
	hasAllRequired: () => false,
	hasAnyPermission: () => false,
	tenantId: null,
	user: null,
	...overrides,
});

describe("createAccess", () => {
	describe("delegated getters", () => {
		it("exposes isAuth from auth", () => {
			const access = createAccess(makeAuth({ isAuthenticated: true }));
			expect(access.isAuth).toBe(true);
		});

		it("exposes roles from auth", () => {
			const access = createAccess(makeAuth({ roles: ["admin"] }));
			expect(access.roles).toEqual(["admin"]);
		});

		it("exposes permissions from auth", () => {
			const access = createAccess(makeAuth({ permissions: ["read"] }));
			expect(access.permissions).toEqual(["read"]);
		});

		it("exposes tenantId from auth", () => {
			const access = createAccess(makeAuth({ tenantId: "t1" }));
			expect(access.tenantId).toBe("t1");
		});

		it("exposes user from auth", () => {
			const user = { id: "u1" };
			const access = createAccess(makeAuth({ user }));
			expect(access.user).toBe(user);
		});
	});

	describe("isAdmin / isModerator", () => {
		it('isAdmin returns true when auth.hasRole("admin") is true', () => {
			const access = createAccess(makeAuth({ hasRole: (r) => r === "admin" }));
			expect(access.isAdmin).toBe(true);
		});

		it('isAdmin returns false when auth.hasRole("admin") is false', () => {
			const access = createAccess(makeAuth({ hasRole: () => false }));
			expect(access.isAdmin).toBe(false);
		});

		it('isModerator returns true when auth.hasRole("moderator") is true', () => {
			const access = createAccess(makeAuth({ hasRole: (r) => r === "moderator" }));
			expect(access.isModerator).toBe(true);
		});
	});

	describe("can()", () => {
		it("returns false when not authenticated", () => {
			const access = createAccess(makeAuth({ isAuthenticated: false }));
			expect(access.can({ roles: ["admin"] })).toBe(false);
		});

		it("returns true for authenticated user with no requirements", () => {
			const access = createAccess(makeAuth({ isAuthenticated: true }));
			expect(access.can({})).toBe(true);
		});

		it("returns true when user has any required role (default)", () => {
			const access = createAccess(
				makeAuth({
					isAuthenticated: true,
					hasAnyRole: (rs) => rs.includes("admin"),
				}),
			);
			expect(access.can({ roles: ["admin"] })).toBe(true);
		});

		it("returns true when user has all required roles when requireAll=true", () => {
			const access = createAccess(
				makeAuth({
					isAuthenticated: true,
					hasAllRequired: (rs) => rs.every(() => true),
				}),
			);
			expect(access.can({ roles: ["a", "b"], requireAll: true })).toBe(true);
		});

		it("returns true when user has any required permission (default)", () => {
			const access = createAccess(
				makeAuth({
					isAuthenticated: true,
					hasAnyPermission: (ps) => ps.includes("write"),
				}),
			);
			expect(access.can({ permissions: ["write"] })).toBe(true);
		});

		it("returns true when user has all required permissions when requireAll=true", () => {
			const access = createAccess(
				makeAuth({
					isAuthenticated: true,
					hasAllRequired: () => true,
				}),
			);
			expect(access.can({ permissions: ["a", "b"], requireAll: true })).toBe(true);
		});

		it("returns false when neither role nor permission matches", () => {
			const access = createAccess(
				makeAuth({
					isAuthenticated: true,
					hasAnyRole: () => false,
					hasAnyPermission: () => false,
				}),
			);
			expect(access.can({ roles: ["admin"], permissions: ["write"] })).toBe(false);
		});

		it("returns true when both role and permission checks pass (AND)", () => {
			const access = createAccess(
				makeAuth({
					isAuthenticated: true,
					hasAnyRole: () => true,
					hasAnyPermission: () => true,
				}),
			);
			expect(access.can({ roles: ["admin"], permissions: ["write"] })).toBe(true);
		});

		it("returns true when roles pass and no permissions required", () => {
			const access = createAccess(
				makeAuth({
					isAuthenticated: true,
					hasAnyRole: () => true,
				}),
			);
			expect(access.can({ roles: ["admin"] })).toBe(true);
		});
	});
});
