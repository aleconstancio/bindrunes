<script lang="ts">
  import { createAuth, type AuthStorage } from '../utils/createAuth.svelte.ts';
  import { getContext, hasContext } from 'svelte';
  import { isSafeRedirect } from '../utils/url.ts';

  let {
    storage = undefined as AuthStorage | undefined,
    roles = [] as string[],
    permissions = [] as string[],
    requireAll = false,
    auth: existingAuth,
    fallback = '/login',
    unauthorizedFallback = '/403',
    children,
  }: {
    storage?: AuthStorage;
    roles?: string[];
    permissions?: string[];
    requireAll?: boolean;
    auth?: ReturnType<typeof createAuth>;
    fallback?: string;
    unauthorizedFallback?: string;
    children?: import('svelte').Snippet;
  } = $props();

  const AUTH_KEY = Symbol.for('bindrunes-auth');

  const safeFallback = $derived(isSafeRedirect(fallback) ? fallback : '/login');
  const safeUnauthorized = $derived(isSafeRedirect(unauthorizedFallback) ? unauthorizedFallback : '/403');

  const auth = existingAuth ?? (hasContext(AUTH_KEY) ? getContext(AUTH_KEY) : createAuth({ storage }));

  let accessGranted = $derived.by(() => {
    if (!auth.isAuthenticated) return false;
    if (roles.length === 0 && permissions.length === 0) return true;

    const roleCheck = roles.length === 0 || (requireAll
      ? auth.hasAllRequired(roles)
      : auth.hasAnyRole(roles));

    const permCheck = permissions.length === 0 || (requireAll
      ? auth.hasAllRequired(permissions)
      : auth.hasAnyPermission(permissions));

    return roleCheck && permCheck;
  });

  $effect(() => {
    if (typeof window === 'undefined') return;
    if (!auth.isAuthenticated) {
      if (window.location.pathname !== safeFallback) {
        window.location.href = safeFallback;
      }
    } else if (!accessGranted) {
      if (window.location.pathname !== safeUnauthorized) {
        window.location.href = safeUnauthorized;
      }
    }
  });
</script>

{#if accessGranted}
  {@render children?.()}
{/if}
