<script lang="ts">
import { MarketingTemplate } from "bindrunes/layouts";
import { ArrowRight, Zap, Shield, Layers, BarChart3, Users, Globe, Clock, CheckCircle } from "lucide-svelte";

const features = [
  { icon: Zap, title: "Lightning Fast", description: "Sub-millisecond response times with edge computing and intelligent caching." },
  { icon: Shield, title: "Enterprise Security", description: "SOC 2 compliant with end-to-end encryption, audit logging, and RBAC." },
  { icon: Layers, title: "Modular Architecture", description: "Composable components and plugins — use what you need, nothing more." },
  { icon: BarChart3, title: "Real-time Analytics", description: "Live dashboards with streaming data, custom metrics, and alerting." },
  { icon: Users, title: "Team Collaboration", description: "Shared workspaces, comments, and approval workflows built in." },
  { icon: Globe, title: "Multi-tenant by Design", description: "Isolated tenants with shared infrastructure for maximum efficiency." },
];

const steps = [
  { icon: Zap, title: "Connect", description: "Integrate our SDK in minutes with your existing stack." },
  { icon: Shield, title: "Configure", description: "Set up your workflows, permissions, and integrations." },
  { icon: Clock, title: "Automate", description: "Let intelligent pipelines handle the heavy lifting." },
  { icon: CheckCircle, title: "Scale", description: "Grow without limits — infrastructure scales automatically." },
];

const plans = [
  { name: "Starter", monthly: 29, annual: 290, features: ["Up to 5 users", "10 GB storage", "Basic analytics", "Email support", "API access"], cta: { label: "Start Free Trial", variant: "outline" as const, href: "/signup" } },
  { name: "Pro", monthly: 79, annual: 790, highlight: true, badge: "Most Popular", features: ["Unlimited users", "100 GB storage", "Advanced analytics", "Priority support", "API + Webhooks", "Custom integrations"], cta: { label: "Start Free Trial", variant: "primary" as const, href: "/signup" } },
  { name: "Enterprise", monthly: 199, annual: 1990, features: ["Unlimited everything", "Unlimited storage", "Custom analytics", "24/7 dedicated support", "White-label", "SSO/SAML", "SLA guarantee"], cta: { label: "Contact Sales", variant: "outline" as const, href: "/contact" } },
];

const testimonials = [
  { quote: "This platform transformed how we ship features. What used to take weeks now takes days.", author: "Sarah Chen", role: "CTO, TechFlow Inc.", avatarFallback: "SC" },
  { quote: "The modular architecture is a game-changer. Our brand team loves the flexibility.", author: "Marcus Johnson", role: "Lead Engineer, DataSync", avatarFallback: "MJ" },
  { quote: "We evaluated 12 platforms. This was the only one that checked every box.", author: "Priya Patel", role: "VP Product, CloudBase", avatarFallback: "PP" },
];

const stats = [
  { value: 500, label: "Enterprise Customers", suffix: "+" },
  { value: 99, label: "Uptime Percentage", suffix: "%" },
  { value: 50, label: "Integrations", suffix: "+" },
  { value: 30, label: "Countries", suffix: "+" },
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

const faqItems = [
  { question: "What is this platform?", answer: "A modern Svelte 5 component library and design system for building B2B SaaS applications at scale." },
  { question: "How does the three-axis design system work?", answer: "Theme controls color identity, aesthetic controls form (radius, shadow, motion), and density controls spacing. They are completely independent." },
  { question: "Can I customize the themes?", answer: "Yes. You can extend any built-in theme, create custom themes, or use ThemeStudio for live editing and CSS export." },
  { question: "Is there a free trial?", answer: "Yes, all plans come with a 14-day free trial. No credit card required." },
  { question: "What kind of support do you offer?", answer: "Starter gets email support. Pro gets priority support. Enterprise gets 24/7 dedicated support with a named account manager." },
  { question: "Can I self-host?", answer: "Enterprise plans include on-premise deployment options with Docker images and Kubernetes manifests." },
];
</script>

<MarketingTemplate
  logo={{ href: "/", label: "Acme Platform" }}
  navLinks={[
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ]}
  cta={{ label: "Get Started", href: "/signup" }}
  badge="v2.0 — Now available"
  heroDescription="The Svelte 5 component library and design system for building B2B SaaS applications at scale. Three-axis theming, 230+ components, and a complete auth + data layer."
  heroCtas={[
    { label: "Get Started", href: "/signup", icon: ArrowRight },
    { label: "See Features", href: "#features", variant: "outline" },
  ]}
  heroFootnote={{ title: "14-day free trial.", description: "No credit card required. Cancel anytime." }}
  {logos}
  logosTitle="Trusted by engineering teams worldwide"
  {metrics}
  {features}
  {steps}
  {plans}
  {testimonials}
  {stats}
  {faqItems}
  ctaTitle="Ready to build at scale?"
  ctaDescription="Join thousands of teams already building with us. Start your free trial today."
  footerLinks={[
    { label: "Docs", href: "/docs" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]}
  copyright="© 2026 Acme Platform. All rights reserved."
  bottomLinks={[
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ]}
/>
