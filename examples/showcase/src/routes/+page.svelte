<script lang="ts">
	import {
		Button,
		Badge,
		Card,
		CodeSnippet,
		IconCircle,
		SectionHeading,
	} from "bindrunes";
	import { HeroBanner, CtaBanner } from "bindrunes/domains/landing";
	import {
		Layout,
		Palette,
		Server,
		Bot,
	} from "lucide-svelte";

	const features = [
		{
			icon: Layout,
			title: "Domain Components",
			description:
				"10 pre-built domains: auth, dashboard, data, e-commerce, chat, and more. Production-ready out of the box.",
		},
		{
			icon: Palette,
			title: "Three-Axis Design",
			description:
				"Theme × Aesthetic × Density = 126 unique combinations. OKLCH colors, CSS custom properties.",
		},
		{
			icon: Server,
			title: "SvelteKit Integration",
			description:
				"Full-stack or SPA mode. Auth, API routes, i18n, and deployment adapters built-in.",
		},
		{
			icon: Bot,
			title: "Agentic Copilot",
			description:
				"Built-in LLM chat components. Token budgets, conversation branching, streaming. The only Svelte library with this.",
		},
	];

	const axes = [
		{
			axis: "Theme",
			description: "Color identity",
			values: ["editorial", "dracula", "nord", "catppuccin", "rose-pine", "github"],
		},
		{
			axis: "Aesthetic",
			description: "Form & motion",
			values: ["editorial", "glass", "bento", "expressive", "minimal", "bold", "soft"],
		},
		{
			axis: "Density",
			description: "Spacing scale",
			values: ["compact", "comfortable", "spacious"],
		},
	];

	const installCode = `# Install\nbun add bindrunes\n\n# Or with npm\nnpm install bindrunes`;

	const layoutCode = `<!-- +layout.svelte -->\n<script>\n  import { ThemeProvider } from "bindrunes";\n</` + `script>\n\n<ThemeProvider theme="editorial" aesthetic="glass" density="comfortable">\n  {@render children()}\n</ThemeProvider>`;

	const componentCode = `<!-- +page.svelte -->\n<script>\n  import { Button, Card, Badge } from "bindrunes";\n</` + `script>\n\n<Card variant="glass" padding>\n  <h2 class="text-title-1">Hello World</h2>\n  <p class="text-body text-muted-foreground">\n    Built with bindrunes.\n  </p>\n  <Button variant="primary" href="/docs">\n    Get Started →\n  </Button>\n</Card>`;
</script>

<svelte:head>
	<title>bindrunes — The Svelte design system for the modern web</title>
	<meta name="description" content="248+ components, 53+ composables, 126 theme combinations — everything you need to build beautiful Svelte apps." />
</svelte:head>

<div class="min-h-screen">
	<!-- Section 1: Hero -->
	<HeroBanner
		badge="Svelte 5 + Tailwind CSS v4"
		titleGradient={true}
		description="248+ components, 53+ composables, 126 theme combinations — everything you need to build beautiful SaaS apps with Svelte 5."
		background="gradient"
		level={1}
	>
		{#snippet title()}
			<span>The Svelte design system for the modern web</span>
		{/snippet}
	</HeroBanner>

	<div class="flex items-center justify-center gap-4 pb-12">
		<Button size="lg" href="/docs/getting-started">Get Started →</Button>
		<Button size="lg" variant="outline" href="https://github.com/aleconstancio/bindrunes" target="_blank" rel="noopener noreferrer">View on GitHub</Button>
	</div>

	<!-- Section 2: Social Proof Bar -->
	<section class="border-y border-border bg-muted/30">
		<div class="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center justify-center gap-3">
			<Badge variant="outline">Svelte 5</Badge>
			<Badge variant="outline">Tailwind CSS v4</Badge>
			<Badge variant="outline">TypeScript</Badge>
			<Badge variant="outline">MIT Licensed</Badge>
			<Badge variant="outline">SSR Ready</Badge>
		</div>
	</section>

	<!-- Section 3: Stats -->
	<section class="border-b border-border">
		<div class="max-w-5xl mx-auto px-4 py-16">
			<div class="grid grid-cols-3 gap-8 text-center">
				<div>
					<div class="text-display-1 text-foreground font-bold">248+</div>
					<div class="text-body-sm text-muted-foreground mt-2">Components</div>
				</div>
				<div>
					<div class="text-display-1 text-foreground font-bold">126</div>
					<div class="text-body-sm text-muted-foreground mt-2">Theme Combinations</div>
				</div>
				<div>
					<div class="text-display-1 text-foreground font-bold">10</div>
					<div class="text-body-sm text-muted-foreground mt-2">Domain Categories</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Section 4: Why bindrunes -->
	<section class="border-b border-border">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 py-20">
			<SectionHeading
				eyebrow="Why bindrunes"
				title="Built for real applications"
				description="Not just primitives. Full domain components, design system, and meta-framework."
			/>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
				{#each features as feature}
					<Card variant="elevated" padding>
						<div class="flex items-start gap-4">
							<IconCircle tone="primary">
								<feature.icon class="h-5 w-5" />
							</IconCircle>
							<div class="space-y-1">
								<h3 class="text-title-2 text-foreground">{feature.title}</h3>
								<p class="text-body-sm text-muted-foreground">{feature.description}</p>
							</div>
						</div>
					</Card>
				{/each}
			</div>
		</div>
	</section>

	<!-- Section 5: Three-Axis Design System -->
	<section class="border-b border-border">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 py-20">
			<SectionHeading
				eyebrow="Core Concept"
				title="Three-Axis Design System"
				description="Theme, aesthetic, and density are fully independent. Mix any combination."
			/>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
				{#each axes as axis}
					<Card padding class="text-center space-y-3">
						<h3 class="text-title-2 text-foreground">{axis.axis}</h3>
						<p class="text-body-sm text-muted-foreground">{axis.description}</p>
						<div class="flex flex-wrap justify-center gap-1.5">
							{#each axis.values as value}
								<Badge variant="outline" size="sm">{value}</Badge>
							{/each}
						</div>
					</Card>
				{/each}
			</div>
		</div>
	</section>

	<!-- Section 6: Code Example -->
	<section class="border-b border-border">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 py-20">
			<SectionHeading
				eyebrow="Quick Start"
				title="Start building in seconds"
			/>

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4 items-start">
				<div class="space-y-6">
					<p class="text-body-lg text-muted-foreground">
						Install bindrunes, wrap your app in a ThemeProvider, and start using production-ready components immediately. No configuration required.
					</p>
					<div class="space-y-3">
						<h4 class="text-title-3 text-foreground">1. Install</h4>
						<CodeSnippet code={installCode} language="bash" title="terminal" />
					</div>
					<div class="space-y-3">
						<h4 class="text-title-3 text-foreground">2. Wrap your layout</h4>
						<CodeSnippet code={layoutCode} language="svelte" title="+layout.svelte" />
					</div>
					<div class="space-y-3">
						<h4 class="text-title-3 text-foreground">3. Use components</h4>
						<CodeSnippet code={componentCode} language="svelte" title="+page.svelte" />
					</div>
				</div>
				<div class="space-y-6 lg:sticky lg:top-8">
					<div class="rounded-[--radius-lg] border border-border bg-muted/30 p-6 space-y-4">
						<h4 class="text-title-2 text-foreground">What you get</h4>
						<ul class="space-y-2 text-body-sm text-muted-foreground">
							<li class="flex items-start gap-2">
								<span class="text-primary mt-0.5">✓</span>
								248+ production-ready components
							</li>
							<li class="flex items-start gap-2">
								<span class="text-primary mt-0.5">✓</span>
								126 theme combinations out of the box
							</li>
							<li class="flex items-start gap-2">
								<span class="text-primary mt-0.5">✓</span>
								10 domain-specific component sets
							</li>
							<li class="flex items-start gap-2">
								<span class="text-primary mt-0.5">✓</span>
								Full SvelteKit integration
							</li>
							<li class="flex items-start gap-2">
								<span class="text-primary mt-0.5">✓</span>
								Built-in LLM chat components
							</li>
							<li class="flex items-start gap-2">
								<span class="text-primary mt-0.5">✓</span>
								TypeScript-first, SSR-ready
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Section 7: CTA -->
	<CtaBanner
		title="Ready to build?"
		description="Join the Svelte ecosystem with the most complete design system."
		ctaLabel="Get Started"
		ctaHref="/docs/getting-started"
		secondaryLabel="View Documentation"
		secondaryHref="/docs"
	/>
</div>
