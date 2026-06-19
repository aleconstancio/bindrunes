<script lang="ts">
	import { Badge, Button, Card, MetricCard, Spinner } from "bindrunes";
	import { createQuery } from "bindrunes-kit/client";

	interface DashboardStats {
		totalUsers: number;
		activeSubscriptions: number;
		monthlyRevenue: number;
		growthRate: number;
	}

	interface Activity {
		id: string;
		action: string;
		target: string;
		timestamp: string;
	}

	const stats = createQuery<DashboardStats>({
		key: "dashboard-stats",
		fetcher: async () => {
			const res = await fetch("/api/stats");
			return res.json();
		},
	});

	const recentActivity = createQuery<Activity[]>({
		key: "dashboard-activity",
		fetcher: async () => {
			const res = await fetch("/api/activity?limit=5");
			return res.json();
		},
	});

	function formatTime(iso: string) {
		const diff = Date.now() - new Date(iso).getTime();
		const mins = Math.floor(diff / 60000);
		if (mins < 1) return "just now";
		if (mins < 60) return `${mins}m ago`;
		const hours = Math.floor(mins / 60);
		if (hours < 24) return `${hours}h ago`;
		return `${Math.floor(hours / 24)}d ago`;
	}
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="p-6 space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-headline-2 text-foreground">Dashboard</h1>
			<p class="text-body-sm text-muted-foreground mt-1">Welcome back. Here's what's happening.</p>
		</div>
		<Button href="/app/items/new">New Item</Button>
	</div>

	{#if stats.isLoading}
		<div class="flex justify-center py-12">
			<Spinner />
		</div>
	{:else if stats.data}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
			<MetricCard
				label="Total Users"
				value={stats.data.totalUsers.toLocaleString()}
				variant="default"
			/>
			<MetricCard
				label="Subscriptions"
				value={stats.data.activeSubscriptions.toLocaleString()}
				variant="success"
			/>
			<MetricCard
				label="Monthly Revenue"
				value={`$${stats.data.monthlyRevenue.toLocaleString()}`}
				variant="primary"
			/>
			<MetricCard
				label="Growth"
				value={`${stats.data.growthRate > 0 ? "+" : ""}${stats.data.growthRate}%`}
				variant={stats.data.growthRate >= 0 ? "success" : "destructive"}
			/>
		</div>
	{/if}

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<div class="lg:col-span-2">
			<Card>
				<h3 class="text-label-lg text-foreground mb-4">Overview</h3>
				<div class="h-64 flex items-center justify-center text-muted-foreground text-body-sm">
					Chart placeholder — integrate your preferred charting library
				</div>
			</Card>
		</div>

		<Card>
			<h3 class="text-label-lg text-foreground mb-4">Recent Activity</h3>
			{#if recentActivity.isLoading}
				<Spinner />
			{:else if recentActivity.data && recentActivity.data.length > 0}
				<div class="space-y-3">
					{#each recentActivity.data as activity}
						<div class="flex items-start gap-3">
							<div class="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
							<div class="min-w-0">
								<p class="text-body-sm text-foreground">
									{activity.action}
									<span class="font-medium">{activity.target}</span>
								</p>
								<p class="text-mono-xs text-muted-foreground">
									{formatTime(activity.timestamp)}
								</p>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-body-sm text-muted-foreground text-center py-4">No recent activity</p>
			{/if}
		</Card>
	</div>
</div>
