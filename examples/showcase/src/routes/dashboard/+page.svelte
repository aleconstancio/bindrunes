<script lang="ts">
	import { createSidebarState, Tabs, TabsList, TabsTrigger, TabsContent, Collapsible, CodeSnippet } from "bindrunes";
	import { DashboardShell, DashboardShellRight, DashboardShellTopnav, Button, Card } from "bindrunes";
	import { DashboardHome } from "bindrunes/boundrune";
	import { ActivityFeed } from "bindrunes/boundrune";
	import { QuickActions } from "bindrunes/boundrune";
	import { DashboardFooter } from "bindrunes/boundrune";

	const navGroups = [
		{
			label: "Main",
			items: [
				{ title: "Dashboard", to: "/dashboard", description: "Overview", icon: "📊" },
				{ title: "Analytics", to: "/dashboard", description: "Charts", icon: "📈" },
			],
		},
		{
			label: "Management",
			items: [
				{ title: "Users", to: "/dashboard", description: "Team members", icon: "👥" },
				{ title: "Settings", to: "/dashboard", description: "Configuration", icon: "⚙️" },
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
		{ label: "New Project", icon: "📁", variant: "primary" as const, onClick: () => {} },
		{ label: "Invite Member", icon: "👤", variant: "outline" as const, onClick: () => {} },
		{ label: "View Reports", icon: "📊", variant: "outline" as const, onClick: () => {} },
		{ label: "Settings", icon: "⚙️", variant: "ghost" as const, onClick: () => {} },
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

	let activeVariant = $state("default");
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-display-2 text-foreground">Dashboard Components</h1>
			<p class="text-body-lg text-muted-foreground mt-1">Shell variants, stats, activity feeds, and dashboard widgets</p>
		</div>
		<Button href="/dashboard/split" variant="outline" size="sm">View Split Layout →</Button>
	</div>

	<!-- Shell Variant Selector -->
	<Card padding>
		<h3 class="text-title-2 text-foreground mb-4">Shell Variants</h3>
		<p class="text-body-sm text-muted-foreground mb-4">
			DashboardShell supports 3 layout variants: default (left sidebar), right sidebar, and top navigation.
			Select a variant to see how it changes the layout.
		</p>
		<div class="flex gap-2">
			<Button
				size="sm"
				variant={activeVariant === "default" ? "primary" : "outline"}
				onclick={() => activeVariant = "default"}
			>
				Default (Left Sidebar)
			</Button>
			<Button
				size="sm"
				variant={activeVariant === "right" ? "primary" : "outline"}
				onclick={() => activeVariant = "right"}
			>
				Right Sidebar
			</Button>
			<Button
				size="sm"
				variant={activeVariant === "topnav" ? "primary" : "outline"}
				onclick={() => activeVariant = "topnav"}
			>
				Top Navigation
			</Button>
		</div>
	</Card>
	<Collapsible>
		{#snippet trigger()}
			<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
		{/snippet}
		<div class="space-y-2 mt-2">
			<CodeSnippet
				code={`import { DashboardShell, DashboardShellRight, DashboardShellTopnav } from "bindrunes/boundrune";\n\nconst navGroups = [\n  { label: "Main", items: [\n    { title: "Dashboard", to: "/dashboard", description: "Overview", icon: "📊" },\n    { title: "Analytics", to: "/dashboard", description: "Charts", icon: "📈" },\n  ]},\n];\n\n<!-- Default: Left sidebar -->\n<DashboardShell navigation={navGroups} appName="bindrunes" defaultTitle="Dashboard">\n  <!-- content -->\n</DashboardShell>\n\n<!-- Right sidebar -->\n<DashboardShellRight navigation={navGroups} appName="bindrunes" />\n\n<!-- Top navigation -->\n<DashboardShellTopnav navigation={navGroups} appName="bindrunes" />`}
				language="svelte"
				title="Dashboard Shell"
			/>
		</div>
	</Collapsible>

	<!-- Dashboard Preview -->
	{#if activeVariant === "default"}
		<DashboardShell
			navigation={navGroups}
			appName="bindrunes"
			defaultTitle="Dashboard"
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
				brand="bindrunes"
				links={[
					{ label: "Privacy", href: "#" },
					{ label: "Terms", href: "#" },
					{ label: "Support", href: "#" },
				]}
			/>
		</DashboardShell>
		<Collapsible>
			{#snippet trigger()}
				<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
			{/snippet}
			<div class="space-y-2 mt-2">
				<CodeSnippet
					code={`import { DashboardShell, DashboardHome, ActivityFeed, QuickActions, DashboardFooter } from "bindrunes/boundrune";\n\n<DashboardShell navigation={navGroups} appName="bindrunes" defaultTitle="Dashboard">\n  <DashboardHome title="Dashboard Overview" {stats}>\n    {#snippet chart()}\n      <!-- Chart content -->\n    {/snippet}\n    {#snippet recentActivity()}\n      <ActivityFeed items={activity} />\n    {/snippet}\n  </DashboardHome>\n\n  <QuickActions actions={quickActions} />\n\n  <DashboardFooter brand="bindrunes" links={footerLinks} />\n</DashboardShell>`}
					language="svelte"
					title="Dashboard Home"
				/>
			</div>
		</Collapsible>
	{:else if activeVariant === "right"}
		<DashboardShellRight
			navigation={navGroups}
			appName="bindrunes"
			defaultTitle="Dashboard"
		>
			<DashboardHome title="Right Sidebar Layout" {stats}>
				{#snippet chart()}
					<div class="p-4 text-center text-muted-foreground">
						<p>Same content, right sidebar layout</p>
					</div>
				{/snippet}

				{#snippet recentActivity()}
					<ActivityFeed items={activity} />
				{/snippet}
			</DashboardHome>
		</DashboardShellRight>
	{:else}
		<DashboardShellTopnav
			navigation={navGroups}
			appName="bindrunes"
			defaultTitle="Dashboard"
		>
			<DashboardHome title="Top Navigation Layout" {stats}>
				{#snippet chart()}
					<div class="p-4 text-center text-muted-foreground">
						<p>Same content, top navigation layout</p>
					</div>
				{/snippet}

				{#snippet recentActivity()}
					<ActivityFeed items={activity} />
				{/snippet}
			</DashboardHome>
		</DashboardShellTopnav>
	{/if}
</div>
