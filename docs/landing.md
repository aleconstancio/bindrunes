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

Ensure all landing content is contained inside a `<div class="landing-page">` wrapper.

---

## Example Usage

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

---

## Example: Full Landing Page

```svelte
<script lang="ts">
  import {
    createLandingState, LandingNav, HeroBanner, LogoCloud, MetricsBar,
    FeatureGrid, HowItWorks, StatsCounter, TestimonialGrid, PricingTable,
    FAQ, CtaBanner, SiteFooter
  } from "bindrunes/landing";

  const landing = createLandingState();

  const features = [
    { icon: "Zap", title: "Lightning Fast", description: "Optimized for performance." },
    { icon: "Shield", title: "Secure", description: "Built-in security best practices." },
    { icon: "Clock", title: "Quick Setup", description: "Get started in minutes." },
  ];

  const plans = [
    { name: "Starter", monthly: 29, annual: 290, features: ["5 Projects", "10GB Storage"] },
    { name: "Pro", monthly: 79, annual: 790, features: ["Unlimited", "100GB"], highlight: true },
    { name: "Enterprise", monthly: 199, annual: 1990, features: ["Everything", "SLA"] },
  ];
</script>

<div class="landing-page">
  <LandingNav logo={{ label: "MySaaS" }} links={[{ label: "Features", href: "#features" }]} />
  <HeroBanner title="Build faster" description="The modern toolkit." ctaLabel="Start Free" ctaHref="/signup" />
  <LogoCloud logos={[{ name: "Acme" }, { name: "TechCo" }]} />
  <MetricsBar metrics={[{ value: "10k+", label: "Users" }]} />
  <FeatureGrid {features} id="features" />
  <HowItWorks steps={[{ icon: "Zap", title: "Install", description: "Add to project" }]} />
  <StatsCounter stats={[{ value: 500, label: "Customers", suffix: "+" }]} />
  <PricingTable {plans} />
  <FAQ items={[{ question: "What is it?", answer: "A component library." }]} />
  <CtaBanner title="Ready?" ctaLabel="Get Started" ctaHref="/signup" />
  <SiteFooter logo={{ label: "MySaaS" }} />
</div>
```
