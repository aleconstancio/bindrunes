<script lang="ts">
import AuthGuard from "../../AuthGuard.svelte";

let {
	isAuthenticated = true,
	roles = [] as string[],
	allowedRoles = undefined as string[] | undefined,
	permissions = [] as string[],
	requireAll = false,
	fallback = "/login",
	unauthorizedFallback = "/403",
	childrenText = "Protected content",
} = $props();

const effectiveAllowedRoles = allowedRoles ?? roles;
</script>

<AuthGuard
	{roles}
	{permissions}
	{requireAll}
	{fallback}
	{unauthorizedFallback}
	auth={{
		isAuthenticated,
		hasAnyRole: (r: string[]) => r.some((role) => effectiveAllowedRoles.includes(role)),
		hasAnyPermission: (p: string[]) => p.some((perm) => permissions.includes(perm)),
		hasAllRequired: (items: string[]) => items.every((item) => effectiveAllowedRoles.includes(item) || permissions.includes(item)),
	}}
>
	{#snippet children()}
		{childrenText}
	{/snippet}
</AuthGuard>
