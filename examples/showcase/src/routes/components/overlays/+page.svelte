<script lang="ts">
	import { PageHeader } from "bindrunes/layouts";
	import { Card, Button, Dialog, Sheet, AlertDialog, Popover, Tooltip, DropdownMenu, ContextMenu, Popconfirm } from "bindrunes";
	import { Tabs, TabsList, TabsTrigger, TabsContent } from "bindrunes/layouts";
	import { Collapsible, CodeSnippet } from "bindrunes";

	let dialogOpen = $state(false);
	let sheetOpen = $state(false);
	let sheetSide = $state<"left" | "right" | "top" | "bottom">("right");
	let alertDialogOpen = $state(false);
	let popoverOpen = $state(false);
	let dropdownOpen = $state(false);

	const dropdownItems = [
		{ value: "edit", label: "Edit" },
		{ value: "duplicate", label: "Duplicate" },
		{ value: "archive", label: "Archive" },
		{ value: "delete", label: "Delete" },
	];

	let activeTab = $state("dialog");
</script>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
	<PageHeader title="Overlay Components" description="Dialogs, sheets, popovers, menus, and tooltips" />

	<Tabs bind:value={activeTab}>
		<TabsList>
			<TabsTrigger value="dialog">Dialog</TabsTrigger>
			<TabsTrigger value="sheet">Sheet</TabsTrigger>
			<TabsTrigger value="alert">AlertDialog</TabsTrigger>
			<TabsTrigger value="menus">Menus</TabsTrigger>
			<TabsTrigger value="misc">Misc</TabsTrigger>
		</TabsList>

		<TabsContent value="dialog">
			<Card padding>
				<h3 class="text-title-3 text-foreground mb-3">Dialog</h3>
				<p class="text-body-sm text-muted-foreground mb-4">Modal dialog with header, body, and footer snippets.</p>
				<Button onclick={() => dialogOpen = true}>Open Dialog</Button>
			</Card>
			<Collapsible>
				{#snippet trigger()}
					<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
				{/snippet}
				<div class="space-y-2 mt-2">
					<CodeSnippet
						code={`import { Dialog, Button } from "bindrunes";\n\nlet dialogOpen = $state(false);\n\n<Button onclick={() => dialogOpen = true}>Open Dialog</Button>\n\n{#if dialogOpen}\n  <Dialog bind:open={dialogOpen}>\n    <div class="p-6 space-y-4">\n      <h2 class="text-title-2 text-foreground">Edit Profile</h2>\n      <p class="text-body-sm text-muted-foreground">Make changes to your profile here.</p>\n      <div class="flex justify-end gap-2">\n        <Button variant="outline" onclick={() => dialogOpen = false}>Cancel</Button>\n        <Button onclick={() => dialogOpen = false}>Save changes</Button>\n      </div>\n    </div>\n  </Dialog>\n{/if}`}
						language="svelte"
						title="Dialog"
					/>
				</div>
			</Collapsible>
		</TabsContent>

		<TabsContent value="sheet">
			<Card padding>
				<h3 class="text-title-3 text-foreground mb-3">Sheet</h3>
				<p class="text-body-sm text-muted-foreground mb-4">Slide-out panel from any edge.</p>
				<div class="flex gap-2">
					{#each ["left", "right", "top", "bottom"] as side}
						<Button
							size="sm"
							variant={sheetSide === side ? "primary" : "outline"}
							onclick={() => { sheetSide = side; sheetOpen = true; }}
						>
							{side}
						</Button>
					{/each}
				</div>
			</Card>
			<Collapsible>
				{#snippet trigger()}
					<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
				{/snippet}
				<div class="space-y-2 mt-2">
					<CodeSnippet
						code={`import { Sheet, Button } from "bindrunes";\n\nlet sheetOpen = $state(false);\nlet sheetSide = $state("right");\n\n<Button onclick={() => sheetOpen = true}>Open Sheet</Button>\n\n{#if sheetOpen}\n  <Sheet bind:open={sheetOpen} side={sheetSide}>\n    <div class="p-6 space-y-4">\n      <h2 class="text-title-2 text-foreground">Sheet Panel</h2>\n      <p class="text-body-sm text-muted-foreground">This sheet slides in from the {sheetSide}.</p>\n      <Button variant="outline" onclick={() => sheetOpen = false}>Close</Button>\n    </div>\n  </Sheet>\n{/if}`}
						language="svelte"
						title="Sheet"
					/>
				</div>
			</Collapsible>
		</TabsContent>

		<TabsContent value="alert">
			<Card padding>
				<h3 class="text-title-3 text-foreground mb-3">AlertDialog</h3>
				<p class="text-body-sm text-muted-foreground mb-4">Confirmation dialog for destructive actions.</p>
				<Button variant="destructive" onclick={() => alertDialogOpen = true}>Delete Account</Button>
			</Card>
		</TabsContent>

		<TabsContent value="menus">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">DropdownMenu</h3>
					<p class="text-body-sm text-muted-foreground mb-4">Click-triggered action menu.</p>
					<DropdownMenu trigger={dropdownTrigger} items={dropdownItems} onSelect={(v) => console.log("Selected:", v)} />
				</Card>

				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">ContextMenu</h3>
					<p class="text-body-sm text-muted-foreground mb-4">Right-click context menu. Try right-clicking the area below.</p>
					<div class="h-32 rounded-[--radius-md] border-2 border-dashed border-border flex items-center justify-center text-body-sm text-muted-foreground">
						Right-click here
					</div>
				</Card>
			</div>
			<Collapsible>
				{#snippet trigger()}
					<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
				{/snippet}
				<div class="space-y-2 mt-2">
					<CodeSnippet
						code={`import { DropdownMenu, ContextMenu, Button } from "bindrunes";\n\nconst dropdownItems = [\n  { value: "edit", label: "Edit" },\n  { value: "duplicate", label: "Duplicate" },\n  { value: "archive", label: "Archive" },\n  { value: "delete", label: "Delete" },\n];\n\n{#snippet dropdownTrigger()}\n  <Button variant="outline">Actions</Button>\n{/snippet}\n\n<DropdownMenu trigger={dropdownTrigger} items={dropdownItems} onSelect={(v) => console.log("Selected:", v)} />\n<ContextMenu trigger={contextTrigger} items={contextItems} />`}
						language="svelte"
						title="Menus"
					/>
				</div>
			</Collapsible>
		</TabsContent>

		<TabsContent value="misc">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">Popover</h3>
					<p class="text-body-sm text-muted-foreground mb-4">Hover or click content panel.</p>
					<Popover trigger={popoverTrigger}>
						<div class="w-48 p-2 space-y-1">
							<p class="text-body-sm text-foreground font-medium">Popover Content</p>
							<p class="text-body-xs text-muted-foreground">Rich content can go here.</p>
						</div>
					</Popover>
				</Card>

				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">Tooltip</h3>
					<p class="text-body-sm text-muted-foreground mb-4">Hover tooltip.</p>
					<Tooltip text="This is a helpful tooltip">
						<Button variant="outline" size="sm">Hover me</Button>
					</Tooltip>
				</Card>

				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">Popconfirm</h3>
					<p class="text-body-sm text-muted-foreground mb-4">Inline confirmation popover.</p>
					<Popconfirm title="Delete this item?" onConfirm={() => console.log("Confirmed!")}>
						<Button variant="destructive" size="sm">Delete</Button>
					</Popconfirm>
				</Card>
			</div>
		</TabsContent>
	</Tabs>
</div>

<!-- Dialog -->
{#if dialogOpen}
	<Dialog bind:open={dialogOpen}>
		<div class="p-6 space-y-4">
			<h2 class="text-title-2 text-foreground">Edit Profile</h2>
			<p class="text-body-sm text-muted-foreground">Make changes to your profile here. Click save when you're done.</p>
			<div class="space-y-3">
				<div>
					<label class="text-label-sm text-foreground" for="name">Name</label>
					<input id="name" type="text" value="Jane Smith" class="w-full h-9 px-3 rounded-[--radius-sm] border border-border bg-background text-body-sm text-foreground mt-1" />
				</div>
				<div>
					<label class="text-label-sm text-foreground" for="email">Email</label>
					<input id="email" type="email" value="jane@example.com" class="w-full h-9 px-3 rounded-[--radius-sm] border border-border bg-background text-body-sm text-foreground mt-1" />
				</div>
			</div>
			<div class="flex justify-end gap-2">
				<Button variant="outline" onclick={() => dialogOpen = false}>Cancel</Button>
				<Button onclick={() => dialogOpen = false}>Save changes</Button>
			</div>
		</div>
	</Dialog>
{/if}

<!-- Sheet -->
{#if sheetOpen}
	<Sheet bind:open={sheetOpen} side={sheetSide}>
		<div class="p-6 space-y-4">
			<h2 class="text-title-2 text-foreground">Sheet Panel</h2>
			<p class="text-body-sm text-muted-foreground">This sheet slides in from the {sheetSide}.</p>
			<Button variant="outline" onclick={() => sheetOpen = false}>Close</Button>
		</div>
	</Sheet>
{/if}

<!-- AlertDialog -->
{#if alertDialogOpen}
	<AlertDialog bind:open={alertDialogOpen}>
		<div class="p-6 space-y-4">
			<h2 class="text-title-2 text-foreground">Are you sure?</h2>
			<p class="text-body-sm text-muted-foreground">This action cannot be undone. Your account will be permanently deleted.</p>
			<div class="flex justify-end gap-2">
				<Button variant="outline" onclick={() => alertDialogOpen = false}>Cancel</Button>
				<Button variant="destructive" onclick={() => alertDialogOpen = false}>Delete</Button>
			</div>
		</div>
	</AlertDialog>
{/if}

{#snippet dropdownTrigger()}
	<Button variant="outline">Actions</Button>
{/snippet}

{#snippet popoverTrigger()}
	<Button variant="outline" size="sm">Open Popover</Button>
{/snippet}
