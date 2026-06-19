<script lang="ts">
	import { Button, Card, MetricCard, Spinner } from "bindrunes";
	import { createQuery } from "bindrunes-kit/client";

	interface QuickStat {
		label: string;
		value: string;
		variant?: "default" | "success" | "warning" | "destructive";
	}

	const quickStats = createQuery<QuickStat[]>({
		key: "home-stats",
		fetcher: async () => {
			const res = await fetch("/api/stats/quick");
			return res.json();
		},
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="p-6 space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-headline-2 text-foreground">Home</h1>
			<p class="text-body-sm text-muted-foreground mt-1">Your quick overview.</p>
		</div>
	</div>

	{#if quickStats.isLoading}
		<div class="flex justify-center py-12">
			<Spinner />
		</div>
	{:else if quickStats.data}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each quickStats.data as stat}
				<MetricCard
					label={stat.label}
					value={stat.value}
					variant={stat.variant}
				/>
			{/each}
		</div>
	{/if}

	<Card>
		<div class="text-center py-8 space-y-3">
			<h2 class="text-title-2 text-foreground">Get Started</h2>
			<p class="text-body-md text-muted-foreground max-w-md mx-auto">
				Welcome to your new app. Customize this page, add features, and make it yours.
			</p>
			<div class="flex justify-center gap-3 pt-2">
				<Button href="/app/settings">Configure Settings</Button>
				<Button variant="outline" href="/app/items">View Items</Button>
			</div>
		</div>
	</Card>
</div>
