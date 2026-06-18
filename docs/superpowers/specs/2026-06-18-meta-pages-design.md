# Meta-Pages Design: Unified Page Composition System

## Problem

Building pages with bindrunes requires manual composition of 8-10 components, repeated boilerplate (`<section class="px-6 py-16 section-reveal"><div class="mx-auto max-w-6xl">`), and separate systems for landing vs app pages. No layout flexibility — left/right/top bars aren't composable.

## Solution: Three-Layer Architecture

### Layer 1: `PageShell` — Layout Primitive

Handles ALL layout combinations: topbar, left sidebar, right sidebar, main content. Controls sidebar width and collapsibility internally.

```svelte
<PageShell
  topbar={navSnippet}
  left={sidebarSnippet}
  leftWidth="260px"
  leftCollapsible="icon"
  right={detailSnippet}
  rightWidth="320px"
>
  {#snippet main()}
    <!-- content -->
  {/snippet}
</PageShell>
```

**Layout combinations:**

| Zones | Result |
|---|---|
| `topbar` only | Marketing/landing page |
| `left` only | Sidebar dashboard |
| `topbar` + `left` | Full app shell |
| `topbar` + `right` | Content + detail panel |
| `left` + `right` | Dual sidebar |
| `topbar` + `left` + `right` | Full app with both sidebars |
| `main` only | Centered content page |

**Props:**

```ts
interface PageShellProps {
  topbar?: Snippet;
  left?: Snippet;
  leftWidth?: string;           // default "260px"
  leftCollapsible?: "icon" | "full" | "none";  // default "icon"
  leftOpen?: boolean;           // $bindable, default true
  leftToggle?: Snippet;         // render prop: receives toggleLeft function
  right?: Snippet;
  rightWidth?: string;          // default "320px"
  rightCollapsible?: "icon" | "full" | "none"; // default "icon"
  rightOpen?: boolean;          // $bindable, default true
  rightToggle?: Snippet;        // render prop: receives toggleRight function
  class?: string;
  main?: Snippet;
  children?: Snippet;
}
```

**Behavior:**
- Left/right sidebars use `width` prop for initial size
- Collapsible sidebars animate width via CSS transition (`transition: width 200ms`)
- `"icon"` mode: collapses to 0px (hidden), toggled via `leftOpen`/`rightOpen`
- `"full"` mode: always visible, no collapse
- `"none"` mode: no sidebar rendered
- Sidebars scroll independently via `MetaScrollable`
- `min-h-screen` + `flex-1` ensures viewport fill
- `leftToggle`/`rightToggle` snippets receive `toggleLeft`/`toggleRight` functions for consumer-provided toggle buttons

**Toggle pattern:**
```svelte
<PageShell
  left={sidebarSnippet}
  leftCollapsible="icon"
  leftToggle={toggleSnippet}
>
  {#snippet main()}...{/snippet}
</PageShell>

<!-- In consumer: -->
{#snippet toggleSnippet(toggleLeft)}
  <button onclick={toggleLeft}>Toggle sidebar</button>
{/snippet}
```

### Layer 2: `PageSection` — Content Zone Wrapper

Wraps content sections with container, spacing, and animation. Generalized from `LandingSection`.

```svelte
<PageSection id="features" size="xl" background="muted" spacing="wide">
  <h2 class="text-center text-display-3">Features</h2>
  <FeatureGrid {features} />
</PageSection>
```

**Props:**

```ts
interface PageSectionProps {
  id?: string;
  size?: ContainerSize;         // default "xl"
  background?: "none" | "muted" | "gradient";  // default "none"
  spacing?: "compact" | "normal" | "wide";      // default "normal"
  reveal?: boolean;             // section-reveal animation, default true
  class?: string;
  children?: Snippet;
  header?: Snippet;
  footer?: Snippet;
}
```

**Renders:**
```svelte
<section {id} class="px-6 {spacingY[spacing]} {bgClass[background]} {reveal ? 'section-reveal' : ''} {className}">
  <MetaContainer {size}>
    {#if header}<div class="mb-8">{@render header()}</div>{/if}
    {@render children?.()}
    {#if footer}<div class="mt-8">{@render footer()}</div>{/if}
  </MetaContainer>
</section>
```

### Layer 3: Page Templates

Pre-composed templates using `PageShell` + `PageSection`.

#### `MarketingPage` (export from `bindrunes/landing`)

Data-driven landing page. Accepts data for every section; omitted sections don't render.

**Props:**

```ts
interface MarketingPageProps {
  // Nav
  logo?: NavLogo;
  navLinks?: NavLink[];
  cta?: NavCTA;
  // Hero — title is Snippet for markup flexibility, rest is data
  badge?: string;
  heroTitle?: Snippet;
  heroDescription?: string;
  heroCtas?: CTA[];
  heroFootnote?: { title: string; description: string };
  heroBackground?: "gradient" | "solid" | "none";
  // Sections — all optional, omitted = not rendered
  metrics?: Metric[];
  features?: Feature[];
  featureColumns?: number;
  steps?: Step[];
  plans?: Plan[];
  testimonials?: TestimonialData[];
  stats?: StatData[];
  faqItems?: FAQItem[];
  // CTA banner
  ctaTitle?: string;
  ctaDescription?: string;
  // Footer
  footerLinks?: FooterLink[];
  copyright?: string;
  bottomLinks?: FooterLink[];
  // Snippet overrides for full section replacement
  heroSnippet?: Snippet;
  metricsSnippet?: Snippet;
  featuresSnippet?: Snippet;
  pricingSnippet?: Snippet;
  faqSnippet?: Snippet;
  footerSnippet?: Snippet;
  // Layout
  class?: string;
}
```

**Usage:**
```svelte
<MarketingPage
  logo={{ label: "MySaaS" }}
  navLinks={[{ label: "Features", href: "#features" }]}
  cta={{ label: "Get Started", href: "/signup" }}
  badge="v1.0"
  heroTitle={titleSnippet}
  heroDescription="Build faster."
  heroCtas={[{ label: "Start", href: "/signup", icon: ArrowRight }]}
  {features}
  {plans}
  faqItems={faqItems}
  footerLinks={links}
/>
```

**Internal structure:**
```svelte
{#snippet navBar()}
  <LandingNav logo={logo} links={navLinks} {cta} sectionIds={ids} />
{/snippet}

<PageShell topbar={navBar}>
  {#snippet main()}
    <!-- Hero: either custom snippet or default LandingHero -->
    {#if heroSnippet}
      {@render heroSnippet()}
    {:else if heroTitle || heroDescription}
      <LandingHero badge={badge} title={heroTitle} description={heroDescription}
        ctas={heroCtas} footnote={heroFootnote} background={heroBackground} />
    {/if}
    <!-- Metrics -->
    {#if metrics?.length}
      <PageSection id="metrics"><MetricsBar {metrics} /></PageSection>
    {/if}
    <!-- Features -->
    {#if features?.length}
      <PageSection id="features">
        <FeatureGrid {features} columns={featureColumns} />
      </PageSection>
    {/if}
    <!-- How It Works -->
    {#if steps?.length}
      <PageSection id="how-it-works"><HowItWorks {steps} /></PageSection>
    {/if}
    <!-- Pricing -->
    {#if plans?.length}
      <PageSection id="pricing" background="muted"><PricingTable {plans} /></PageSection>
    {/if}
    <!-- Testimonials -->
    {#if testimonials?.length}
      <PageSection id="testimonials">
        <TestimonialGrid {testimonials} />
      </PageSection>
    {/if}
    <!-- Stats -->
    {#if stats?.length}
      <PageSection id="stats"><StatsCounter {stats} /></PageSection>
    {/if}
    <!-- FAQ -->
    {#if faqItems?.length}
      <PageSection id="faq"><FAQ items={faqItems} /></PageSection>
    {/if}
    <!-- CTA Banner -->
    {#if ctaTitle}
      <LandingCta title={ctaTitle} description={ctaDescription} />
    {/if}
    <!-- Footer -->
    {#if footerSnippet}
      {@render footerSnippet()}
    {:else}
      <LandingFooter logo={logo} links={footerLinks} {copyright} {bottomLinks} />
    {/if}
  {/snippet}
</PageShell>
```

**Auto-context:** Creates `LandingState` internally; no manual `createLandingState()` needed. All landing components that read from context (PricingTable billing toggle, LandingNav scroll-spy) work automatically.

**Snippet overrides:** Every section has a `*Snippet` prop that replaces the default rendering entirely. This enables full customization without breaking the data-driven flow.

#### `DashboardPage` (export from `bindrunes/boundrune`)

App shell with sidebar navigation.

**Props:**

```ts
interface DashboardPageProps {
  appName?: string;
  appSubtitle?: string;
  brandIcon?: string | Component;
  navigation?: NavGroup[];
  pathname?: string;
  onNavigate?: (to: string) => void;
  sidebarCollapsible?: "icon" | "full";
  // Snippet overrides
  sidebarHeader?: Snippet;
  sidebarFooter?: Snippet;
  headerActions?: Snippet;
  children?: Snippet;
}
```

**Usage:**
```svelte
<DashboardPage
  appName="MyApp"
  navigation={navGroups}
  pathname={currentPath}
  onNavigate={handleNav}
>
  <DashboardHome {stats} />
</DashboardPage>
```

**With custom sidebar:**
```svelte
<DashboardPage appName="MyApp" navigation={navGroups}>
  {#snippet sidebarHeader()}
    <CustomBrand />
  {/snippet}
  {#snippet sidebarFooter()}
    <UserMenu />
  {/snippet}
  <DashboardHome {stats} />
</DashboardPage>
```

**Internal structure:**
```svelte
{#snippet sidebar()}
  <Sidebar>
    {#if sidebarHeader}
      {@render sidebarHeader()}
    {:else}
      <DashboardShellBrand {appName} {brandIcon} />
    {/if}
    <NavMenu groups={navigation} {pathname} {onNavigate} />
    {#if sidebarFooter}
      {@render sidebarFooter()}
    {/if}
  </Sidebar>
{/snippet}

{#snippet header()}
  <DashboardShellHeader title={appName} {headerActions} />
{/snippet}

<PageShell
  topbar={header}
  left={sidebar}
  leftWidth="260px"
  leftCollapsible={sidebarCollapsible}
>
  {#snippet main()}
    {@render children?.()}
  {/snippet}
</PageShell>
```

#### `CrudPage` (export from `bindrunes/boundrune`)

List + detail split layout. Uses `PageShell` directly (not nested inside `DashboardPage`).

```svelte
<CrudPage
  title="Users"
  appName="MyApp"
  navigation={navGroups}
  columns={[{ key: "name", label: "Name" }]}
  {data}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

**Internal structure:**
```svelte
{#snippet sidebar()}
  <CrudListPage {title} {columns} {data} {onEdit} {onDelete} />
{/snippet}

{#snippet detailBar()}
  {#if selectedItem}
    <CrudDetailSection item={selectedItem} />
  {:else}
    <EmptyState />
  {/if}
{/snippet}

<PageShell
  topbar={headerSnippet}
  left={sidebar}
  leftWidth="400px"
  leftCollapsible="none"
>
  {#snippet main()}
    {#if selectedItem}
      <CrudDetailSection item={selectedItem} />
    {:else}
      <EmptyState />
    {/if}
  {/snippet}
</PageShell>
```

**Note:** `CrudPage` composes its own `PageShell` with header + list panel + detail area. It does NOT nest inside `DashboardPage` to avoid double sidebar nesting. Consumers who want the full dashboard shell around a CRUD view should use `DashboardPage` with `CrudListPage` as children.

## Composition Model

```
PageTemplate (MarketingPage, DashboardPage, CrudPage)
  └── PageShell (topbar, left, right, main)
       ├── topbar: LandingNav / DashboardShellHeader / custom
       ├── left: Sidebar / NavMenu / custom
       ├── right: DetailPanel / notifications / custom
       └── main
            └── PageSection (spacing, container, animation)
                 └── Content components (FeatureGrid, DataTable, etc.)
```

## File Structure

New files to create:
```
src/components/PageShell.svelte          # Layout primitive
src/components/PageSection.svelte        # Content zone wrapper
src/components/landing/MarketingPage.svelte  # Landing page template
src/components/boundrune/DashboardPage.svelte # Dashboard shell template
src/components/boundrune/CrudPage.svelte      # CRUD page template
```

## What Stays the Same

- All existing components (FeatureGrid, PricingTable, HeroBanner, etc.)
- All existing types (CTA, Feature, Plan, etc.)
- Manual composition approach still works
- Block, MetaContainer, LandingSection primitives
- Import paths (`bindrunes/landing`, `bindrunes/boundrune`)

## Deprecation (soft, not breaking)

- `DashboardShell` — `PageShell` + snippets is more flexible
- `DashboardShellSplit` — `PageShell` with left+right achieves the same

## Export Additions

```ts
// Root export (bindrunes)
export { default as PageShell } from "./components/PageShell.svelte";
export { default as PageSection } from "./components/PageSection.svelte";

// bindrunes/landing
export { default as MarketingPage } from "./components/landing/MarketingPage.svelte";

// bindrunes/boundrune
export { default as DashboardPage } from "./components/boundrune/DashboardPage.svelte";
export { default as CrudPage } from "./components/boundrune/CrudPage.svelte";
```
