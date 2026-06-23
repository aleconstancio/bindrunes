import { array, object, optional, safeParse, string } from "valibot";
import type { TFunction, User } from "../shared-types";
import { isBrowser } from "./isBrowser";

export type { User } from "../shared-types";

type ToastFn = {
	info: (message: string) => void;
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
	getToken: () => (isBrowser ? localStorage.getItem("bindrunes_token") : null),
	setToken: (token: string) => {
		if (isBrowser) localStorage.setItem("bindrunes_token", token);
	},
	clearToken: () => {
		if (isBrowser) localStorage.removeItem("bindrunes_token");
	},
	getUser: () => {
		if (!isBrowser) return null;
		const stored = localStorage.getItem("bindrunes_user");
		if (!stored) return null;
		try {
			const parsed = JSON.parse(stored);
			const { success, output } = safeParse(
				object({
					id: string(),
					email: string(),
					name: optional(string()),
					avatar: optional(string()),
					roles: array(string()),
					permissions: array(string()),
					tenantId: optional(string()),
				}),
				parsed,
			);
			return success ? (output as User) : null;
		} catch {
			try {
				localStorage.removeItem("bindrunes_user");
			} catch {}
			return null;
		}
	},
	setUser: (user: User) => {
		if (isBrowser) {
			try {
				localStorage.setItem("bindrunes_user", JSON.stringify(user));
			} catch {}
		}
	},
	clearUser: () => {
		if (isBrowser) {
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
 *   import { useAuth } from 'bindrunes';
 *   const auth = useAuth({ storage: { getToken, setToken, clearToken } });
 * </script>
 *
 * {#if auth.isAuthenticated}
 *   <ProtectedContent />
 * {:else}
 *   <Login onLogin={auth.login} />
 * {/if}
 */
export function useAuth(options?: {
	storage?: AuthStorage;
	toast?: ToastFn;
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
		options?.onLogout?.(t) ??
			options?.toast?.info(t?.("auth.AuthGuard.loggedOut") ?? "Session ended.");
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
