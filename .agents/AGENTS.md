# bindrunes — Agent Laws

## Monorepo
- `packages/bindrunes` — Component library (Svelte 5 + Tailwind v4)
- `packages/bindrunes-kit` — SvelteKit meta-framework (SSR, auth, i18n)
- `docs-site/` — Documentation website
- `examples/` — Showcase and demo apps

## Architecture
Svelte 5 + Tailwind CSS v4 B2B SaaS component library. ~245 components, ~48 composables, 10 domain categories, 6 themes. Agentic kernel with copilot UI components. Kit provides SvelteKit scaffolding with full-stack and SPA+backend modes.

## Three Orthogonal Axes (v1.0+)
- Theme (`data-theme=editorial|dracula|nord|catppuccin|rose-pine|github`) → color identity
- Aesthetic (`data-aesthetic=minimal|glass|bento|expressive`) → form (radius/shadow/motion)
- Density (`data-density=compact|comfortable|spacious`) → spacing scale

## Token Rules
- **Color tokens** → theme layer only. Never touch form.
- **Form tokens** (radius, shadow, motion, easing) → aesthetic layer only. Never touch color.
- **Spacing tokens** (`--space-*`) → density layer only. Never touch color or form.
- No literal `box-shadow`, `duration-*`, `oklch()` inline in components — always use CSS var tokens.

## Laws
- `useX()` pattern for reactive composables, `createX()` pattern for non-reactive factories
- Svelte 5 runes only — no legacy stores, no `export let`
- Valibot for validation (not Zod)
- OKLCH color space for theming
- bits-ui for accessible primitives
- Prefer lightweight, tree-shakeable dependencies
- **Props convention:** Use inline anonymous types in `$props()` for components with ≤8 props. Use `interface Props` for components with >8 props or complex/conditional prop groups. New components should follow this convention; don't mass-refactor existing ones.
- The agentic kernel (`src/utils/agentic/`, `src/types/agent.ts`) follows the same `createX()` factory + readonly-getter contract as the rest of the library. **The `AgentRuntime` interface is the only thing consumers are expected to implement.**
- **Meta-component context:** Use `createMetaContext` / `useMetaContext` (from `src/utils/createMetaContext.svelte.ts`) for all subsystem context. Never use raw `setContext`/`getContext`.
- **Meta-component state:** Use `readonlyGetters` for state exposed to consumers. Mutations via explicit action methods only.
- **Meta-component layout:** Use `MetaLayout` (position slots), `MetaContainer` (content width), `MetaScrollable` (overflow). Never hardcode `max-w-*` or inline overflow styles.
- **Kit conventions:** Server utilities go in `bindrunes-kit/server`. Client-side auth uses `createApiClient` + localStorage. Server-side auth uses `createServerAuth` + cookies.

## Anti-Patterns
- Don't use legacy Svelte stores
- Don't use Zod (use Valibot)
- Don't add runtime deps without strong justification
- Don't use hardcoded colors — use CSS custom properties
- Don't export internal state — expose via readonly getters
- Don't use `thoth-` prefix (retired in v1.0)
- Don't use `text-sm`/`text-xs`/`text-lg`/`text-2xl font-bold`/etc. — use type scale tokens (`text-display-2`, `text-headline-2`, `text-title-1`, `text-body-md`, `text-label-md`, `text-mono-xs`)
- Don't hardcode `--duration-*` fallbacks — preset.css provides all token defaults
- Don't ship provider SDKs in the agentic kernel — the contract is the boundary
- Don't add a `Window` to the store without wiring it into the parent's `lineage.children`
- Don't use raw `setContext`/`getContext` — use `createMetaContext`/`useMetaContext`
- Don't hardcode `max-w-4xl`/`max-w-6xl` etc. — use `<MetaContainer size="...">`
- Don't use `<SidebarLayout>` — use `<MetaLayout>` (SidebarLayout is deprecated)
- Don't use `export let` — Svelte 5 runes only (`$props()`, `$state`, `$derived`, `$effect`)
- Don't use legacy stores — `$state`/`$derived`/`$effect` only
- Don't create multi-export files (except natural `createX`/`useX` pairs)
- Don't use `console.warn` in production code — use `devWarning()` from `src/utils/devWarning.ts`
- Don't create barrel files for domains — use granular imports (`bindrunes/domains/auth`)

## Internal Components
The following components are internal to ThemeStudio and should NOT be imported directly:
- `AestheticTab`, `DensityTab`, `ExportTab`, `ThemeColorTab`, `ThemePreview`
These are sub-components of `ThemeStudio` and are not part of the public API.

## Routing (Documentation)
| Topic | File |
|-------|------|
| Install & setup | `docs/getting-started.md` |
| Component reference | `docs/components.md` |
| Component state specs | `docs/component-states.md` |
| Composable reference | `docs/composables.md` |
| Design system & tokens | `docs/design-system.md` |
| Landing pages | `docs/landing.md` |
| Domain components | `docs/boundrunes.md` |
| Architecture | `docs/architecture.md` |
| Security | `docs/security.md` |
| Testing | `docs/testing.md` |
| Agentic kernel & copilot | `docs/agentic/overview.md` |
| bindrunes-kit | `docs/kit/` |
| Migration from shadcn-svelte | `docs/migration/from-shadcn-svelte.md` |
| Migration from Melt UI | `docs/migration/from-melt-ui.md` |
| Migration from Skeleton | `docs/migration/from-skeleton.md` |

## Agentic Coverage
The agentic folder has a **stricter per-glob threshold** enforced in CI
(`vitest.config.ts#thresholds`):
- `src/utils/agentic/**` and `src/types/agent.ts`: **90% lines / 85% branches
  / 88% functions / 90% statements**.
- Global floor stays at 80 / 70 / 77.
- When adding agentic code, TDD is required — the contract is the API
  surface; logic must be deeply covered.
- Copilot components (`src/domains/agentic/`) follow standard coverage thresholds.
