<script lang="ts">
import { AppProvider, Badge, Button, Card, CodeSnippet, Input } from "urupe-ui";

const themes = [
	{ value: "editorial", label: "Editorial", description: "Warm grey with indigo accents" },
	{ value: "dracula", label: "Dracula", description: "Deep purple with vibrant magenta" },
	{ value: "nord", label: "Nord", description: "Cool blue-grey with icy blue" },
	{ value: "catppuccin", label: "Catppuccin", description: "Soft lavender with pastel purple" },
	{ value: "rose-pine", label: "Rose Pine", description: "Warm rose with muted coral" },
	{ value: "github", label: "GitHub", description: "Neutral grey with saturated blue" },
] as const;

const aesthetics = [
	{ value: "minimal", label: "Minimal", description: "Flat, snappy 120ms" },
	{ value: "glass", label: "Glass", description: "Glassmorphism, fluid 250ms" },
	{ value: "bento", label: "Bento", description: "Rounded, bouncy 220ms" },
	{ value: "expressive", label: "Expressive", description: "Dramatic 300ms" },
	{ value: "neon", label: "Neon", description: "Glow effects, sharp edges" },
	{ value: "brutalist", label: "Brutalist", description: "Raw, unstyled, heavy borders" },
	{ value: "organic", label: "Organic", description: "Flowing, soft, natural" },
] as const;

const densities = [
	{ value: "compact", label: "Compact", description: "~0.8x spacing" },
	{ value: "comfortable", label: "Comfortable", description: "Standard 1x" },
	{ value: "spacious", label: "Spacious", description: "~1.25x spacing" },
] as const;

let selectedTheme = $state<string>("editorial");
let selectedAesthetic = $state<string>("minimal");
let selectedDensity = $state<string>("comfortable");

const cssExport = $derived(`<html
  data-theme="${selectedTheme}"
  data-aesthetic="${selectedAesthetic}"
  data-density="${selectedDensity}"
>`);
</script>

<div class="p-6 lg:p-8 max-w-4xl">
	<Badge variant="primary">Playground</Badge>
	<h1 class="mt-4 text-display-1 text-foreground">Theme Builder</h1>
	<p class="mt-3 text-body-lg text-muted-foreground">
		Combine theme, aesthetic, and density to find the perfect look. Preview live and export the
		config.
	</p>

	<div class="mt-10 space-y-10">
		<!-- Theme Selector -->
		<section>
			<h2 class="text-title-1 text-foreground mb-4">Theme</h2>
			<div class="grid grid-cols-2 md:grid-cols-3 gap-3">
				{#each themes as theme}
					<button
						type="button"
						onclick={() => (selectedTheme = theme.value)}
						class="text-left p-3 rounded-lg border transition-colors {selectedTheme === theme.value
							? 'border-accent bg-accent/10 text-foreground'
							: 'border-border bg-surface-1 text-muted-foreground hover:border-accent/50'}"
					>
						<div class="text-sm font-medium">{theme.label}</div>
						<div class="text-xs mt-0.5 opacity-70">{theme.description}</div>
					</button>
				{/each}
			</div>
		</section>

		<!-- Aesthetic Selector -->
		<section>
			<h2 class="text-title-1 text-foreground mb-4">Aesthetic</h2>
			<div class="grid grid-cols-2 md:grid-cols-4 gap-3">
				{#each aesthetics as aesthetic}
					<button
						type="button"
						onclick={() => (selectedAesthetic = aesthetic.value)}
						class="text-left p-3 rounded-lg border transition-colors {selectedAesthetic === aesthetic.value
							? 'border-accent bg-accent/10 text-foreground'
							: 'border-border bg-surface-1 text-muted-foreground hover:border-accent/50'}"
					>
						<div class="text-sm font-medium">{aesthetic.label}</div>
						<div class="text-xs mt-0.5 opacity-70">{aesthetic.description}</div>
					</button>
				{/each}
			</div>
		</section>

		<!-- Density Selector -->
		<section>
			<h2 class="text-title-1 text-foreground mb-4">Density</h2>
			<div class="grid grid-cols-3 gap-3">
				{#each densities as density}
					<button
						type="button"
						onclick={() => (selectedDensity = density.value)}
						class="text-left p-3 rounded-lg border transition-colors {selectedDensity === density.value
							? 'border-accent bg-accent/10 text-foreground'
							: 'border-border bg-surface-1 text-muted-foreground hover:border-accent/50'}"
					>
						<div class="text-sm font-medium">{density.label}</div>
						<div class="text-xs mt-0.5 opacity-70">{density.description}</div>
					</button>
				{/each}
			</div>
		</section>

		<!-- Live Preview -->
		<section>
			<h2 class="text-title-1 text-foreground mb-4">Live Preview</h2>
			<AppProvider theme={selectedTheme} aesthetic={selectedAesthetic} density={selectedDensity}>
				<div class="p-6 rounded-xl border border-border bg-card">
					<div class="space-y-6">
						<div class="flex flex-wrap gap-3">
							<Button variant="primary">Primary</Button>
							<Button variant="secondary">Secondary</Button>
							<Button variant="outline">Outline</Button>
							<Button variant="ghost">Ghost</Button>
							<Button variant="destructive">Destructive</Button>
						</div>

						<Card variant="surface" padding>
							<h3 class="text-title-2 text-card-foreground">Sample Card</h3>
							<p class="text-body-sm text-muted-foreground mt-1">
								This card inherits the selected theme, aesthetic, and density.
							</p>
						</Card>

						<div class="max-w-sm space-y-3">
							<Input placeholder="Enter text..." label="Email" />
							<Input placeholder="Search..." type="search" />
						</div>
					</div>
				</div>
			</AppProvider>
		</section>

		<!-- CSS Export -->
		<section>
			<h2 class="text-title-1 text-foreground mb-4">CSS Export</h2>
			<p class="text-body text-muted-foreground mb-3">
				Add these attributes to your root element, or use the JS API:
			</p>
			<CodeSnippet language="html" title="data attributes">
{cssExport}
			</CodeSnippet>
			<div class="mt-3">
				<CodeSnippet language="ts" title="JS API">
{`import { useTheme, useAesthetic, useDensity } from "urupe-ui";

const theme = useTheme({ default: "${selectedTheme}" });
const aesthetic = useAesthetic({ default: "${selectedAesthetic}" });
const density = useDensity({ default: "${selectedDensity}" });`}
				</CodeSnippet>
			</div>
		</section>
	</div>
</div>
