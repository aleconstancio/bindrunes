# Landing Pages

Pre-built landing page sections for B2B SaaS products. Import from `bindrunes/landing`.

## Setup

```css
/* app.css */
@import "tailwindcss";
@plugin "bindrunes/tailwind";
@import "bindrunes/styles/landing.css";
```

Requires `<div class="landing-page">` wrapper for CSS selectors.

## Usage

```svelte
<script lang="ts">
  import {
    createLandingState,
    LandingNav,
    HeroBanner,
    MetricsBar,
    HowItWorks,
    FeatureGrid,
    PricingTable,
    Testimonial,
    FAQ,
    SiteFooter,
  } from 'bindrunes/landing';

  const landing = createLandingState();
</script>

<div class="landing-page">
  <LandingNav
    logo={{ href: '/', label: 'My SaaS' }}
    links={[{ label: 'Features', href: '#features' }]}
    cta={{ label: 'Get Started', href: '/signup' }}
    sectionIds={['features']}
  />
  <HeroBanner
    title="My SaaS Title"
    description="The best product ever."
    ctas={[{ label: 'Get Started', href: '/signup' }]}
  />
  <!-- ... sections ... -->
  <SiteFooter logo={{ label: 'My SaaS' }} />
</div>
```

## Components

| Component | Description |
|-----------|-------------|
| `LandingNav` | Sticky nav with scroll progress, mobile menu, theme toggle |
| `HeroBanner` | Hero/CTA banner with gradient, badge, CTAs (used for both hero and final CTA) |
| `MetricsBar` | Responsive metric cards grid |
| `HowItWorks` | Numbered steps with connector line |
| `FeatureGrid` | Feature cards (card/minimal variants) |
| `PricingTable` | Pricing with monthly/annual toggle, subgrid alignment |
| `Testimonial` | Centered testimonial with avatar |
| `FAQ` | Accordion-based FAQ section |
| `SiteFooter` | Site footer with links |

### Additional Components

| Component | Description |
|-----------|-------------|
| `TestimonialGrid` | Multi-testimonial grid (1/2/3 columns) |
| `LogoCloud` | Partner/customer logo row |
| `FeatureComparison` | Side-by-side feature comparison table |
| `Newsletter` | Email signup form section |
| `TeamSection` | Team member cards with avatars/social |
| `IntegrationGrid` | Integration logos with descriptions |
| `StatsCounter` | Animated number counters |

## Composables

```ts
import { createLandingState, useLanding } from 'bindrunes/landing';
```

**`createLandingState()`** — Creates and sets the shared landing page state. Call once at the root of your landing page.

**`useLanding()`** — Retrieves the landing state from context. Used internally by `LandingNav` and `PricingTable`.

```ts
interface LandingState {
  billingAnnual: boolean;  // pricing toggle state
  activeSection: string;   // currently visible section ID
  menuOpen: boolean;       // mobile menu toggle
}
```

## Shared Utilities

- `CTA`, `Feature`, `Metric`, `Step`, `Plan`, `TeamMember`, `Integration`, `FAQItem`, `FooterLink` — shared interfaces
- `getGridClass(columns)` — responsive grid class helper
- `getInitials(name)` — extract initials from a name string

## Customization

All components accept a `children` snippet. `PricingTable` supports two additional snippets:

```svelte
<PricingTable {plans}>
  {#snippet customCard(plan, { annual, format })}
    <!-- Your custom plan card -->
  {/snippet}
  {#snippet customFeature(feature, plan)}
    <!-- Custom per-feature rendering -->
  {/snippet}
</PricingTable>
```

`PricingTable` uses CSS subgrid when supported for aligned card heights. The `highlight` prop scales the plan card and adds a glow effect.
