import { describe, expect, it } from "vitest";
import { useAccess } from "./useAccess";

const makeAuth = (
	overrides: Partial<{
		token: string | null;
		isAuthenticated: boolean;
		roles: string[];
		permissions: string[];
		tenantId: string | undefined;
		user: { id: string; email: string; roles: string[]; permissions: string[] } | null;
		login: (token: string, userData?: any) => void;
		logout: (t?: any) => void;
		refreshToken: (token: string) => void;
		setUser: (userData: any) => void;
		hasRole: (r: string) => boolean;
		hasAnyRole: (rs: string[]) => boolean;
		hasPermission: (p: string) => boolean;
		hasAllRequired: (rs: string[]) => boolean;
		hasAnyPermission: (ps: string[]) => boolean;
	}> = {},
) => ({
	token: null,
	isAuthenticated: false,
	roles: [],
	permissions: [],
	tenantId: undefined,
	user: null,
	login: () => {},
	logout: () => {},
	refreshToken: () => {},
	setUser: () => {},
	hasRole: () => false,
	hasAnyRole: () => false,
	hasPermission: () => false,
	hasAllRequired: () => false,
	hasAnyPermission: () => false,
	...overrides,
});

describe("useAccess", () => {
	describe("delegated getters", () => {
		it("exposes isAuth from auth", () => {
			const access = useAccess(makeAuth({ isAuthenticated: true }));
			expect(access.isAuth).toBe(true);
		});

		it("exposes roles from auth", () => {
			const access = useAccess(makeAuth({ roles: ["admin"] }));
			expect(access.roles).toEqual(["admin"]);
		});

		it("exposes permissions from auth", () => {
			const access = useAccess(makeAuth({ permissions: ["read"] }));
			expect(access.permissions).toEqual(["read"]);
		});

		it("exposes tenantId from auth", () => {
			const access = useAccess(makeAuth({ tenantId: "t1" }));
			expect(access.tenantId).toBe("t1");
		});

		it("exposes user from auth", () => {
			const user = { id: "u1", email: "u1@test.com", roles: [], permissions: [] };
			const access = useAccess(makeAuth({ user }));
			expect(access.user).toBe(user);
		});
	});

	describe("isAdmin / isModerator", () => {
		it('isAdmin returns true when auth.hasRole("admin") is true', () => {
			const access = useAccess(makeAuth({ hasRole: (r) => r === "admin" }));
			expect(access.isAdmin).toBe(true);
		});

		it('isAdmin returns false when auth.hasRole("admin") is false', () => {
			const access = useAccess(makeAuth({ hasRole: () => false }));
			expect(access.isAdmin).toBe(false);
		});

		it('isModerator returns true when auth.hasRole("moderator") is true', () => {
			const access = useAccess(makeAuth({ hasRole: (r) => r === "moderator" }));
			expect(access.isModerator).toBe(true);
		});
	});

	describe("can()", () => {
		it("returns false when not authenticated", () => {
			const access = useAccess(makeAuth({ isAuthenticated: false }));
			expect(access.can({ roles: ["admin"] })).toBe(false);
		});

		it("returns true for authenticated user with no requirements", () => {
			const access = useAccess(makeAuth({ isAuthenticated: true }));
			expect(access.can({})).toBe(true);
		});

		it("returns true when user has any required role (default)", () => {
			const access = useAccess(
				makeAuth({
					isAuthenticated: true,
					hasAnyRole: (rs) => rs.includes("admin"),
				}),
			);
			expect(access.can({ roles: ["admin"] })).toBe(true);
		});

		it("returns true when user has all required roles when requireAll=true", () => {
			const access = useAccess(
				makeAuth({
					isAuthenticated: true,
					hasAllRequired: (rs) => rs.every(() => true),
				}),
			);
			expect(access.can({ roles: ["a", "b"], requireAll: true })).toBe(true);
		});

		it("returns true when user has any required permission (default)", () => {
			const access = useAccess(
				makeAuth({
					isAuthenticated: true,
					hasAnyPermission: (ps) => ps.includes("write"),
				}),
			);
			expect(access.can({ permissions: ["write"] })).toBe(true);
		});

		it("returns true when user has all required permissions when requireAll=true", () => {
			const access = useAccess(
				makeAuth({
					isAuthenticated: true,
					hasAllRequired: () => true,
				}),
			);
			expect(access.can({ permissions: ["a", "b"], requireAll: true })).toBe(true);
		});

		it("returns false when neither role nor permission matches", () => {
			const access = useAccess(
				makeAuth({
					isAuthenticated: true,
					hasAnyRole: () => false,
					hasAnyPermission: () => false,
				}),
			);
			expect(access.can({ roles: ["admin"], permissions: ["write"] })).toBe(false);
		});

		it("returns true when both role and permission checks pass (AND)", () => {
			const access = useAccess(
				makeAuth({
					isAuthenticated: true,
					hasAnyRole: () => true,
					hasAnyPermission: () => true,
				}),
			);
			expect(access.can({ roles: ["admin"], permissions: ["write"] })).toBe(true);
		});

		it("returns true when roles pass and no permissions required", () => {
			const access = useAccess(
				makeAuth({
					isAuthenticated: true,
					hasAnyRole: () => true,
				}),
			);
			expect(access.can({ roles: ["admin"] })).toBe(true);
		});
	});
});
