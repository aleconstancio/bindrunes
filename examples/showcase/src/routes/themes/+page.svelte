<script lang="ts">
	import { PageHeader } from "urupe-ui/layouts";
	import { Badge, Button, Card, Input, Alert, StatusChip } from "urupe-ui";

	const themes = ["editorial", "dracula", "nord", "catppuccin", "rose-pine", "github"] as const;

	const themeDescriptions: Record<string, string> = {
		editorial: "Warm grey & indigo. Minimalist.",
		dracula: "Vibrant purple and dark accents.",
		nord: "Nordic blue-grey. Calm and professional.",
		catppuccin: "Soft modern pastels.",
		"rose-pine": "Warm muted tones.",
		github: "Accessible, universal palette.",
	};

	let activeTheme = $state<string>("editorial");
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
	<PageHeader title="Theme Comparison" description="All 6 themes side by side. Each theme overrides color tokens exclusively." />

	<!-- Theme selector -->
	<div class="flex flex-wrap gap-2">
		{#each themes as theme}
			<button
				type="button"
				onclick={() => activeTheme = theme}
				class="px-4 py-2 rounded-[--radius-sm] text-label-sm transition-colors cursor-pointer border {activeTheme === theme ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted'}"
			>
				{theme}
			</button>
		{/each}
		<button
			type="button"
		onclick={() => activeTheme = 'all'}
		class="px-4 py-2 rounded-[--radius-sm] text-label-sm transition-colors cursor-pointer border {activeTheme === 'all' ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted'}"
	>
		All Themes
	</button>
	</div>

	{#if activeTheme === 'all'}
		<!-- Grid comparison -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each themes as theme}
				<div data-theme={theme} class="rounded-[--radius-lg] border border-border bg-background p-5 space-y-4">
					<div class="flex items-center justify-between">
						<h3 class="text-title-2 text-foreground">{theme}</h3>
						<Badge variant="primary" size="sm">theme</Badge>
					</div>
					<p class="text-body-sm text-muted-foreground">{themeDescriptions[theme]}</p>

					<div class="space-y-3">
						<div class="flex gap-2">
							<Button variant="primary" size="sm">Primary</Button>
							<Button variant="outline" size="sm">Outline</Button>
							<Button variant="ghost" size="sm">Ghost</Button>
						</div>

						<div class="flex gap-2">
							<Badge variant="primary">Primary</Badge>
							<Badge variant="destructive">Destructive</Badge>
							<Badge variant="soft">Soft</Badge>
						</div>

						<Input placeholder="Text input..." label="Name" />

						<Alert variant="info" title="Info">Theme-specific color rendering.</Alert>

						<div class="flex gap-2">
							<StatusChip status="active" />
							<StatusChip status="pending" />
							<StatusChip status="error" />
						</div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<!-- Single theme detail -->
		<div data-theme={activeTheme} class="rounded-[--radius-lg] border border-border bg-background p-8 space-y-6">
			<div>
				<h2 class="text-display-3 text-foreground">{activeTheme}</h2>
				<p class="text-body-lg text-muted-foreground mt-1">{themeDescriptions[activeTheme]}</p>
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
						<Button variant="link">Link</Button>
					</div>
				</Card>

				<!-- Badges -->
				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">Badges</h3>
					<div class="flex flex-wrap gap-2">
						<Badge variant="primary">Primary</Badge>
						<Badge variant="secondary">Secondary</Badge>
						<Badge variant="outline">Outline</Badge>
						<Badge variant="destructive">Destructive</Badge>
						<Badge variant="soft">Soft</Badge>
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

				<!-- Status chips -->
				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">Status Chips</h3>
					<div class="flex gap-2">
						<StatusChip status="active" />
						<StatusChip status="inactive" />
						<StatusChip status="pending" />
						<StatusChip status="error" />
					</div>
				</Card>

				<!-- Card variants -->
				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">Card Variants</h3>
					<div class="space-y-2">
						<Card variant="surface" padding>Surface card</Card>
						<Card variant="glass" padding>Glass card</Card>
						<Card variant="outlined" padding>Outlined card</Card>
					</div>
				</Card>
			</div>
		</div>
	{/if}
</div>
