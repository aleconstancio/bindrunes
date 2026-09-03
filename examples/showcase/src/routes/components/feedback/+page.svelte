<script lang="ts">
	import { PageHeader } from "urupe-ui/layouts";
	import { Card, Alert, Badge, StatusChip, Skeleton, Spinner, Progress, EmptyState, Collapsible, CodeSnippet } from "urupe-ui";

	let progressValue = $state(35);
	let loading = $state(false);

	function simulateLoad() {
		loading = true;
		progressValue = 0;
		const interval = setInterval(() => {
			progressValue += Math.random() * 20;
			if (progressValue >= 100) {
				progressValue = 100;
				clearInterval(interval);
				setTimeout(() => { loading = false; }, 500);
			}
		}, 200);
	}
</script>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
	<PageHeader title="Feedback Components" description="Alerts, status indicators, loading states, and progress" />

	<!-- Alert -->
	<Card padding>
		<h3 class="text-title-3 text-foreground mb-4">Alert</h3>
		<div class="space-y-3">
			<Alert variant="info" title="Information">This is an informational message.</Alert>
			<Alert variant="success" title="Success">Your changes have been saved successfully.</Alert>
			<Alert variant="warning" title="Warning">Please review before proceeding.</Alert>
			<Alert variant="error" title="Error">Something went wrong. Please try again.</Alert>
		</div>
	</Card>
	<Collapsible>
		{#snippet trigger()}
			<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
		{/snippet}
		<div class="space-y-2 mt-2">
			<CodeSnippet
				code={`import { Alert } from "urupe-ui";\n\n<Alert variant="info" title="Information">This is an informational message.</Alert>\n<Alert variant="success" title="Success">Your changes have been saved.</Alert>\n<Alert variant="warning" title="Warning">Please review before proceeding.</Alert>\n<Alert variant="error" title="Error">Something went wrong.</Alert>`}
				language="svelte"
				title="Alert"
			/>
		</div>
	</Collapsible>

	<!-- StatusChip -->
	<Card padding>
		<h3 class="text-title-3 text-foreground mb-4">StatusChip</h3>
		<div class="flex flex-wrap gap-2">
			<StatusChip status="active" />
			<StatusChip status="inactive" />
			<StatusChip status="pending" />
			<StatusChip status="error" />
		</div>
	</Card>
	<Collapsible>
		{#snippet trigger()}
			<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
		{/snippet}
		<div class="space-y-2 mt-2">
			<CodeSnippet
				code={`import { StatusChip } from "urupe-ui";\n\n<StatusChip status="active" />\n<StatusChip status="inactive" />\n<StatusChip status="pending" />\n<StatusChip status="error" />`}
				language="svelte"
				title="StatusChip"
			/>
		</div>
	</Collapsible>

	<!-- Progress -->
	<Card padding>
		<h3 class="text-title-3 text-foreground mb-4">Progress</h3>
		<div class="space-y-4">
			<div>
				<div class="flex justify-between mb-1">
					<span class="text-body-sm text-foreground">Uploading...</span>
					<span class="text-body-sm text-muted-foreground">{Math.round(progressValue)}%</span>
				</div>
				<Progress value={progressValue} />
			</div>
			<Button size="sm" onclick={simulateLoad} disabled={loading}>
				{loading ? "Loading..." : "Simulate Upload"}
			</Button>
		</div>
	</Card>
	<Collapsible>
		{#snippet trigger()}
			<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
		{/snippet}
		<div class="space-y-2 mt-2">
			<CodeSnippet
				code={`import { Progress } from "urupe-ui";\n\nlet progressValue = $state(35);\n\n<div class="flex justify-between mb-1">\n  <span class="text-body-sm text-foreground">Uploading...</span>\n  <span class="text-body-sm text-muted-foreground">{Math.round(progressValue)}%</span>\n</div>\n<Progress value={progressValue} />`}
				language="svelte"
				title="Progress"
			/>
		</div>
	</Collapsible>

	<!-- Skeleton -->
	<Card padding>
		<h3 class="text-title-3 text-foreground mb-4">Skeleton</h3>
		<p class="text-body-sm text-muted-foreground mb-4">Loading placeholders for content.</p>
		<div class="space-y-3">
			<div class="flex items-center gap-3">
				<Skeleton class="h-10 w-10 rounded-full" />
				<div class="space-y-2 flex-1">
					<Skeleton class="h-4 w-1/3" />
					<Skeleton class="h-3 w-2/3" />
				</div>
			</div>
			<Skeleton class="h-20 w-full" />
		</div>
	</Card>

	<!-- Spinner -->
	<Card padding>
		<h3 class="text-title-3 text-foreground mb-4">Spinner</h3>
		<div class="flex items-center gap-4">
			<Spinner />
			<Spinner size="sm" />
			<span class="text-body-sm text-muted-foreground">Loading content...</span>
		</div>
	</Card>

	<!-- EmptyState -->
	<Card padding>
		<h3 class="text-title-3 text-foreground mb-4">EmptyState</h3>
		<EmptyState
			title="No results found"
			description="Try adjusting your search or filter to find what you're looking for."
		/>
	</Card>
</div>
