<script lang="ts">
	import { PageHeader, Card, Breadcrumb, Stepper, Timeline, Pagination } from "bindrunes";
	import { Tabs, TabsList, TabsTrigger, TabsContent } from "bindrunes";

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

	<!-- Timeline -->
	<Card padding>
		<h3 class="text-title-3 text-foreground mb-3">Timeline</h3>
		<p class="text-body-sm text-muted-foreground mb-4">Chronological event display.</p>
		<Timeline items={timelineItems} />
	</Card>

	<!-- Pagination -->
	<Card padding>
		<h3 class="text-title-3 text-foreground mb-3">Pagination</h3>
		<p class="text-body-sm text-muted-foreground mb-4">Page navigation control.</p>
		<Pagination bind:currentPage totalPages={20} />
	</Card>
</div>
