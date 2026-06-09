<script lang="ts">
</script>

<Card variant="glass" class="p-6">
	<h3 class="text-title-1 mb-4 text-foreground">Preview</h3>
	<div class="space-y-3">
		<div class="flex flex-wrap gap-2">
			<Button>Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="destructive">Destructive</Button>
		</div>
		<Input label="Sample Input" placeholder="Type here..." />
		<div class="flex flex-wrap gap-2">
			<Badge>Default</Badge>
			<Badge variant="primary">Primary</Badge>
			<Badge variant="success">Success</Badge>
			<Badge variant="warning">Warning</Badge>
		</div>
		<Alert title="Alert Title" description="This is a sample alert with the generated theme." />
	</div>
</Card>
