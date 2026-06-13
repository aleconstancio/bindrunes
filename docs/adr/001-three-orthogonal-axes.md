# ADR-001: Three Orthogonal Design Axes

## Status

Accepted

## Context

Component libraries typically conflate color theming, visual aesthetics, and spacing into a single "theme" concept. This forces consumers to choose between a small set of monolithic presets, or to override individual CSS custom properties across unrelated concerns.

For a B2B SaaS design system serving multiple product verticals (dashboards, marketing sites, admin panels), this coupling creates friction:
- A product that needs tighter spacing for dense data views must also accept a different color palette.
- Switching from a playful aesthetic to a corporate one requires redefining spacing tokens.
- Customizing colors for brand identity forces accepting the library's default corner radii and shadows.

## Decision

Decompose the design system into three fully orthogonal axes, each controlled by a separate `data-*` attribute:

| Axis | Attribute | Controls | CSS Layer |
|------|-----------|----------|-----------|
| **Theme** | `data-theme` | Color palette (OKLCH custom properties) | `themes/*.css` |
| **Aesthetic** | `data-aesthetic` | Corner radius, shadows, easing, motion | `aesthetics/*.css` |
| **Density** | `data-density` | Spacing scale (margins, paddings) | `densities/*.css` |

Each axis has its own composable (`createTheme`, `createAesthetic`, `createDensity`) and can be switched independently at runtime.

### Token Rules

- **Color tokens** (`--color-*`, `--bg-*`, `--border-*`) are owned by the theme layer only.
- **Form tokens** (`--radius-*`, `--shadow-*`, `--duration-*`, `--easing-*`) are owned by the aesthetic layer only.
- **Spacing tokens** (`--space-*`) are owned by the density layer only.
- Components never reference raw values like `oklch(...)`, `box-shadow`, or `duration-*` — they always use CSS custom properties.

### Presets (v1.0)

- **Themes**: `editorial`, `dracula`, `nord`, `catppuccin`, `rose-pine`, `github`
- **Aesthetics**: `editorial`, `glass`, `bento`, `expressive`
- **Densities**: `compact`, `comfortable`, `spacious`

## Consequences

### Positive

- Consumers can mix any theme with any aesthetic with any density (6 x 4 x 3 = 72 combinations).
- Each axis can be customized independently without affecting others.
- Runtime switching (e.g., dark mode toggle) only updates the relevant CSS custom properties.
- Components remain agnostic to the visual configuration — they consume tokens, not hardcoded values.

### Negative

- Three separate composable calls in the provider layer (mitigated by `AppProvider`).
- More CSS custom properties to manage (mitigated by preset CSS files).
- Token naming discipline must be enforced in linting and code review.

### Mitigations

- `AppProvider` composes all three axes behind a single component.
- Biome lint rules and AGENTS.md document the token ownership rules.
- `docs/design-system.md` provides the full token reference.
