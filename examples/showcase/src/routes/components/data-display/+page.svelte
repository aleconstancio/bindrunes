<script lang="ts">
	import { PageHeader, Tabs, TabsList, TabsTrigger, TabsContent } from "urupe-ui/layouts";
	import { Card, Avatar, Badge, Progress, Kbd, Collapsible, CodeSnippet } from "urupe-ui";

	const avatarSizes = ["sm", "md", "lg", "xl"] as const;
	const badgeVariants = ["primary", "secondary", "outline", "destructive", "soft"] as const;
	const badgeSizes = ["sm", "md", "lg"] as const;

	let activeTab = $state("avatar");
</script>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
	<PageHeader title="Data Display" description="Avatars, badges, progress bars, and keyboard shortcuts" />

	<Tabs bind:value={activeTab}>
		<TabsList>
			<TabsTrigger value="avatar">Avatar</TabsTrigger>
			<TabsTrigger value="badge">Badge</TabsTrigger>
			<TabsTrigger value="progress">Progress</TabsTrigger>
			<TabsTrigger value="kbd">Kbd</TabsTrigger>
		</TabsList>

		<TabsContent value="avatar">
			<Card padding>
				<h3 class="text-title-3 text-foreground mb-4">Avatar</h3>
				<div class="flex items-end gap-4">
					{#each avatarSizes as size}
						<div class="text-center space-y-1">
							<Avatar {size} name="Jane Smith" />
							<p class="text-body-xs text-muted-foreground">{size}</p>
						</div>
					{/each}
				</div>
			</Card>
			<Collapsible>
				{#snippet trigger()}
					<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
				{/snippet}
				<div class="space-y-2 mt-2">
					<CodeSnippet
						code={`import { Avatar } from "urupe-ui";\n\n<Avatar size="sm" name="Jane Smith" />\n<Avatar size="md" name="Jane Smith" />\n<Avatar size="lg" name="Jane Smith" />\n<Avatar size="xl" name="Jane Smith" />`}
						language="svelte"
						title="Avatar"
					/>
				</div>
			</Collapsible>
		</TabsContent>

		<TabsContent value="badge">
			<Card padding>
				<h3 class="text-title-3 text-foreground mb-4">Badge Variants</h3>
				<div class="flex flex-wrap gap-2 mb-6">
					{#each badgeVariants as variant}
						<Badge {variant}>{variant}</Badge>
					{/each}
				</div>
				<h4 class="text-title-3 text-foreground mb-3">Sizes</h4>
				<div class="flex flex-wrap items-end gap-2">
					{#each badgeSizes as size}
						<Badge {size} variant="primary">{size}</Badge>
					{/each}
				</div>
			</Card>
			<Collapsible>
				{#snippet trigger()}
					<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
				{/snippet}
				<div class="space-y-2 mt-2">
					<CodeSnippet
						code={`import { Badge } from "urupe-ui";\n\n<Badge variant="primary">Primary</Badge>\n<Badge variant="secondary">Secondary</Badge>\n<Badge variant="outline">Outline</Badge>\n<Badge variant="destructive">Destructive</Badge>\n<Badge variant="soft">Soft</Badge>\n\n<Badge size="sm" variant="primary">Small</Badge>\n<Badge size="md" variant="primary">Medium</Badge>\n<Badge size="lg" variant="primary">Large</Badge>`}
						language="svelte"
						title="Badge"
					/>
				</div>
			</Collapsible>
		</TabsContent>

		<TabsContent value="progress">
			<Card padding>
				<h3 class="text-title-3 text-foreground mb-4">Progress Bar</h3>
				<div class="space-y-4">
					<div>
						<p class="text-body-sm text-muted-foreground mb-1">Storage: 65%</p>
						<Progress value={65} />
					</div>
					<div>
						<p class="text-body-sm text-muted-foreground mb-1">Build: 100%</p>
						<Progress value={100} />
					</div>
					<div>
						<p class="text-body-sm text-muted-foreground mb-1">Upload: 30%</p>
						<Progress value={30} />
					</div>
				</div>
			</Card>
			<Collapsible>
				{#snippet trigger()}
					<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
				{/snippet}
				<div class="space-y-2 mt-2">
					<CodeSnippet
						code={`import { Progress } from "urupe-ui";\n\n<p class="text-body-sm text-muted-foreground mb-1">Storage: 65%</p>\n<Progress value={65} />\n\n<p class="text-body-sm text-muted-foreground mb-1">Build: 100%</p>\n<Progress value={100} />`}
						language="svelte"
						title="Progress"
					/>
				</div>
			</Collapsible>
		</TabsContent>

		<TabsContent value="kbd">
			<Card padding>
				<h3 class="text-title-3 text-foreground mb-4">Keyboard Shortcut</h3>
				<p class="text-body-sm text-muted-foreground mb-4">Display keyboard shortcuts inline.</p>
				<div class="space-y-3">
					<div class="flex items-center gap-2">
						<span class="text-body-sm text-foreground">Copy:</span>
						<Kbd>Ctrl</Kbd> + <Kbd>C</Kbd>
					</div>
					<div class="flex items-center gap-2">
						<span class="text-body-sm text-foreground">Paste:</span>
						<Kbd>Ctrl</Kbd> + <Kbd>V</Kbd>
					</div>
					<div class="flex items-center gap-2">
						<span class="text-body-sm text-foreground">Save:</span>
						<Kbd>Ctrl</Kbd> + <Kbd>S</Kbd>
					</div>
					<div class="flex items-center gap-2">
						<span class="text-body-sm text-foreground">Search:</span>
						<Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>
					</div>
				</div>
			</Card>
			<Collapsible>
				{#snippet trigger()}
					<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
				{/snippet}
				<div class="space-y-2 mt-2">
					<CodeSnippet
						code={`import { Kbd } from "urupe-ui";\n\n<div class="flex items-center gap-2">\n  <span class="text-body-sm text-foreground">Copy:</span>\n  <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd>\n</div>\n<div class="flex items-center gap-2">\n  <span class="text-body-sm text-foreground">Save:</span>\n  <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd>\n</div>`}
						language="svelte"
						title="Kbd"
					/>
				</div>
			</Collapsible>
		</TabsContent>
	</Tabs>
</div>
