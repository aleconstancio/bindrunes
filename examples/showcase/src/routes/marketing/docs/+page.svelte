<script lang="ts">
	import { PageHeader } from "bindrunes/layouts";
	import { Card, Badge } from "bindrunes";
	import { DocsLayout } from "bindrunes/domains/marketing";

	const sections = [
		{ id: "getting-started", title: "Getting Started" },
		{ id: "installation", title: "Installation" },
		{ id: "theming", title: "Theming" },
		{ id: "components", title: "Components" },
		{ id: "composables", title: "Composables" },
		{ id: "api-reference", title: "API Reference" },
	];

	let activeSection = $state("getting-started");
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
	<PageHeader title="Documentation Layout" description="Sidebar navigation with scroll-spy and content sections" />
</div>

<DocsLayout {sections} bind:activeId={activeSection}>
	<div class="space-y-12">
		<!-- Getting Started -->
		<section id="getting-started" class="space-y-4">
			<h1 class="text-display-3 text-foreground">Getting Started</h1>
			<p class="text-body-lg text-muted-foreground">
				bindrunes is a comprehensive Svelte 5 component library with a three-axis design system.
				It provides 160+ components, 47 composables, and pre-built page patterns for B2B SaaS applications.
			</p>
			<div class="flex gap-2">
				<Badge variant="primary">Svelte 5</Badge>
				<Badge variant="primary">Tailwind v4</Badge>
				<Badge variant="primary">TypeScript</Badge>
			</div>
		</section>

		<!-- Installation -->
		<section id="installation" class="space-y-4">
			<h2 class="text-display-3 text-foreground">Installation</h2>
			<p class="text-body text-muted-foreground">
				Install bindrunes and its peer dependencies using your preferred package manager.
			</p>
			<div class="rounded-[--radius-lg] bg-muted p-4 font-mono text-body-sm text-foreground">
				<p>bun add bindrunes</p>
				<p>bun add svelte tailwindcss lucide-svelte mode-watcher svelte-sonner</p>
			</div>
			<p class="text-body text-muted-foreground">
				Then configure your CSS and Vite config as shown in the Getting Started guide.
			</p>
		</section>

		<!-- Theming -->
		<section id="theming" class="space-y-4">
			<h2 class="text-display-3 text-foreground">Theming</h2>
			<p class="text-body text-muted-foreground">
				The three-axis design system lets you customize theme (color), aesthetic (form), and density (spacing) independently.
				Any combination of the 6 themes, 4 aesthetics, and 3 densities works together.
			</p>
			<div class="grid grid-cols-3 gap-4">
				<Card padding>
					<h3 class="text-title-3 text-foreground mb-2">Themes</h3>
					<p class="text-body-sm text-muted-foreground">6 color presets: editorial, dracula, nord, catppuccin, rose-pine, github</p>
				</Card>
				<Card padding>
					<h3 class="text-title-3 text-foreground mb-2">Aesthetics</h3>
					<p class="text-body-sm text-muted-foreground">4 form presets: editorial, glass, bento, expressive</p>
				</Card>
				<Card padding>
					<h3 class="text-title-3 text-foreground mb-2">Density</h3>
					<p class="text-body-sm text-muted-foreground">3 spacing modes: compact, comfortable, spacious</p>
				</Card>
			</div>
		</section>

		<!-- Components -->
		<section id="components" class="space-y-4">
			<h2 class="text-display-3 text-foreground">Components</h2>
			<p class="text-body text-muted-foreground">
				Over 160 components organized into primitives, layouts, overlays, forms, data display, and pre-composed page patterns.
				All components use Svelte 5 runes and adapt to the active design axes.
			</p>
			<p class="text-body text-muted-foreground">
				Visit the <a href="/components" class="text-primary hover:underline">Component Index</a> to browse all available components.
			</p>
		</section>

		<!-- Composables -->
		<section id="composables" class="space-y-4">
			<h2 class="text-display-3 text-foreground">Composables</h2>
			<p class="text-body text-muted-foreground">
				47 composables following the <code class="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-body-sm">createX()</code> pattern.
				Cover data fetching, form validation, auth, i18n, and UI primitives.
			</p>
			<div class="grid grid-cols-2 gap-4">
				<Card padding>
					<h3 class="text-title-3 text-foreground mb-2">Data Layer</h3>
					<p class="text-body-sm text-muted-foreground">useQuery, useMutation, createApiClient, RealtimeClient</p>
				</Card>
				<Card padding>
					<h3 class="text-title-3 text-foreground mb-2">Forms</h3>
					<p class="text-body-sm text-muted-foreground">useForm, createWizard, validateWithSchema</p>
				</Card>
				<Card padding>
					<h3 class="text-title-3 text-foreground mb-2">Auth</h3>
					<p class="text-body-sm text-muted-foreground">useAuth, useAccess, hasRole</p>
				</Card>
				<Card padding>
					<h3 class="text-title-3 text-foreground mb-2">UI</h3>
					<p class="text-body-sm text-muted-foreground">useBreakpoint, useClipboard, useDebounce, useToggle</p>
				</Card>
			</div>
		</section>

		<!-- API Reference -->
		<section id="api-reference" class="space-y-4">
			<h2 class="text-display-3 text-foreground">API Reference</h2>
			<p class="text-body text-muted-foreground">
				Full TypeScript types are exported for every component prop, composable option, and event handler.
				Auto-generated <code class="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-body-sm">.d.ts</code> files are included in the package.
			</p>
			<p class="text-body text-muted-foreground">
				See the <a href="https://github.com/aleconstancio/bindrunes" class="text-primary hover:underline">GitHub repository</a> for source code and type definitions.
			</p>
		</section>
	</div>
</DocsLayout>
