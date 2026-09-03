<script lang="ts">
	import { PageHeader } from "urupe-ui/layouts";
	import { Card, Badge, Button, Input, Alert } from "urupe-ui";

	const themes = ["editorial", "dracula", "nord", "catppuccin", "rose-pine", "github"] as const;
	const aesthetics = ["minimal", "glass", "bento", "expressive"] as const;
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
	<PageHeader
		title="Theme × Aesthetic Matrix"
		description="Every combination of the 6 themes and 4 aesthetics. Use the palette switcher in the header to see live changes."
	/>

	<div class="overflow-x-auto">
		<table class="w-full border-collapse">
			<thead>
				<tr>
					<th class="p-3 text-left text-label-sm text-muted-foreground border-b border-border">Theme \ Aesthetic</th>
					{#each aesthetics as aesthetic}
						<th class="p-3 text-center text-label-sm text-muted-foreground border-b border-border">{aesthetic}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each themes as theme}
					<tr>
						<td class="p-3 text-label-sm font-medium text-foreground border-b border-border whitespace-nowrap">{theme}</td>
						{#each aesthetics as aesthetic}
							<td class="p-3 border-b border-border">
								<div data-theme={theme} data-aesthetic={aesthetic} class="rounded-[--radius-md] border border-border bg-background p-3 space-y-2 min-w-[180px]">
									<div class="flex items-center justify-between">
										<span class="text-label-xs text-muted-foreground">{theme}/{aesthetic}</span>
										<Badge variant="primary" size="sm">Demo</Badge>
									</div>
									<div class="flex gap-1.5">
										<Button variant="primary" size="sm">Primary</Button>
										<Button variant="outline" size="sm">Outline</Button>
									</div>
									<Input placeholder="Input..." label="Name" />
									<Alert variant="info" title="Info">Theme preview.</Alert>
								</div>
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
