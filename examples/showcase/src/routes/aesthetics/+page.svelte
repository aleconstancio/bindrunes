<script lang="ts">
	import { PageHeader } from "urupe-ui/layouts";
	import { Badge, Button, Card, Input, Alert } from "urupe-ui";

	const aesthetics = ["minimal", "glass", "bento", "expressive"] as const;

	const aestheticDescriptions: Record<string, string> = {
		minimal: "Flat surfaces, hairline borders, snappy 120ms transitions.",
		glass: "Translucent surfaces, ambient bloom, fluid 250ms transitions.",
		bento: "Rounded corners, soft shadows, bouncy 220ms spring transitions.",
		expressive: "Dramatic shadows, gradient buttons, dramatic 300ms transitions.",
	};

	let activeAesthetic = $state<string>("minimal");
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
	<PageHeader title="Aesthetic Comparison" description="All 4 aesthetics side by side. Each aesthetic overrides form tokens (radius, shadow, motion)." />

	<!-- Aesthetic selector -->
	<div class="flex flex-wrap gap-2">
		{#each aesthetics as aesthetic}
			<button
				type="button"
				onclick={() => activeAesthetic = aesthetic}
				class="px-4 py-2 rounded-[--radius-sm] text-label-sm transition-colors cursor-pointer border {activeAesthetic === aesthetic ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted'}"
			>
				{aesthetic}
			</button>
		{/each}
		<button
			type="button"
			onclick={() => activeAesthetic = 'all'}
			class="px-4 py-2 rounded-[--radius-sm] text-label-sm transition-colors cursor-pointer border {activeAesthetic === 'all' ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted'}"
		>
			All Aesthetics
		</button>
	</div>

	{#if activeAesthetic === 'all'}
		<!-- Grid comparison -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			{#each aesthetics as aesthetic}
				<div data-aesthetic={aesthetic} class="rounded-[--radius-lg] border border-border bg-background p-5 space-y-4">
					<div class="flex items-center justify-between">
						<h3 class="text-title-2 text-foreground">{aesthetic}</h3>
						<Badge variant="soft" size="sm">aesthetic</Badge>
					</div>
					<p class="text-body-sm text-muted-foreground">{aestheticDescriptions[aesthetic]}</p>

					<div class="space-y-3">
						<div class="flex gap-2">
							<Button variant="primary" size="sm">Primary</Button>
							<Button variant="outline" size="sm">Outline</Button>
							<Button variant="ghost" size="sm">Ghost</Button>
						</div>

						<Input placeholder="Text input..." label="Name" />

						<Alert variant="info" title="Info">Aesthetic-specific form rendering.</Alert>

						<Card variant="glass" padding class="text-body-sm text-muted-foreground">
							Glass card variant
						</Card>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<!-- Single aesthetic detail -->
		<div data-aesthetic={activeAesthetic} class="rounded-[--radius-lg] border border-border bg-background p-8 space-y-6">
			<div>
				<h2 class="text-display-3 text-foreground">{activeAesthetic}</h2>
				<p class="text-body-lg text-muted-foreground mt-1">{aestheticDescriptions[activeAesthetic]}</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<!-- Buttons -->
				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">Buttons</h3>
					<div class="flex flex-wrap gap-2">
						<Button variant="primary">Primary</Button>
						<Button variant="secondary">Secondary</Button>
						<Button variant="outline">Outline</Button>
						<Button variant="ghost">Ghost</Button>
						<Button variant="destructive">Destructive</Button>
						<Button variant="soft">Soft</Button>
					</div>
				</Card>

				<!-- Form -->
				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">Form Elements</h3>
					<div class="space-y-3">
						<Input placeholder="Text input..." label="Name" />
						<Input placeholder="Email..." label="Email" type="email" />
					</div>
				</Card>

				<!-- Cards -->
				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">Card Variants</h3>
					<div class="space-y-3">
						<Card variant="surface" padding>Surface card</Card>
						<Card variant="glass" padding>Glass card</Card>
						<Card variant="outlined" padding>Outlined card</Card>
						<Card variant="ghost" padding>Ghost card</Card>
					</div>
				</Card>

				<!-- Alerts -->
				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">Alerts</h3>
					<div class="space-y-2">
						<Alert variant="info" title="Info">Information message.</Alert>
						<Alert variant="success" title="Success">Success message.</Alert>
						<Alert variant="warning" title="Warning">Warning message.</Alert>
						<Alert variant="error" title="Error">Error message.</Alert>
					</div>
				</Card>

				<!-- Interactive elements -->
				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">Interactive</h3>
					<div class="space-y-3">
						<div class="flex gap-2">
							<Button variant="primary" size="sm">Hover me</Button>
							<Button variant="outline" size="sm">Focus me</Button>
						</div>
						<p class="text-body-sm text-muted-foreground">
							Watch the transitions and shadows change between aesthetics.
						</p>
					</div>
				</Card>

				<!-- Radius showcase -->
				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">Border Radius</h3>
					<div class="flex gap-3">
						<div class="h-16 w-16 rounded-[--radius-sm] bg-primary/20 flex items-center justify-center text-label-xs text-primary">sm</div>
						<div class="h-16 w-16 rounded-[--radius-md] bg-primary/20 flex items-center justify-center text-label-xs text-primary">md</div>
						<div class="h-16 w-16 rounded-[--radius-lg] bg-primary/20 flex items-center justify-center text-label-xs text-primary">lg</div>
						<div class="h-16 w-16 rounded-[--radius-xl] bg-primary/20 flex items-center justify-center text-label-xs text-primary">xl</div>
					</div>
				</Card>
			</div>
		</div>
	{/if}
</div>
