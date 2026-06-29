<script lang="ts">
	import { createSidebarState, DashboardShell, DashboardShellSplit } from "bindrunes/layouts";
	import { Card } from "bindrunes";
	import { Button } from "bindrunes";

	const sidebar = createSidebarState(true);

	const navGroups = [
		{ label: "Main", items: [{ title: "Dashboard", to: "/dashboard", description: "Overview", icon: null }] },
	];

	const items = [
		{ id: "1", name: "Project Alpha", status: "Active" },
		{ id: "2", name: "Project Beta", status: "Draft" },
		{ id: "3", name: "Project Gamma", status: "Archived" },
	];

	let selectedId = $state("1");
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
	<a href="/dashboard" class="text-body-sm text-muted-foreground hover:text-foreground transition-colors">&larr; Back to Dashboard</a>
</div>

<DashboardShell {sidebar} {navGroups}>
	<DashboardShellSplit resizable>
		{#snippet listPanel()}
			<div class="p-4 space-y-2">
				<h3 class="text-title-2 text-foreground mb-4">Projects</h3>
				{#each items as item}
					<button
						type="button"
						class="w-full text-left p-3 rounded-[--radius] transition-colors cursor-pointer
						       {selectedId === item.id ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-foreground'}"
						onclick={() => selectedId = item.id}
					>
						<p class="text-label-md">{item.name}</p>
						<p class="text-body-xs text-muted-foreground">{item.status}</p>
					</button>
				{/each}
			</div>
		{/snippet}

		{#snippet detailPanel()}
			<div class="p-8">
				<Card padding>
					<h2 class="text-title-1 text-foreground mb-4">Project Details</h2>
					<p class="text-body-md text-muted-foreground mb-4">
						Selected: {items.find(i => i.id === selectedId)?.name ?? "None"}
					</p>
					<Button size="sm">Edit Project</Button>
				</Card>
			</div>
		{/snippet}
	</DashboardShellSplit>
</DashboardShell>
