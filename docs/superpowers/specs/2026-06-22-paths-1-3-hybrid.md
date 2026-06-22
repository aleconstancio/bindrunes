# Paths 1+3: Meta-Framework + Design System Depth Spec

> **Date:** 2026-06-22
> **Status:** Approved
> **Scope:** bindrunes-kit v2 + Design System Depth

---

## Vision

"The most customizable full-stack Svelte framework" — batteries included, deeply themeable, zero vendor lock-in.

Two pillars:
1. **Meta-Framework Layer** — Eliminates boilerplate for auth, DB, API, i18n, deployment
2. **Design System Depth** — Deepest customization in any ecosystem

---

## Phase 5: Kit v2 (Weeks 1-6)

### 5.1 CLI Rewrite

**Problem:** Current CLI is 835 lines of inline file generation. Fragile, hard to maintain.

**Solution:**
- Use template directories (created in Phase 1) as source of truth
- CLI becomes thin layer: copy templates, patch config, add feature files
- Add `--yes` flag for non-interactive mode
- Add `--template` flag for community templates
- Add `--example` flag to scaffold from example apps

### 5.2 Server Module Completion

| Module | Enhancement |
|--------|------------|
| `auth.ts` | Full session management, cookie refresh, CSRF, OAuth stubs |
| `api.ts` | Typed route handlers with validation, error normalization |
| `hooks.ts` | Full middleware: auth, CSRF, locale, rate limiting |
| `i18n.ts` | Path-based routing, locale detection, dictionary loading |

### 5.3 Client Module Completion

| Module | Enhancement |
|--------|------------|
| `auth.svelte.ts` | OAuth provider support, token refresh, session persistence |
| `session.svelte.ts` | Session timeout, heartbeat, reconnection |
| `autosave.svelte.ts` | Conflict resolution, offline queue |
| `sse.svelte.ts` | Reconnection with backoff, event routing |
| `websocket.svelte.ts` | Message queuing, binary support |

### 5.4 Drizzle ORM Integration

New `bindrunes-kit/server/db` module:
- `createDb(config)` — connection factory
- `defineSchema(table)` — schema definition helper
- `createCrudRouter(schema)` — auto-generate CRUD API routes
- Pre-built templates for common patterns

---

## Phase 6: Design Depth (Weeks 5-8)

### 6.1 Visual Theme Builder

**Route:** `/docs/design-system/builder`

Interactive tool with:
- Theme/aesthetic/density selector
- Live component preview (Button, Card, Input, Dialog)
- CSS token editor with live updates
- Code export (CSS, defineTheme, extendTheme)
- Share via URL

### 6.2 Component-Level Token Overrides

```svelte
<Card theme="dracula" aesthetic="glass" density="compact">
  <!-- Overrides scoped to this component tree -->
</Card>
```

### 6.3 Responsive Density

```ts
const density = createDensity({
  responsive: true,
  breakpoints: {
    compact: "(max-width: 768px)",
    comfortable: "(min-width: 769px) and (max-width: 1200px)",
    spacious: "(min-width: 1201px)",
  },
});
```

### 6.4 Animation Presets

```ts
const { enter, exit, slideUp, fadeIn, scaleIn } = useAnimation();
```

Add `createTransition()` and `staggerChildren()` helpers.

### 6.5 Theme Sharing

- Export as JSON
- Import from URL
- Community theme gallery

---

## Phase 7: Schema-Driven CRUD (Weeks 7-9)

### 7.1 Schema Definition

```ts
import { defineSchema, field } from "bindrunes-kit/server/db";

export const users = defineSchema("users", {
  id: field.uuid().primaryKey(),
  name: field.string().required(),
  email: field.string().email().unique(),
  role: field.enum(["admin", "user"]),
});
```

### 7.2 Auto-Generated Templates

```svelte
<CrudTemplate schema={users} />
```

Generates: list, create, edit, detail, search, filter, pagination.

### 7.3 Type-Safe API Routes

```ts
export const GET = createTypedHandler(users, async ({ locals }) => {
  return locals.db.query.users.findMany();
});
```

---

## Phase 8: Polish & Launch (Weeks 8-11)

- Kit v2 docs
- Rewrite example apps
- Migration guides
- Blog posts, Discord, contribution guide
