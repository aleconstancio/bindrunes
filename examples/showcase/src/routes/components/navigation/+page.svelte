<script lang="ts">
	import { PageHeader } from "bindrunes/layouts";
	import { Card, Breadcrumb, Stepper, Timeline, Pagination, Collapsible, CodeSnippet } from "bindrunes";
	import { Tabs, TabsList, TabsTrigger, TabsContent } from "bindrunes/layouts";

	let currentPage = $state(1);
	let activeStep = $state(1);

	const breadcrumbItems = [
		{ label: "Home", href: "/" },
		{ label: "Components", href: "/components" },
		{ label: "Navigation" },
	];

	const steps = [
		{ title: "Account", description: "Create your account" },
		{ title: "Profile", description: "Set up your profile" },
		{ title: "Preferences", description: "Configure settings" },
		{ title: "Complete", description: "You're all set!" },
	];

	const timelineItems = [
		{ title: "Project created", description: "New project initialized", time: "2 hours ago" },
		{ title: "Dependencies installed", description: "All packages resolved", time: "1 hour ago" },
		{ title: "Build completed", description: "Successfully compiled", time: "30 min ago" },
		{ title: "Tests passed", description: "47/47 tests passing", time: "10 min ago" },
	];
</script>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
	<PageHeader title="Navigation Components" description="Breadcrumbs, steppers, timelines, and pagination" />

	<!-- Breadcrumb -->
	<Card padding>
		<h3 class="text-title-3 text-foreground mb-3">Breadcrumb</h3>
		<p class="text-body-sm text-muted-foreground mb-4">Hierarchical navigation path.</p>
		<Breadcrumb items={breadcrumbItems} />
	</Card>
	<Collapsible>
		{#snippet trigger()}
			<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
		{/snippet}
		<div class="space-y-2 mt-2">
			<CodeSnippet
				code={`import { Breadcrumb } from "bindrunes";\n\nconst breadcrumbItems = [\n  { label: "Home", href: "/" },\n  { label: "Components", href: "/components" },\n  { label: "Navigation" },\n];\n\n<Breadcrumb items={breadcrumbItems} />`}
				language="svelte"
				title="Breadcrumb"
			/>
		</div>
	</Collapsible>

	<!-- Stepper -->
	<Card padding>
		<h3 class="text-title-3 text-foreground mb-3">Stepper</h3>
		<p class="text-body-sm text-muted-foreground mb-4">Multi-step wizard navigation.</p>
		<div class="mb-4">
			<Stepper {steps} currentStep={activeStep} />
		</div>
		<div class="flex gap-2">
			<button
				type="button"
				class="inline-flex items-center justify-center h-8 px-3 rounded-[--radius-sm] border border-border bg-background text-label-sm text-foreground hover:bg-muted transition-colors cursor-pointer disabled:opacity-50"
				onclick={() => activeStep = Math.max(0, activeStep - 1)}
				disabled={activeStep === 0}
			>
				Previous
			</button>
			<button
				type="button"
				class="inline-flex items-center justify-center h-8 px-3 rounded-[--radius-sm] bg-primary text-primary-foreground text-label-sm font-medium hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
				onclick={() => activeStep = Math.min(steps.length - 1, activeStep + 1)}
				disabled={activeStep === steps.length - 1}
			>
				Next
			</button>
		</div>
	</Card>
	<Collapsible>
		{#snippet trigger()}
			<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
		{/snippet}
		<div class="space-y-2 mt-2">
			<CodeSnippet
				code={`import { Stepper } from "bindrunes";\n\nlet activeStep = $state(1);\n\nconst steps = [\n  { title: "Account", description: "Create your account" },\n  { title: "Profile", description: "Set up your profile" },\n  { title: "Preferences", description: "Configure settings" },\n  { title: "Complete", description: "You're all set!" },\n];\n\n<Stepper {steps} currentStep={activeStep} />\n<button onclick={() => activeStep = Math.min(steps.length - 1, activeStep + 1)}>Next</button>`}
				language="svelte"
				title="Stepper"
			/>
		</div>
	</Collapsible>

	<!-- Timeline -->
	<Card padding>
		<h3 class="text-title-3 text-foreground mb-3">Timeline</h3>
		<p class="text-body-sm text-muted-foreground mb-4">Chronological event display.</p>
		<Timeline items={timelineItems} />
	</Card>
	<Collapsible>
		{#snippet trigger()}
			<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
		{/snippet}
		<div class="space-y-2 mt-2">
			<CodeSnippet
				code={`import { Timeline } from "bindrunes";\n\nconst timelineItems = [\n  { title: "Project created", description: "New project initialized", time: "2 hours ago" },\n  { title: "Dependencies installed", description: "All packages resolved", time: "1 hour ago" },\n  { title: "Build completed", description: "Successfully compiled", time: "30 min ago" },\n];\n\n<Timeline items={timelineItems} />`}
				language="svelte"
				title="Timeline"
			/>
		</div>
	</Collapsible>

	<!-- Pagination -->
	<Card padding>
		<h3 class="text-title-3 text-foreground mb-3">Pagination</h3>
		<p class="text-body-sm text-muted-foreground mb-4">Page navigation control.</p>
		<Pagination bind:currentPage totalPages={20} />
	</Card>
	<Collapsible>
		{#snippet trigger()}
			<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
		{/snippet}
		<div class="space-y-2 mt-2">
			<CodeSnippet
				code={`import { Pagination } from "bindrunes";\n\nlet currentPage = $state(1);\n\n<Pagination bind:currentPage totalPages={20} />`}
				language="svelte"
				title="Pagination"
			/>
		</div>
	</Collapsible>
</div>
