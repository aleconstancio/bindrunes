# bindrunes — Agent Laws

## Architecture
Svelte 5 + Tailwind CSS v4 B2B SaaS component library. 170+ exported components, 46 createX()/useX() composables, 6 themes.

## Three Orthogonal Axes (v1.0+)
- Theme (`data-theme=editorial|dracula|nord|catppuccin|rose-pine|github`) → color identity
- Aesthetic (`data-aesthetic=editorial|glass|bento|expressive`) → form (radius/shadow/motion)
- Density (`data-density=compact|comfortable|spacious`) → spacing scale

## Token Rules
- **Color tokens** → theme layer only. Never touch form.
- **Form tokens** (radius, shadow, motion, easing) → aesthetic layer only. Never touch color.
- **Spacing tokens** (`--space-*`) → density layer only. Never touch color or form.
- No literal `box-shadow`, `duration-*`, `oklch()` inline in components — always use CSS var tokens.

## Laws
- `createX()` pattern for all reactive utilities
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

## Routing
- Design system, themes, aesthetics → `docs/design-system.md`
- Component/composable tasks → `docs/components.md` or `docs/composables.md`
- Page composition (PageShell, PageSection, MarketingPage, DashboardPage) → `docs/landing.md`
- Architecture decisions → `docs/architecture.md`
- Security patterns → `docs/security.md`
- Agentic-chat kernel → `docs/agentic/overview.md`
- Adding a new metacomponent → also follow `docs/testing.md` (a11y + vitest-axe)

## Agentic Coverage
The agentic folder has a **stricter per-glob threshold** enforced in CI
(`vitest.config.ts#thresholds`):
- `src/utils/agentic/**` and `src/types/agent.ts`: **90% lines / 85% branches
  / 88% functions / 90% statements**.
- Global floor stays at 80 / 70 / 77.
- When adding agentic code, TDD is required — the contract is the API
  surface; logic must be deeply covered.
