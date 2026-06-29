<script lang="ts">
import {
  createLandingState,
  LandingNav,
  HeroBanner,
  LogoCloud,
  MetricsBar,
  FeatureGrid,
  HowItWorks,
  StatsCounter,
  TestimonialGrid,
  PricingTable,
  FAQ,
  Newsletter,
  SiteFooter,
} from "bindrunes/domains/landing";
import {
  ArrowRight,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  Layers,
  BarChart3,
  Users,
  Globe,
  Code2,
  Database,
  Palette,
  Sparkles,
  TrendingUp,
  Lock,
  Gauge,
} from "lucide-svelte";

const landing = createLandingState();

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

const logos = [
  { label: "Acme Corp" },
  { label: "TechFlow" },
  { label: "DataSync" },
  { label: "CloudBase" },
  { label: "NexGen" },
  { label: "PulseStack" },
];

const metrics = [
  { value: "10k+", label: "Active Users", variant: "default" as const },
  { value: "99.9%", label: "Uptime SLA", variant: "success" as const },
  { value: "4.9/5", label: "Customer Rating", variant: "warning" as const },
];

const features = [
  { icon: Zap, title: "Lightning Fast", description: "Sub-millisecond response times powered by edge computing and intelligent caching." },
  { icon: Shield, title: "Enterprise Security", description: "SOC 2 compliant with end-to-end encryption, audit logging, and RBAC." },
  { icon: Layers, title: "Modular Architecture", description: "Composable components and plugins — use what you need, nothing more." },
  { icon: BarChart3, title: "Real-time Analytics", description: "Live dashboards with streaming data, custom metrics, and alerting." },
  { icon: Users, title: "Team Collaboration", description: "Shared workspaces, comments, and approval workflows built in." },
  { icon: Globe, title: "Multi-tenant by Design", description: "Isolated tenants with shared infrastructure for maximum efficiency." },
  { icon: Code2, title: "API-first", description: "RESTful and GraphQL APIs with auto-generated SDKs and webhook support." },
  { icon: Database, title: "Polyglot Storage", description: "Postgres, Redis, S3 — all abstracted behind a unified data layer." },
  { icon: Palette, title: "White-label UI", description: "Custom themes, domains, and branding for every customer." },
];

const steps = [
  { icon: Zap, title: "Connect", description: "Integrate our SDK in minutes with your existing stack." },
  { icon: Shield, title: "Configure", description: "Set up your workflows, permissions, and integrations." },
  { icon: Clock, title: "Automate", description: "Let intelligent pipelines handle the heavy lifting." },
  { icon: CheckCircle, title: "Scale", description: "Grow without limits — infrastructure scales automatically." },
];

const stats = [
  { value: 500, label: "Enterprise Customers", suffix: "+" },
  { value: 99, label: "Uptime Percentage", suffix: "%" },
  { value: 50, label: "Integrations", suffix: "+" },
  { value: 30, label: "Countries", suffix: "+" },
];

const testimonials = [
  { quote: "bindrunes transformed how we ship features. What used to take weeks now takes days.", author: "Sarah Chen", role: "CTO, TechFlow Inc.", avatarFallback: "SC" },
  { quote: "The three-axis design system is a game-changer. Our brand team loves the flexibility.", author: "Marcus Johnson", role: "Lead Engineer, DataSync", avatarFallback: "MJ" },
  { quote: "We evaluated 12 platforms. bindrunes was the only one that checked every box.", author: "Priya Patel", role: "VP Product, CloudBase", avatarFallback: "PP" },
];

const plans = [
  {
    name: "Starter",
    monthly: 97,
    annual: 970,
    features: ["Up to 5 users", "10 GB storage", "Basic analytics", "Email support", "API access"],
    cta: { label: "Start Free Trial", variant: "outline" as const, href: "/signup" },
  },
  {
    name: "Pro",
    monthly: 197,
    annual: 1970,
    highlight: true,
    badge: "Most Popular",
    features: ["Unlimited users", "100 GB storage", "Advanced analytics", "Priority support", "API + Webhooks", "Custom integrations", "Team workspaces"],
    cta: { label: "Start Free Trial", variant: "primary" as const, href: "/signup" },
  },
  {
    name: "Enterprise",
    monthly: 497,
    annual: 4970,
    features: ["Unlimited everything", "Unlimited storage", "Custom analytics", "24/7 dedicated support", "White-label", "SSO/SAML", "SLA guarantee", "On-premise option"],
    cta: { label: "Contact Sales", variant: "outline" as const, href: "/contact" },
  },
];

const faqItems = [
  { question: "What is bindrunes?", answer: "bindrunes is a modern Svelte 5 component library and design system for building B2B SaaS applications at scale." },
  { question: "How does the three-axis design system work?", answer: "Theme controls color identity, aesthetic controls form (radius, shadow, motion), and density controls spacing. They are completely independent — any combination works." },
  { question: "Can I customize the themes?", answer: "Yes. You can extend any built-in theme, create custom themes with defineTheme(), or use ThemeStudio for live editing and CSS export." },
  { question: "Is there a free trial?", answer: "Yes, all plans come with a 14-day free trial. No credit card required." },
  { question: "What kind of support do you offer?", answer: "Starter gets email support. Pro gets priority support. Enterprise gets 24/7 dedicated support with a named account manager." },
  { question: "Can I self-host?", answer: "Enterprise plans include on-premise deployment options. We provide Docker images and Kubernetes manifests." },
];
</script>

<div class="landing-page">
  <LandingNav
    logo={{ href: "/", label: "bindrunes" }}
    links={navLinks}
    cta={{ label: "Get Started", href: "/signup" }}
    sectionIds={["features", "how-it-works", "pricing", "testimonials", "faq"]}
  />

  <main>
    <HeroBanner
      badge="v1.0 — Now available"
      description="The Svelte 5 component library and design system for building B2B SaaS applications at scale. Three-axis theming, 88+ components, and a complete auth + data layer."
      ctas={[
        { label: "Get Started", href: "/signup", icon: ArrowRight },
        { label: "See Features", href: "#features", variant: "outline" },
      ]}
      footnote={{ title: "14-day free trial.", description: "No credit card required. Cancel anytime." }}
    >
      {#snippet title()}Build Svelte Apps<br />at <span class="text-gradient-violet">Scale</span>{/snippet}
    </HeroBanner>

    <section id="logos" class="section-reveal" aria-label="Customer logos">
    <LogoCloud title="Trusted by engineering teams worldwide" {logos} />
  </section>

  <section id="metrics" class="section-reveal" aria-label="Key metrics">
    <div class="px-6 py-16">
      <MetricsBar {metrics} columns={3} />
    </div>
  </section>

  <section id="features" class="border-t border-border section-reveal" aria-label="Features">
    <div class="px-6 py-16">
      <div class="mx-auto max-w-6xl">
        <h2 class="text-center text-display-3 text-foreground">Everything you need to ship faster</h2>
        <p class="mx-auto mt-4 max-w-2xl text-center text-body-lg text-muted-foreground">
          From UI components to data layer, auth, and theming — bindrunes gives you the full stack for building modern SaaS applications.
        </p>
        <div class="mt-12">
          <FeatureGrid {features} columns={3} variant="card" />
        </div>
      </div>
    </div>
  </section>

  <section id="how-it-works" class="border-t border-border section-reveal" aria-label="How it works">
    <div class="px-6 py-16">
      <div class="mx-auto max-w-6xl">
        <h2 class="text-center text-display-3 text-foreground">From zero to production in four steps</h2>
        <p class="mx-auto mt-4 max-w-2xl text-center text-body-lg text-muted-foreground">
          Get started quickly and scale confidently with a platform designed for growth.
        </p>
        <div class="mt-12">
          <HowItWorks {steps} showConnector />
        </div>
      </div>
    </div>
  </section>

  <section id="stats" class="border-t border-border section-reveal" aria-label="Statistics">
    <StatsCounter {stats} columns={4} duration={2000} />
  </section>

  <section id="testimonials" class="border-t border-border section-reveal" aria-label="Testimonials">
    <div class="px-6 py-16">
      <div class="mx-auto max-w-6xl">
        <h2 class="text-center text-display-3 text-foreground">Loved by engineering teams</h2>
        <p class="mx-auto mt-4 max-w-2xl text-center text-body-lg text-muted-foreground">
          See what our customers have to say about building with bindrunes.
        </p>
        <div class="mt-12">
          <TestimonialGrid testimonials={testimonials} columns={3} />
        </div>
      </div>
    </div>
  </section>

  <section id="pricing" class="border-t border-border section-reveal" aria-label="Pricing">
    <div class="px-6 py-16">
      <div class="mx-auto max-w-6xl">
        <h2 class="text-center text-display-3 text-foreground">Simple, transparent pricing</h2>
        <p class="mx-auto mt-4 max-w-2xl text-center text-body-lg text-muted-foreground">
          No hidden fees. No surprises. Scale as you grow.
        </p>
        <div class="mt-12">
          <PricingTable {plans} />
        </div>
      </div>
    </div>
  </section>

  <section id="faq" class="border-t border-border section-reveal" aria-label="Frequently asked questions">
    <div class="px-6 py-16">
      <div class="mx-auto max-w-6xl">
        <h2 class="text-center text-display-3 text-foreground">Frequently asked questions</h2>
        <p class="mx-auto mt-4 max-w-2xl text-center text-body-lg text-muted-foreground">
          Everything you need to know about bindrunes.
        </p>
        <div class="mx-auto mt-12 max-w-3xl">
          <FAQ items={faqItems} />
        </div>
      </div>
    </div>
  </section>

  <section class="section-reveal" aria-label="Call to action">
    <HeroBanner
      description="Join thousands of teams already building with bindrunes. Start your free trial today."
      ctas={[{ label: "Get Started Free", href: "/signup", icon: ArrowRight }]}
      footnote={{ title: "14-day free trial.", description: "No credit card required." }}
      level={2}
      background="gradient"
    >
      {#snippet title()}Ready to build at scale?{/snippet}
    </HeroBanner>
  </section>
  </main>

  <SiteFooter
    logo={{ label: "bindrunes" }}
    links={[
      { label: "Docs", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ]}
    bottomLinks={[
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ]}
  />
</div>
