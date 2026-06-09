import type { createAuth } from "./createAuth.svelte";

export function createAccess(auth: ReturnType<typeof createAuth>) {
	return {
		get isAuth() {
			return auth.isAuthenticated;
		},
		get roles() {
			return auth.roles;
		},
		get permissions() {
			return auth.permissions;
		},
		get tenantId() {
			return auth.tenantId;
		},
		get user() {
			return auth.user;
		},

		can(options: { roles?: string[]; permissions?: string[]; requireAll?: boolean }): boolean {
			if (!auth.isAuthenticated) return false;
			const { roles: requiredRoles, permissions: requiredPerms, requireAll = false } = options;
			if (!requiredRoles?.length && !requiredPerms?.length) return true;

			const roleOk =
				!requiredRoles?.length ||
				(requireAll ? auth.hasAllRequired(requiredRoles) : auth.hasAnyRole(requiredRoles));

			const permOk =
				!requiredPerms?.length ||
				(requireAll ? auth.hasAllRequired(requiredPerms) : auth.hasAnyPermission(requiredPerms));

			return roleOk && permOk;
		},

		get isAdmin() {
			return auth.hasRole("admin");
		},
		get isModerator() {
			return auth.hasRole("moderator");
		},
	};
}
