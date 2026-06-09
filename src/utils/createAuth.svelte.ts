import { toast } from "svelte-sonner";
import type { TFunction } from "../shared-types";

export type User = {
	id: string;
	email: string;
	name?: string;
	avatar?: string;
	roles: string[];
	permissions: string[];
	tenantId?: string;
};

export interface AuthStorage {
	getToken(): string | null;
	setToken(token: string): void;
	clearToken(): void;
	getUser?(): User | null;
	setUser?(user: User): void;
	clearUser?(): void;
}

const DEFAULT_STORAGE: AuthStorage = {
	getToken: () => (typeof window !== "undefined" ? localStorage.getItem("bindrunes_token") : null),
	setToken: (token: string) => {
		if (typeof window !== "undefined") localStorage.setItem("bindrunes_token", token);
	},
	clearToken: () => {
		if (typeof window !== "undefined") localStorage.removeItem("bindrunes_token");
	},
	getUser: () => {
		if (typeof window === "undefined") return null;
		const stored = localStorage.getItem("bindrunes_user");
		if (!stored) return null;
		try {
			return JSON.parse(stored);
		} catch {
			try {
				localStorage.removeItem("bindrunes_user");
			} catch {}
			return null;
		}
	},
	setUser: (user: User) => {
		if (typeof window !== "undefined") {
			try {
				localStorage.setItem("bindrunes_user", JSON.stringify(user));
			} catch {}
		}
	},
	clearUser: () => {
		if (typeof window !== "undefined") {
			try {
				localStorage.removeItem("bindrunes_user");
			} catch {}
		}
	},
};

/**
 * Reactive auth composable for Svelte 5.
 *
 * Usage:
 * <script>
 *   import { createAuth } from 'bindrunes';
 *   const auth = createAuth({ storage: { getToken, setToken, clearToken } });
 * </script>
 *
 * {#if auth.isAuthenticated}
 *   <ProtectedContent />
 * {:else}
 *   <Login onLogin={auth.login} />
 * {/if}
 */
export function createAuth(options?: {
	storage?: AuthStorage;
	onLogout?: (t?: TFunction) => void;
}) {
	const storage = options?.storage ?? DEFAULT_STORAGE;
	let token = $state<string | null>(storage.getToken());
	let user = $state<User | null>(storage.getUser?.() ?? null);

	const isAuthenticated = $derived(!!token);
	const roles = $derived(user?.roles ?? []);
	const permissions = $derived(user?.permissions ?? []);
	const tenantId = $derived(user?.tenantId);

	function login(newToken: string, userData?: User) {
		token = newToken;
		storage.setToken(newToken);
		if (userData) {
			user = userData;
			storage.setUser?.(userData);
		}
	}

	function logout(t?: TFunction) {
		token = null;
		user = null;
		storage.clearToken();
		storage.clearUser?.();
		options?.onLogout?.(t) ?? toast.info(t?.("auth.AuthGuard.loggedOut") ?? "Sessão encerrada.");
	}

	function refreshToken(newToken: string) {
		token = newToken;
		storage.setToken(newToken);
	}

	function setUser(userData: User) {
		user = userData;
		storage.setUser?.(userData);
	}

	function hasRole(role: string): boolean {
		return roles.includes(role);
	}

	function hasAnyRole(roleList: string[]): boolean {
		return roleList.some((r) => roles.includes(r));
	}

	function hasPermission(permission: string): boolean {
		return permissions.includes(permission) || permissions.includes("*");
	}

	function hasAllRequired(permissionList: string[]): boolean {
		return permissionList.every((p) => hasPermission(p));
	}

	function hasAnyPermission(permissionList: string[]): boolean {
		return permissionList.some((p) => hasPermission(p));
	}

	return {
		get token() {
			return token;
		},
		get isAuthenticated() {
			return isAuthenticated;
		},
		get user() {
			return user;
		},
		get roles() {
			return roles;
		},
		get permissions() {
			return permissions;
		},
		get tenantId() {
			return tenantId;
		},
		login,
		logout,
		refreshToken,
		setUser,
		hasRole,
		hasAnyRole,
		hasPermission,
		hasAllRequired,
		hasAnyPermission,
	};
}
