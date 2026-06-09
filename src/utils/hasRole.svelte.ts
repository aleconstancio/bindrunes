type AuthLike = {
	roles: string[];
	permissions: string[];
	hasRole: (role: string) => boolean;
	hasAnyRole: (roles: string[]) => boolean;
	hasPermission: (permission: string) => boolean;
};

export function hasRole(auth: AuthLike, role: string): boolean {
	return auth.hasRole(role);
}

export function hasAnyRole(auth: AuthLike, roles: string[]): boolean {
	return auth.hasAnyRole(roles);
}

export function hasPermission(auth: AuthLike, permission: string): boolean {
	return auth.hasPermission(permission);
}
