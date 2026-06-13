<script lang="ts">
	import { HeroBanner, FeatureGrid, PricingTable, TestimonialGrid, FAQ, MetricsBar, HowItWorks, CtaBanner, SiteFooter, ComparisonTable, SecurityBadges, StatsCounter, VideoEmbed, TeamSection, LogoCloud, IntegrationGrid, Newsletter } from "bindrunes/landing";
	import { Zap, Shield, Clock, CheckCircle, Globe, Lock } from "lucide-svelte";

	const features = [
		{ icon: "Zap", title: "Lightning Fast", description: "Optimized for performance with minimal bundle size." },
		{ icon: "Shield", title: "Secure by Default", description: "Built-in security best practices and XSS protection." },
		{ icon: "Clock", title: "Quick Setup", description: "Get started in minutes with our intuitive API." },
		{ icon: "Globe", title: "Global Scale", description: "Deploy anywhere with zero configuration." },
		{ icon: "Lock", title: "Type Safe", description: "Full TypeScript support with strict type checking." },
		{ icon: "CheckCircle", title: "Battle Tested", description: "Used by thousands of production applications." },
	];

	const plans = [
		{ name: "Starter", monthly: 29, annual: 290, features: ["5 Projects", "10GB Storage", "Email Support", "Basic Analytics"], cta: { label: "Get Started", href: "/auth/register" } },
		{ name: "Pro", monthly: 79, annual: 790, features: ["Unlimited Projects", "100GB Storage", "Priority Support", "Advanced Analytics", "Custom Domains"], highlight: true, badge: "Most Popular", cta: { label: "Start Pro", href: "/auth/register", variant: "primary" as const } },
		{ name: "Enterprise", monthly: 199, annual: 1990, features: ["Everything in Pro", "Unlimited Storage", "24/7 Support", "SLA Guarantee", "Custom Integrations"], cta: { label: "Contact Sales", href: "/contact", variant: "outline" as const } },
	];

	const testimonials = [
		{ quote: "bindrunes transformed how we build UIs. The three-axis design system is genius.", author: "Sarah Chen", role: "CTO at TechFlow" },
		{ quote: "The best component library I've ever used. Everything just works together perfectly.", author: "Marcus Johnson", role: "Lead Developer at Acme" },
		{ quote: "We shipped our entire dashboard in 2 weeks using bindrunes. Incredible productivity.", author: "Emily Rodriguez", role: "Product Manager at DataSync" },
	];

	const metrics = [
		{ value: "10,000+", label: "Active Users" },
		{ value: "99.9%", label: "Uptime SLA" },
		{ value: "4.9/5", label: "Customer Rating" },
	];

	const faqItems = [
		{ question: "What is bindrunes?", answer: "bindrunes is a comprehensive Svelte 5 component library with a three-axis design system for building modern web applications." },
		{ question: "How many components are included?", answer: "Over 160 components including primitives, layouts, dashboards, auth forms, e-commerce, media, and more." },
		{ question: "Is it free to use?", answer: "Yes, bindrunes is open source under the MIT license." },
	];

	const partners = [
		{ label: "Vercel" },
		{ label: "Netlify" },
		{ label: "Cloudflare" },
		{ label: "GitHub" },
		{ label: "Stripe" },
		{ label: "Supabase" },
	];

	const teamMembers = [
		{ name: "Alex Constancio", role: "Creator & Lead", bio: "Open source enthusiast building tools for modern web development." },
		{ name: "Jordan Lee", role: "Core Maintainer", bio: "Frontend architect with a passion for design systems and accessibility." },
		{ name: "Taylor Kim", role: "Design Lead", bio: "Crafting visual languages that scale across products and teams." },
		{ name: "Morgan Davis", role: "DX Engineer", bio: "Improving developer workflows through better tooling and documentation." },
	];

	const integrations = [
		{ icon: "Globe", title: "SvelteKit", description: "First-class routing and server-side rendering support." },
		{ icon: "Lock", title: "Supabase", description: "Ready-made auth forms and database-connected components." },
		{ icon: "Zap", title: "Stripe", description: "Checkout flows, pricing tables, and payment components." },
		{ icon: "Shield", title: "Auth.js", description: "OAuth, magic links, and session management patterns." },
		{ icon: "Clock", title: "Prisma", description: "Type-safe database queries with full-stack components." },
		{ icon: "CheckCircle", title: "Playwright", description: "E2E testing helpers and component test utilities." },
	];

	function handleNewsletterSubmit(email: string) {
		console.log("Newsletter signup:", email);
	}
</script>

<div class="min-h-screen">
	<HeroBanner
		title="Build beautiful apps with bindrunes"
		description="A complete Svelte 5 design system with 160+ components, three-axis theming, and pre-built page patterns."
		ctaLabel="Get Started"
		ctaHref="/auth/register"
		secondaryLabel="View Documentation"
		secondaryHref="https://github.com/aleconstancio/bindrunes"
	/>

	<VideoEmbed
		title="See bindrunes in action"
		description="Watch how three-axis theming makes building complex UIs simple and fast."
		videoUrl="https://www.w3schools.com/html/mov_bbb.mp4"
		posterUrl="https://placehold.co/1280x720/1a1a2e/e0e0e0?text=bindrunes+Demo"
	/>

	<MetricsBar {metrics} />

	<LogoCloud title="Trusted by teams worldwide" logos={partners} />

	<FeatureGrid {features} columns={3} />

	<HowItWorks
		steps={[
			{ icon: "Zap", title: "Install", description: "Add bindrunes to your SvelteKit project" },
			{ icon: "Settings", title: "Configure", description: "Set up your theme, aesthetic, and density" },
			{ icon: "CheckCircle", title: "Build", description: "Compose components into your pages" },
			{ icon: "Globe", title: "Deploy", description: "Ship to production with confidence" },
		]}
	/>

	<StatsCounter
		stats={[
			{ value: 500, label: "Enterprise Customers", suffix: "+" },
			{ value: 99.9, label: "Uptime", suffix: "%" },
			{ value: 50, label: "Integrations", suffix: "+" },
			{ value: 30, label: "Countries", suffix: "+" },
		]}
	/>

	<TestimonialGrid {testimonials} />

	<TeamSection
		title="Meet the team"
		members={teamMembers}
		columns={4}
	/>

	<PricingTable {plans} />

	<ComparisonTable
		title="Why choose bindrunes?"
		yoursLabel="bindrunes"
		competitor1Label="Shadcn"
		competitor2Label="Mantine"
		features={[
			{ name: "Svelte 5 Runes", yours: true, competitor1: false, competitor2: false },
			{ name: "Three-axis theming", yours: true, competitor1: false, competitor2: false },
			{ name: "Pre-built pages", yours: true, competitor1: false, competitor2: false },
			{ name: "OKLCH colors", yours: true, competitor1: false, competitor2: true },
			{ name: "TypeScript", yours: true, competitor1: true, competitor2: true },
		]}
	/>

	<SecurityBadges
		badges={[
			{ label: "SOC 2", icon: "🔒", description: "Certified compliant" },
			{ label: "GDPR", icon: "🇪🇺", description: "Data protection" },
			{ label: "HIPAA", icon: "🏥", description: "Healthcare ready" },
			{ label: "ISO 27001", icon: "📋", description: "Security management" },
		]}
	/>

	<IntegrationGrid
		title="Works with your stack"
		integrations={integrations}
		columns={3}
	/>

	<FAQ items={faqItems} />

	<Newsletter
		title="Stay in the loop"
		description="Get updates on new components, patterns, and releases."
		placeholder="you@example.com"
		buttonText="Subscribe"
		onSubmit={handleNewsletterSubmit}
	/>

	<CtaBanner
		title="Ready to get started?"
		description="Join thousands of developers building with bindrunes."
		ctaLabel="Start Building"
		ctaHref="/auth/register"
	/>

	<SiteFooter
		logo={{ label: "bindrunes" }}
		links={[
			{ label: "Documentation", href: "https://github.com/aleconstancio/bindrunes" },
			{ label: "GitHub", href: "https://github.com/aleconstancio/bindrunes" },
			{ label: "npm", href: "https://www.npmjs.com/package/bindrunes" },
		]}
	/>
</div>
