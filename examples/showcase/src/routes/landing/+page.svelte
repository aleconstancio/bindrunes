<script lang="ts">
	import { HeroBanner, FeatureGrid, PricingTable, TestimonialGrid, FAQ, MetricsBar, HowItWorks, CtaBanner, SiteFooter, ComparisonTable, SecurityBadges, StatsCounter, VideoEmbed, TeamSection, LogoCloud, IntegrationGrid, Newsletter, FeatureComparison, Testimonial, LandingSection, SiteFooterColumns, Collapsible, CodeSnippet } from "bindrunes/landing";
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

	const featureComparisonPlans = [
		{ name: "Free" },
		{ name: "Pro", highlight: true },
		{ name: "Enterprise" },
	];

	const featureComparisonFeatures = [
		{ name: "Components", plans: { Free: "20+", Pro: "160+", Enterprise: "160+" } },
		{ name: "Three-axis theming", plans: { Free: true, Pro: true, Enterprise: true } },
		{ name: "Pre-built pages", plans: { Free: false, Pro: true, Enterprise: true } },
		{ name: "Priority support", plans: { Free: false, Pro: true, Enterprise: true } },
		{ name: "Custom branding", plans: { Free: false, Pro: false, Enterprise: true } },
		{ name: "SLA guarantee", plans: { Free: false, Pro: false, Enterprise: true } },
	];

	const footerColumns = [
		{ title: "Product", links: [{ label: "Documentation", href: "#" }, { label: "Components", href: "#" }, { label: "Pricing", href: "#" }, { label: "Changelog", href: "#" }] },
		{ title: "Resources", links: [{ label: "Blog", href: "#" }, { label: "Guides", href: "#" }, { label: "Community", href: "#" }, { label: "Support", href: "#" }] },
		{ title: "Company", links: [{ label: "About", href: "#" }, { label: "Careers", href: "#" }, { label: "Contact", href: "#" }, { label: "Partners", href: "#" }] },
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

	<Collapsible>
		{#snippet trigger()}
			<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
		{/snippet}
		<div class="space-y-2 mt-2">
			<CodeSnippet
				code={`import { HeroBanner, FeatureGrid, PricingTable } from "bindrunes/landing";\n\nconst features = [\n  { icon: "Zap", title: "Lightning Fast", description: "Optimized for performance." },\n  { icon: "Shield", title: "Secure by Default", description: "Built-in security practices." },\n  { icon: "Clock", title: "Quick Setup", description: "Get started in minutes." },\n];\n\n<HeroBanner\n  title="Build beautiful apps"\n  description="A complete Svelte 5 design system."\n  ctaLabel="Get Started"\n  ctaHref="/register"\n/>\n\n<FeatureGrid {features} columns={3} />`}
				language="svelte"
				title="Hero & Features"
			/>
		</div>
	</Collapsible>

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

	<Collapsible>
		{#snippet trigger()}
			<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
		{/snippet}
		<div class="space-y-2 mt-2">
			<CodeSnippet
				code={`import { TestimonialGrid, Testimonial } from "bindrunes/landing";\n\nconst testimonials = [\n  { quote: "bindrunes transformed how we build UIs.", author: "Sarah Chen", role: "CTO at TechFlow" },\n  { quote: "The best component library I've ever used.", author: "Marcus Johnson", role: "Lead Developer at Acme" },\n];\n\n<TestimonialGrid {testimonials} />\n\n<Testimonial\n  quote="A game changer for Svelte development."\n  author="Emily Rodriguez"\n  role="Product Manager at DataSync"\n/>`}
				language="svelte"
				title="Testimonials"
			/>
		</div>
	</Collapsible>

	<TeamSection
		title="Meet the team"
		members={teamMembers}
		columns={4}
	/>

	<PricingTable {plans} />

	<Collapsible>
		{#snippet trigger()}
			<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
		{/snippet}
		<div class="space-y-2 mt-2">
			<CodeSnippet
				code={`import { PricingTable } from "bindrunes/landing";\n\nconst plans = [\n  { name: "Starter", monthly: 29, annual: 290, features: ["5 Projects", "10GB Storage"], cta: { label: "Get Started", href: "/register" } },\n  { name: "Pro", monthly: 79, annual: 790, features: ["Unlimited Projects", "100GB Storage"], highlight: true, badge: "Most Popular", cta: { label: "Start Pro", href: "/register", variant: "primary" } },\n  { name: "Enterprise", monthly: 199, annual: 1990, features: ["Everything in Pro", "Unlimited Storage"], cta: { label: "Contact Sales", href: "/contact", variant: "outline" } },\n];\n\n<PricingTable {plans} />`}
				language="svelte"
				title="Pricing"
			/>
		</div>
	</Collapsible>

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

	<FeatureComparison
		plans={featureComparisonPlans}
		features={featureComparisonFeatures}
	/>

	<SecurityBadges
		badges={[
			{ label: "SOC 2", icon: "🔒", description: "Certified compliant" },
			{ label: "GDPR", icon: "🇪🇺", description: "Data protection" },
			{ label: "HIPAA", icon: "🏥", description: "Healthcare ready" },
			{ label: "ISO 27001", icon: "📋", description: "Security management" },
		]}
	/>

	<LandingSection
		id="section-demo"
		size="xl"
		background="muted"
		spacing="wide"
	>
		<div class="text-center py-8">
			<h2 class="text-title-1 text-foreground mb-4">Layout Wrapper Demo</h2>
			<p class="text-body-lg text-muted-foreground max-w-2xl mx-auto">
				LandingSection provides a consistent layout container with configurable size, background, and spacing for building structured landing pages.
			</p>
		</div>
	</LandingSection>

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

	<SiteFooterColumns
		columns={footerColumns}
		copyright="2025 bindrunes. All rights reserved."
		socialLinks={[
			{ label: "GitHub", href: "https://github.com/aleconstancio/bindrunes" },
			{ label: "npm", href: "https://www.npmjs.com/package/bindrunes" },
		]}
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
