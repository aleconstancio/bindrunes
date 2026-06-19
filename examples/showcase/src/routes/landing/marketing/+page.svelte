<script lang="ts">
import { MarketingPage } from "bindrunes/landing";
import { ArrowRight, Zap, Shield, Clock, CheckCircle, Layers, BarChart3, Users, Globe } from "lucide-svelte";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const logos = [
  { label: "Acme Corp" },
  { label: "TechFlow" },
  { label: "DataSync" },
  { label: "CloudBase" },
];

const metrics = [
  { value: "10k+", label: "Active Users", variant: "default" as const },
  { value: "99.9%", label: "Uptime", variant: "success" as const },
  { value: "4.9/5", label: "Rating", variant: "warning" as const },
];

const features = [
  { icon: Zap, title: "Lightning Fast", description: "Sub-millisecond response times." },
  { icon: Shield, title: "Enterprise Security", description: "SOC 2 compliant with E2E encryption." },
  { icon: Layers, title: "Modular Architecture", description: "Composable components and plugins." },
  { icon: BarChart3, title: "Real-time Analytics", description: "Live dashboards with streaming data." },
  { icon: Users, title: "Team Collaboration", description: "Shared workspaces and approval workflows." },
  { icon: Globe, title: "Multi-tenant", description: "Isolated tenants with shared infrastructure." },
];

const steps = [
  { icon: Zap, title: "Connect", description: "Integrate our SDK in minutes." },
  { icon: Shield, title: "Configure", description: "Set up workflows and permissions." },
  { icon: Clock, title: "Automate", description: "Let intelligent pipelines handle the work." },
  { icon: CheckCircle, title: "Scale", description: "Grow without limits." },
];

const plans = [
  { name: "Starter", monthly: 29, annual: 290, features: ["5 Users", "10GB Storage"], cta: { label: "Start Free", variant: "outline" as const, href: "/signup" } },
  { name: "Pro", monthly: 99, annual: 990, highlight: true, badge: "Most Popular", features: ["Unlimited Users", "100GB Storage", "Priority Support"], cta: { label: "Start Free", variant: "primary" as const, href: "/signup" } },
  { name: "Enterprise", monthly: 299, annual: 2990, features: ["Everything", "SLA", "Dedicated Support"], cta: { label: "Contact Sales", variant: "outline" as const, href: "/contact" } },
];

const testimonials = [
  { quote: "This transformed how we ship features.", author: "Sarah Chen", role: "CTO, TechFlow", avatarFallback: "SC" },
  { quote: "The three-axis design system is a game-changer.", author: "Marcus Johnson", role: "Lead Engineer, DataSync", avatarFallback: "MJ" },
];

const faqItems = [
  { question: "What is it?", answer: "A modern Svelte 5 component library." },
  { question: "Is there a free trial?", answer: "Yes, 14 days free." },
];
</script>

<MarketingPage
  logo={{ href: "/", label: "MySaaS" }}
  {navLinks}
  cta={{ label: "Get Started", href: "/signup" }}
  badge="v1.0"
  heroDescription="The modern toolkit for your SaaS."
  heroCtas={[{ label: "Start Free", href: "/signup", icon: ArrowRight }]}
  {logos}
  logosTitle="Trusted by teams worldwide"
  {metrics}
  {features}
  {steps}
  {plans}
  {testimonials}
  {faqItems}
  ctaTitle="Ready to build?"
  ctaDescription="Join thousands of teams."
  footerLinks={[{ label: "About", href: "/about" }]}
/>
