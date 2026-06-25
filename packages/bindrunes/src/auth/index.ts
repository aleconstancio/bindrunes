// ── Auth ──
/** Reactive authentication token handling with login/logout/session. */

export { hasAnyRole, hasPermission, hasRole } from "../utils/hasRole.svelte.ts";
/** Role-based access control checks (hasRole, hasAnyRole, hasPermission). */
export { useAccess } from "../utils/useAccess.svelte.ts";
export type { AuthStorage, User } from "../utils/useAuth.svelte.ts";
export { useAuth } from "../utils/useAuth.svelte.ts";
