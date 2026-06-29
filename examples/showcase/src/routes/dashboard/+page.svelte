<script lang="ts">
	import { DashboardTemplate } from "bindrunes/layouts";
	import { DashboardHome, ActivityFeed, QuickActions, DashboardFooter } from "bindrunes/domains/dashboard";
	import { Button, Card } from "bindrunes";
	import { Tabs, TabsList, TabsTrigger, TabsContent } from "bindrunes/layouts";
	import { Home, Users, Settings, BarChart3, FolderPlus, UserPlus, FileBarChart } from "lucide-svelte";

	const navigation = [
		{
			label: "Main",
			items: [
				{ title: "Dashboard", to: "/dashboard", description: "Overview", icon: Home },
				{ title: "Users", to: "/dashboard", description: "Manage users", icon: Users },
				{ title: "Analytics", to: "/dashboard", description: "View stats", icon: BarChart3 },
				{ title: "Settings", to: "/settings", description: "App settings", icon: Settings },
			],
		},
	];

	const stats = [
		{ label: "Total Revenue", value: "$48,250", change: "+12.5%", changeType: "positive" as const },
		{ label: "Active Users", value: "2,847", change: "+8.2%", changeType: "positive" as const },
		{ label: "Conversion Rate", value: "3.24%", change: "-0.4%", changeType: "negative" as const },
		{ label: "Avg. Response", value: "245ms", change: "-12ms", changeType: "positive" as const },
	];

	const activity = [
		{ id: "1", user: { name: "Alice", avatar: "" }, action: "created a new project", timestamp: "2 min ago" },
		{ id: "2", user: { name: "Bob", avatar: "" }, action: "updated settings", timestamp: "15 min ago" },
		{ id: "3", user: { name: "Charlie", avatar: "" }, action: "deployed to production", timestamp: "1 hour ago" },
		{ id: "4", user: { name: "Diana", avatar: "" }, action: "reviewed a pull request", timestamp: "2 hours ago" },
	];

	const quickActions = [
		{ label: "New Project", icon: FolderPlus, variant: "primary" as const, onClick: () => {} },
		{ label: "Invite Member", icon: UserPlus, variant: "outline" as const, onClick: () => {} },
		{ label: "View Reports", icon: BarChart3, variant: "outline" as const, onClick: () => {} },
		{ label: "Settings", icon: Settings, variant: "ghost" as const, onClick: () => {} },
	];

	// Chart data
	const chartData = [
		{ label: "Jan", value: 4000 },
		{ label: "Feb", value: 3000 },
		{ label: "Mar", value: 5000 },
		{ label: "Apr", value: 4500 },
		{ label: "May", value: 6000 },
		{ label: "Jun", value: 5500 },
		{ label: "Jul", value: 7000 },
	];

	const maxValue = Math.max(...chartData.map(d => d.value));
</script>

<DashboardTemplate
	appName="Showcase"
	title="Dashboard"
	description="Shell variants, stats, activity feeds, and dashboard widgets"
	{navigation}
	pathname="/dashboard"
>
	<DashboardHome title="Dashboard Overview" {stats}>
		{#snippet chart()}
			<div class="space-y-4">
				<h4 class="text-title-3 text-foreground">Revenue Trend</h4>
				<div class="flex items-end gap-2 h-48">
					{#each chartData as bar}
						<div class="flex-1 flex flex-col items-center gap-1">
							<div
								class="w-full rounded-t-[--radius-sm] bg-primary/80 transition-all duration-500"
								style="height: {(bar.value / maxValue) * 100}%"
							></div>
							<span class="text-label-xs text-muted-foreground">{bar.label}</span>
						</div>
					{/each}
				</div>
			</div>
		{/snippet}

		{#snippet recentActivity()}
			<ActivityFeed items={activity} />
		{/snippet}
	</DashboardHome>

	<div class="p-4 space-y-4">
		<h3 class="text-title-3 text-foreground">Quick Actions</h3>
		<QuickActions actions={quickActions} />
	</div>

	<DashboardFooter
		brand="Showcase"
		links={[
			{ label: "Privacy", href: "#" },
			{ label: "Terms", href: "#" },
			{ label: "Support", href: "#" },
		]}
	/>
</DashboardTemplate>
