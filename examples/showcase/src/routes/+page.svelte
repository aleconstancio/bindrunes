<script lang="ts">
	import { Button, Badge } from "bindrunes";
	import {
		Layout,
		Palette,
		Server,
		Bot,
		Copy,
		Check,
	} from "lucide-svelte";

	const features = [
		{
			icon: Layout,
			title: "Domain Components",
			description:
				"10 pre-built domains: auth, dashboard, data, e-commerce, chat, and more. Production-ready out of the box.",
			tone: "primary",
		},
		{
			icon: Palette,
			title: "Three-Axis Design",
			description:
				"Theme × Aesthetic × Density = 126 unique combinations. OKLCH colors, CSS custom properties.",
			tone: "accent",
		},
		{
			icon: Server,
			title: "SvelteKit Integration",
			description:
				"Full-stack or SPA mode. Auth, API routes, i18n, and deployment adapters built-in.",
			tone: "indigo",
		},
		{
			icon: Bot,
			title: "Agentic Copilot",
			description:
				"Built-in LLM chat components. Token budgets, conversation branching, streaming. The only Svelte library with this.",
			tone: "violet",
		},
	];

	const axes = [
		{
			axis: "Theme",
			subtitle: "Color identity",
			values: ["editorial", "dracula", "nord", "catppuccin", "rose-pine", "github"],
		},
		{
			axis: "Aesthetic",
			subtitle: "Form & motion",
			values: ["minimal", "glass", "bento", "expressive", "neon", "brutalist", "organic"],
		},
		{
			axis: "Density",
			subtitle: "Spacing scale",
			values: ["compact", "comfortable", "spacious"],
		},
	];

	const steps = [
		{
			title: "Install",
			file: "terminal",
			code: "bun add bindrunes",
		},
		{
			title: "Wrap your layout",
			file: "+layout.svelte",
			code: `<` + `script>
  import { AppProvider } from "bindrunes";
  let { children } = $props();
<` + `/script>

<AppProvider themeDefault="editorial">
  {@render children()}
</AppProvider>`,
		},
		{
			title: "Use components",
			file: "+page.svelte",
			code: `<` + `script>
  import { Button, Card, Badge } from "bindrunes";
<` + `/script>

<Card variant="glass" padding>
  <h2 class="text-title-1">Hello World</h2>
  <p class="text-body text-muted-foreground">
    Built with bindrunes.
  </p>
  <Button variant="primary">Get Started →</Button>
</Card>`,
		},
	];

	let copiedIndex = $state<number | null>(null);

	function copyCode(code: string, index: number) {
		navigator.clipboard.writeText(code);
		copiedIndex = index;
		setTimeout(() => (copiedIndex = null), 2000);
	}
</script>

<svelte:head>
	<title>bindrunes — The Svelte design system for the modern web</title>
	<meta name="description" content="234 components, 25 composables, 126 theme combinations — everything you need to build beautiful Svelte apps." />
</svelte:head>

<div class="landing-page">
	<!-- ═══ Hero ═══ -->
	<section class="hero-section">
		<div class="hero-badge">
			Svelte 5 + Tailwind CSS v4
		</div>
		<h1 class="hero-title">The Svelte design system for the modern web</h1>
		<p class="hero-subtitle">
			234 components, 25 composables, 126 theme combinations — everything you need to build beautiful SaaS apps with Svelte 5.
		</p>
		<div class="hero-ctas">
			<Button size="lg" href="/docs/getting-started">Get Started →</Button>
			<Button size="lg" variant="outline" href="https://github.com/aleconstancio/bindrunes" target="_blank" rel="noopener noreferrer">View on GitHub</Button>
		</div>
	</section>

	<!-- ═══ Social Proof ═══ -->
	<section class="social-proof">
		<span class="proof-badge">Svelte 5</span>
		<span class="proof-badge">Tailwind CSS v4</span>
		<span class="proof-badge">TypeScript</span>
		<span class="proof-badge">MIT Licensed</span>
		<span class="proof-badge">SSR Ready</span>
	</section>

	<!-- ═══ Stats ═══ -->
	<section class="stats-section">
		<div class="stat-item">
			<div class="stat-number">248+</div>
			<div class="stat-label">Components</div>
		</div>
		<div class="stat-item">
			<div class="stat-number">126</div>
			<div class="stat-label">Theme Combinations</div>
		</div>
		<div class="stat-item">
			<div class="stat-number">10</div>
			<div class="stat-label">Domain Categories</div>
		</div>
	</section>

	<!-- ═══ Why bindrunes ═══ -->
	<section class="landing-section">
		<div style="text-align: center; max-width: 56rem; margin: 0 auto; padding: 0 1.5rem;">
			<p class="section-eyebrow">Why bindrunes</p>
			<h2 class="section-title">Built for real applications</h2>
			<p class="section-description">Not just primitives. Full domain components, design system, and meta-framework.</p>
		</div>

		<div class="feature-grid">
			{#each features as feature}
				<div class="feature-card">
					<div class="feature-icon {feature.tone}">
						<feature.icon size={20} />
					</div>
					<h3>{feature.title}</h3>
					<p>{feature.description}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- ═══ Three-Axis Design System ═══ -->
	<section class="landing-section">
		<div style="text-align: center; max-width: 56rem; margin: 0 auto; padding: 0 1.5rem;">
			<p class="section-eyebrow">Core Concept</p>
			<h2 class="section-title">Three-Axis Design System</h2>
			<p class="section-description">Theme, aesthetic, and density are fully independent. Mix any combination.</p>
		</div>

		<div class="axis-grid">
			{#each axes as axis}
				<div class="axis-card">
					<h3>{axis.axis}</h3>
					<p class="axis-subtitle">{axis.subtitle}</p>
					<div class="axis-tags">
						{#each axis.values as value}
							<span class="axis-tag">{value}</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- ═══ Quick Start ═══ -->
	<section class="landing-section">
		<div class="code-section">
			<div style="text-align: center;">
				<p class="section-eyebrow">Quick Start</p>
				<h2 class="section-title">Start building in seconds</h2>
			</div>

			<div class="code-grid">
				<div class="code-steps">
					{#each steps as step, i}
						<div class="code-step">
							<div class="code-step-header">
								<span class="code-step-title">{step.title}</span>
								<button
									class="copy-btn"
									onclick={() => copyCode(step.code, i)}
									aria-label="Copy code"
								>
									{#if copiedIndex === i}
										<Check size={14} />
									{:else}
										<Copy size={14} />
									{/if}
								</button>
							</div>
							<pre><code>{step.code}</code></pre>
						</div>
					{/each}
				</div>

				<div class="what-you-get">
					<h3>What you get</h3>
					<ul>
						<li>248+ production-ready components</li>
						<li>126 theme combinations out of the box</li>
						<li>10 domain-specific component sets</li>
						<li>Full SvelteKit integration</li>
						<li>Built-in LLM chat components</li>
						<li>TypeScript-first, SSR-ready</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══ CTA ═══ -->
	<section class="cta-section">
		<h2 class="cta-title">Ready to build?</h2>
		<p class="cta-subtitle">Join the Svelte ecosystem with the most complete design system.</p>
		<div class="hero-ctas">
			<Button size="lg" href="/docs/getting-started">Get Started →</Button>
			<Button size="lg" variant="outline" href="/docs">View Documentation</Button>
		</div>
	</section>
</div>
