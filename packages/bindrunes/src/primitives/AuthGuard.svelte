<script lang="ts">
import { untrack } from "svelte";
import { AUTH_CONTEXT_KEY } from "../utils/auth-keys.ts";
import { useMetaContext } from "../utils/createMetaContext";
import { isSafeRedirect } from "../utils/url.ts";
import { type AuthStorage, useAuth } from "../utils/useAuth.svelte.ts";

let {
	storage = undefined as AuthStorage | undefined,
	roles = [] as string[],
	permissions = [] as string[],
	requireAll = false,
	auth: existingAuth,
	fallback = "/login",
	unauthorizedFallback = "/403",
	navigate,
	children,
}: {
	storage?: AuthStorage;
	roles?: string[];
	permissions?: string[];
	requireAll?: boolean;
	auth?: ReturnType<typeof useAuth>;
	fallback?: string;
	unauthorizedFallback?: string;
	navigate?: (url: string) => void;
	children?: Snippet;
} = $props();

const safeFallback = $derived(isSafeRedirect(fallback) ? fallback : "/login");
const safeUnauthorized = $derived(
	isSafeRedirect(unauthorizedFallback) ? unauthorizedFallback : "/403",
);

const auth = untrack(() => {
	if (existingAuth) return existingAuth;
	try {
		return useMetaContext(AUTH_CONTEXT_KEY);
	} catch {
		return useAuth({ storage });
	}
});

let accessGranted = $derived.by(() => {
	if (!auth.isAuthenticated) return false;
	if (roles.length === 0 && permissions.length === 0) return true;

	const roleCheck =
		roles.length === 0 || (requireAll ? auth.hasAllRequired(roles) : auth.hasAnyRole(roles));

	const permCheck =
		permissions.length === 0 ||
		(requireAll ? auth.hasAllRequired(permissions) : auth.hasAnyPermission(permissions));

	return roleCheck && permCheck;
});

$effect(() => {
	if (typeof window === "undefined") return;
	if (!auth.isAuthenticated) {
		if (window.location.pathname !== safeFallback) {
			if (navigate) {
				navigate(safeFallback);
			} else {
				window.location.href = safeFallback;
			}
		}
	} else if (!accessGranted) {
		if (window.location.pathname !== safeUnauthorized) {
			if (navigate) {
				navigate(safeUnauthorized);
			} else {
				window.location.href = safeUnauthorized;
			}
		}
	}
});
</script>

{#if accessGranted}
  {@render children?.()}
{/if}
