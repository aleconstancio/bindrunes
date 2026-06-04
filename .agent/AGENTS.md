# bindrunes — Agent Laws

## Architecture
Svelte 5 + Tailwind CSS v4 B2B SaaS component library. 88 exported components, 20+ createX() composables, 6 themes.

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

## Anti-Patterns
- Don't use legacy Svelte stores
- Don't use Zod (use Valibot)
- Don't add runtime deps without strong justification
- Don't use hardcoded colors — use CSS custom properties
- Don't export internal state — expose via readonly getters
- Don't use `thoth-` prefix (retired in v1.0)
- Don't use `text-sm`/`text-xs`/`text-lg`/`text-2xl font-bold`/etc. — use type scale tokens (`text-display-2`, `text-headline-2`, `text-title-1`, `text-body-md`, `text-label-md`, `text-mono-xs`)
- Don't hardcode `--duration-*` fallbacks — preset.css provides all token defaults

## Routing
- Design system → `docs/design-system.md`
- Component/composable tasks → `docs/components.md` or `docs/composables.md`
- Architecture decisions → `docs/architecture.md`
- Theme/styling → `docs/themes.md`
- Aesthetic presets → `docs/aesthetics.md`
- Security patterns → `docs/security.md`
