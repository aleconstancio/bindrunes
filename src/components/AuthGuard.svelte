<script lang="ts">
  import { createAuth, type AuthStorage } from '../utils/createAuth.svelte.ts';

  let {
    storage = undefined as AuthStorage | undefined,
    roles = [] as string[],
    permissions = [] as string[],
    requireAll = false,
    fallback = '/login',
    unauthorizedFallback = '/403',
    children,
  }: {
    storage?: AuthStorage;
    roles?: string[];
    permissions?: string[];
    requireAll?: boolean;
    fallback?: string;
    unauthorizedFallback?: string;
    children?: import('svelte').Snippet;
  } = $props();

  const auth = createAuth({ storage });

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
      if (window.location.pathname !== fallback) {
        window.location.href = fallback;
      }
    } else if (!accessGranted) {
      if (window.location.pathname !== unauthorizedFallback) {
        window.location.href = unauthorizedFallback;
      }
    }
  });
</script>

{#if accessGranted}
  {@render children?.()}
{/if}
