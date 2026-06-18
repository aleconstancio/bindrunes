# Landing Pages

Marketing layout blocks designed for SaaS platforms. Import from `bindrunes/landing`.

## Setup

Enable landing page styles by importing the stylesheet after Tailwind:

```css
/* app.css */
@import "tailwindcss";
@plugin "bindrunes/tailwind";
@import "bindrunes/styles/landing.css";
```

This enables:
- `stagger-enter` — Staggered fade-slide-up animation for grid items (respects `prefers-reduced-motion`)
- `section-reveal` — Scroll-triggered reveal animation using `animation-timeline: view()`
- Landing typography balance (`text-wrap: balance` for headings, `pretty` for paragraphs)

Ensure all landing content is contained inside a `<div class="landing-page">` wrapper.

---

## MarketingPage — Data-Driven Landing Pages

The fastest way to build a landing page. Pass your data, get a complete page.

```svelte
<script lang="ts">
  import { MarketingPage } from "bindrunes/landing";
  import { ArrowRight, Zap, Shield, Clock } from "lucide-svelte";

  const features = [
    { icon: Zap, title: "Fast", description: "Lightning quick." },
    { icon: Shield, title: "Secure", description: "Enterprise-grade security." },
    { icon: Clock, title: "Quick Setup", description: "Get started in minutes." },
  ];

  const plans = [
    { name: "Starter", monthly: 29, annual: 290, features: ["5 Projects"], cta: { label: "Get Started", variant: "outline", href: "/signup" } },
    { name: "Pro", monthly: 79, annual: 790, highlight: true, badge: "Most Popular", features: ["Unlimited"], cta: { label: "Start Free", variant: "primary", href: "/signup" } },
  ];
</script>

<MarketingPage
  logo={{ href: "/", label: "MySaaS" }}
  navLinks={[{ label: "Features", href: "#features" }, { label: "Pricing", href: "#pricing" }]}
  cta={{ label: "Get Started", href: "/signup" }}
  badge="v1.0"
  heroDescription="The modern toolkit for your SaaS."
  heroCtas={[{ label: "Start Free", href: "/signup", icon: ArrowRight }]}
  {features}
  {plans}
  faqItems={[{ question: "What is it?", answer: "A component library." }]}
  footerLinks={[{ label: "About", href: "/about" }]}
/>
```

### Props

All section props are optional — omit a section and it won't render.

| Prop | Type | Description |
|---|---|---|
| `logo` | `{ href, label, icon? }` | Brand logo for nav and footer |
| `navLinks` | `NavLink[]` | Navigation links |
| `cta` | `{ label, href, variant? }` | CTA button in nav |
| `badge` | `string` | Badge above hero title |
| `heroTitle` | `Snippet` | Hero title (snippet for markup) |
| `heroDescription` | `string` | Hero subtitle |
| `heroCtas` | `CTA[]` | Hero action buttons |
| `heroFootnote` | `{ title, description }` | Hero footnote text |
| `heroBackground` | `"gradient" \| "solid" \| "none"` | Hero background |
| `heroLevel` | `1 \| 2` | Heading level (h1/h2) |
| `metrics` | `Metric[]` | Metrics bar data |
| `features` | `Feature[]` | Feature grid data |
| `featureColumns` | `number` | Grid columns (default: 3) |
| `steps` | `Step[]` | How-it-works steps |
| `plans` | `Plan[]` | Pricing table data |
| `testimonials` | `TestimonialData[]` | Testimonials |
| `stats` | `StatData[]` | Animated stats |
| `faqItems` | `FAQItem[]` | FAQ accordion data |
| `ctaTitle` | `string` | CTA banner title |
| `ctaDescription` | `string` | CTA banner description |
| `footerLinks` | `FooterLink[]` | Footer links |
| `copyright` | `string` | Footer copyright |
| `bottomLinks` | `FooterLink[]` | Footer bottom links |
| `*Snippet` | `Snippet` | Override any section's rendering |

---

## PageSection — Content Zone Wrapper

Wraps content sections with container, spacing, and animation. Import from `bindrunes`.

```svelte
<script lang="ts">
  import { PageSection } from "bindrunes";
  import { FeatureGrid } from "bindrunes/landing";
</script>

<PageSection id="features" size="xl" background="muted" spacing="wide">
  <h2 class="text-center text-display-3">Features</h2>
  <FeatureGrid {features} />
</PageSection>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `id` | `string` | — | Section ID for scroll-spy |
| `size` | `ContainerSize` | `"xl"` | Width constraint |
| `background` | `"none" \| "muted" \| "gradient"` | `"none"` | Background treatment |
| `spacing` | `"compact" \| "normal" \| "wide"` | `"normal"` | Vertical padding |
| `reveal` | `boolean` | `true` | Enable section-reveal animation |
| `header` | `Snippet` | — | Header content |
| `footer` | `Snippet` | — | Footer content |

---

## Manual Composition

For full control, compose sections manually:

```svelte
<script lang="ts">
  import { createLandingState, LandingNav, HeroBanner, FeatureGrid, PricingTable, SiteFooter } from "bindrunes/landing";
  const landing = createLandingState();
</script>

<div class="landing-page">
  <LandingNav logo={{ label: "MySaaS" }} links={[{ label: "Home", href: "/" }]} />
  <HeroBanner title="Innovate faster" description="Unify your tools." ctaLabel="Get Started" ctaHref="/signup" />
  <FeatureGrid features={[{ icon: "Zap", title: "Fast", description: "Lightning quick." }]} />
  <PricingTable plans={[{ name: "Pro", monthly: 29, annual: 290, features: ["Feature 1"] }]} />
  <SiteFooter logo={{ label: "MySaaS" }} />
</div>
```

---

## Landing Primitives

### Navigation
- **`LandingNav`**: Sticky navigation bar with logo, links, and CTA button.
- **`SiteFooter`**: Single-row footer with logo, links, and copyright.
- **`SiteFooterColumns`**: 4-column footer with link groups.

### Hero & CTAs
- **`HeroBanner`**: Hero section with badge, title, description, and CTAs.
- **`CtaBanner`**: Full-width call-to-action section with gradient background.

### Content Sections
- **`FeatureGrid`**: Feature cards in 2/3/4 column grid with card or inline variants.
- **`HowItWorks`**: Step-by-step process with connector lines.
- **`MetricsBar`**: Key metrics display in 1-3 columns.
- **`StatsCounter`**: Animated number counters with suffixes.
- **`FeatureComparison`**: Feature comparison table.

### Social Proof
- **`Testimonial`**: Single testimonial card with quote, author, avatar.
- **`TestimonialGrid`**: Grid of testimonials in 1-3 columns.
- **`LogoCloud`**: Partner logo display.
- **`TeamSection`**: Team member grid with roles and social links.
- **`IntegrationGrid`**: Integration partner display.
- **`SecurityBadges`**: SOC2/GDPR/HIPAA badge display.

### Pricing
- **`PricingTable`**: 3-tier pricing with monthly/annual toggle and feature lists.

### FAQ & Content
- **`FAQ`**: Accordion FAQ section.
- **`Newsletter`**: Email signup form.
- **`ContentWithImage`**: Text + image alternating sections.
- **`VideoEmbed`**: Video demo section with caption.
- **`ComparisonTable`**: vs Competitors comparison table.

### Utility
- **`LandingSection`**: Generic section wrapper with reveal animation.
- **`createLandingState`**: Shared state for billing toggle and active section.
- **`useLanding`**: Access landing state from child components.
