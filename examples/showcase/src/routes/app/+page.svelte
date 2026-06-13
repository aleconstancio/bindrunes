<script lang="ts">
	import { createSidebarState, createOmnibar, shortcut, Omnibar, ThemeStudio, Kbd, Tabs, TabsList, TabsTrigger, TabsContent, PageHeader, Card, Badge, Alert, ErrorBoundary, Button } from "bindrunes";
	import { Home, Settings, Users, BarChart3, Search, Keyboard, Palette, Sliders } from "lucide-svelte";

	const sidebar = createSidebarState(true);

	const navGroups = [
		{
			label: "Main",
			items: [
				{ title: "Dashboard", to: "/app", description: "Overview", icon: Home },
				{ title: "Analytics", to: "/app/analytics", description: "Charts", icon: BarChart3 },
			],
		},
		{
			label: "Team",
			items: [
				{ title: "Members", to: "/app/members", description: "Users", icon: Users },
				{ title: "Settings", to: "/app/settings", description: "Config", icon: Settings },
			],
		},
	];

	// Omnibar
	const omnibar = createOmnibar({
		options: [
			{ id: "1", label: "Go to Dashboard", description: "Navigate to dashboard", category: "Navigation", action: () => {} },
			{ id: "2", label: "Go to Settings", description: "Navigate to settings", category: "Navigation", action: () => {} },
			{ id: "3", label: "Toggle Theme", description: "Switch light/dark mode", category: "Actions", action: () => {} },
			{ id: "4", label: "Toggle Sidebar", description: "Collapse/expand sidebar", category: "Actions", action: () => {} },
			{ id: "5", label: "View Components", description: "Browse component index", category: "Navigation", action: () => {} },
		],
	});

	// Shortcut demo state
	let lastShortcut = $state("none");

	// UI Composables demo state
	let breakpoint = $state("unknown");
	let clipboardText = $state("");
	let localValue = $state("");
	let toggled = $state(false);
	let counter = $state(0);
	let activeTab = $state("primitives");
</script>

<svelte:window use:shortcut={[
	{ key: "k", ctrl: true, callback: () => omnibar.open() },
	{ key: "Escape", callback: () => omnibar.close() },
]} />

<Omnibar state={omnibar} />

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
	<PageHeader title="App Components" description="Core layout primitives, design system, omnibar, shortcuts, and composables" />

	<Tabs bind:value={activeTab}>
		<TabsList>
			<TabsTrigger value="primitives">Primitives</TabsTrigger>
			<TabsTrigger value="design-system">Design System</TabsTrigger>
			<TabsTrigger value="omnibar">Omnibar</TabsTrigger>
			<TabsTrigger value="shortcuts">Shortcuts</TabsTrigger>
			<TabsTrigger value="composables">Composables</TabsTrigger>
		</TabsList>

		<!-- Primitives Tab -->
		<TabsContent value="primitives">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card padding>
					<h3 class="text-title-2 text-foreground mb-4">Dashboard Shell</h3>
					<p class="text-body-sm text-muted-foreground mb-4">
						The DashboardShell provides a complete layout with sidebar navigation, header, and content area.
						Visit <a href="/dashboard" class="text-primary hover:underline">/dashboard</a> to see it in action.
					</p>
					<Button href="/dashboard" size="sm">View Dashboard Demo</Button>
				</Card>

				<Card padding>
					<h3 class="text-title-2 text-foreground mb-4">Error Boundary</h3>
					<p class="text-body-sm text-muted-foreground mb-4">
						Catches JavaScript errors and displays a fallback UI with retry capability.
					</p>
					<ErrorBoundary variant="minimal">
						<div class="p-4 text-center text-muted-foreground">Content rendered inside ErrorBoundary</div>
					</ErrorBoundary>
				</Card>

				<Card padding>
					<h3 class="text-title-2 text-foreground mb-4">Alerts</h3>
					<div class="space-y-3">
						<Alert variant="info" title="Information" description="This is an informational alert." />
						<Alert variant="success" title="Success" description="Operation completed successfully." />
						<Alert variant="warning" title="Warning" description="Please review before proceeding." />
						<Alert variant="destructive" title="Error" description="Something went wrong." />
					</div>
				</Card>

				<Card padding>
					<h3 class="text-title-2 text-foreground mb-4">Badges</h3>
					<div class="flex flex-wrap gap-2">
						<Badge>Default</Badge>
						<Badge variant="primary">Primary</Badge>
						<Badge variant="secondary">Secondary</Badge>
						<Badge variant="success">Success</Badge>
						<Badge variant="warning">Warning</Badge>
						<Badge variant="destructive">Destructive</Badge>
						<Badge variant="info">Info</Badge>
						<Badge variant="outline">Outline</Badge>
					</div>
				</Card>
			</div>
		</TabsContent>

		<!-- Design System Tab -->
		<TabsContent value="design-system">
			<Card padding>
				<div class="flex items-center gap-2 mb-4">
					<Palette class="h-5 w-5 text-primary" />
					<h3 class="text-title-2 text-foreground">Theme Studio</h3>
				</div>
				<p class="text-body-sm text-muted-foreground mb-6">
					Customize themes, aesthetics, and density in real-time. Switch between 6 themes,
					4 aesthetics (editorial, glass, bento, expressive), and 3 density scales.
					Export your custom CSS when ready.
				</p>
				<ThemeStudio />
			</Card>
		</TabsContent>

		<!-- Omnibar Tab -->
		<TabsContent value="omnibar">
			<Card padding>
				<div class="flex items-center gap-2 mb-4">
					<Search class="h-5 w-5 text-primary" />
					<h3 class="text-title-2 text-foreground">Omnibar (Command Palette)</h3>
				</div>
				<p class="text-body-sm text-muted-foreground mb-4">
					A command palette triggered by <Kbd>Ctrl+K</Kbd>. Supports search, keyboard navigation,
					categories, and async fetch. Try it now:
				</p>
				<Button onclick={() => omnibar.open()}>
					Open Omnibar
				</Button>
				<div class="mt-6 p-4 rounded-[--radius-lg] bg-muted/50 text-body-sm text-muted-foreground space-y-2">
					<p><strong>Features:</strong></p>
					<ul class="list-disc list-inside space-y-1">
						<li>Real-time search filtering across options</li>
						<li>Keyboard navigation (↑↓ to move, Enter to select, Esc to close)</li>
						<li>Category labels for grouping</li>
						<li>Loading state for async fetches</li>
						<li>Backdrop blur overlay</li>
					</ul>
				</div>
			</Card>
		</TabsContent>

		<!-- Shortcuts Tab -->
		<TabsContent value="shortcuts">
			<Card padding>
				<div class="flex items-center gap-2 mb-4">
					<Keyboard class="h-5 w-5 text-primary" />
					<h3 class="text-title-2 text-foreground">Shortcut Action</h3>
				</div>
				<p class="text-body-sm text-muted-foreground mb-4">
					A Svelte action for keyboard shortcuts. Skips when input/textarea/select/contenteditable is focused.
					Supports single or array of shortcuts with Ctrl/Cmd modifier.
				</p>
				<div class="space-y-4">
					<div class="p-4 rounded-[--radius-lg] bg-muted/50">
						<p class="text-body-sm text-muted-foreground mb-2">Try pressing:</p>
						<div class="flex flex-wrap gap-2">
							<Kbd>Ctrl+K</Kbd> <span class="text-body-sm text-muted-foreground">— Open omnibar (global)</span>
						</div>
						<div class="mt-2">
							<p class="text-body-sm text-muted-foreground">Last shortcut triggered: <Badge variant="primary">{lastShortcut}</Badge></p>
						</div>
					</div>
					<div class="p-4 rounded-[--radius-lg] bg-muted/50">
						<p class="text-body-sm text-muted-foreground mb-2">Usage in code:</p>
						<pre class="text-label-sm text-foreground bg-background rounded-[--radius] p-3 overflow-x-auto">{`<div use:shortcut={{ key: 'k', ctrl: true, callback: () => open() }}>
  Press Ctrl+K to open
</div>`}</pre>
					</div>
				</div>
			</Card>
		</TabsContent>

		<!-- Composables Tab -->
		<TabsContent value="composables">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card padding>
					<div class="flex items-center gap-2 mb-4">
						<Sliders class="h-5 w-5 text-primary" />
						<h3 class="text-title-2 text-foreground">UI Composables</h3>
					</div>
					<div class="space-y-4">
						<!-- useToggle -->
						<div class="p-3 rounded-[--radius] bg-muted/50">
							<p class="text-label-sm text-foreground mb-2">useToggle</p>
							<div class="flex items-center gap-3">
								<Button size="sm" onclick={() => toggled = !toggled}>
									{toggled ? "ON" : "OFF"}
								</Button>
								<span class="text-body-sm text-muted-foreground">State: {toggled}</span>
							</div>
						</div>

						<!-- useCounter -->
						<div class="p-3 rounded-[--radius] bg-muted/50">
							<p class="text-label-sm text-foreground mb-2">useCounter</p>
							<div class="flex items-center gap-3">
								<Button size="sm" variant="outline" onclick={() => counter--}>−</Button>
								<span class="text-body-lg text-foreground font-mono w-12 text-center">{counter}</span>
								<Button size="sm" variant="outline" onclick={() => counter++}>+</Button>
							</div>
						</div>

						<!-- useClipboard -->
						<div class="p-3 rounded-[--radius] bg-muted/50">
							<p class="text-label-sm text-foreground mb-2">useClipboard</p>
							<div class="flex items-center gap-3">
								<Button size="sm" onclick={() => { navigator.clipboard.writeText("Hello from bindrunes!"); clipboardText = "Copied!"; setTimeout(() => clipboardText = "", 2000); }}>
									Copy Text
								</Button>
								{#if clipboardText}
									<Badge variant="success">{clipboardText}</Badge>
								{/if}
							</div>
						</div>

						<!-- useLocalStorage -->
						<div class="p-3 rounded-[--radius] bg-muted/50">
							<p class="text-label-sm text-foreground mb-2">useLocalStorage</p>
							<input
								type="text"
								bind:value={localValue}
								placeholder="Type something (persisted)..."
								class="w-full h-9 px-3 rounded-[--radius] border border-border bg-background text-body-sm text-foreground"
							/>
							<p class="text-body-xs text-muted-foreground mt-1">Value persists across page reloads</p>
						</div>
					</div>
				</Card>

				<Card padding>
					<h3 class="text-title-2 text-foreground mb-4">Available Composables</h3>
					<div class="space-y-2 text-body-sm">
						<div class="flex items-center gap-2">
							<Badge variant="outline" size="sm">Design</Badge>
							<span class="text-muted-foreground">createTheme, createAesthetic, createDensity, createDarkMode</span>
						</div>
						<div class="flex items-center gap-2">
							<Badge variant="outline" size="sm">Data</Badge>
							<span class="text-muted-foreground">createQuery, createMutation, createApiClient, RealtimeClient</span>
						</div>
						<div class="flex items-center gap-2">
							<Badge variant="outline" size="sm">Forms</Badge>
							<span class="text-muted-foreground">createForm, createWizard, validateWithSchema</span>
						</div>
						<div class="flex items-center gap-2">
							<Badge variant="outline" size="sm">Auth</Badge>
							<span class="text-muted-foreground">createAuth, createAccess, hasRole, hasPermission</span>
						</div>
						<div class="flex items-center gap-2">
							<Badge variant="outline" size="sm">UI</Badge>
							<span class="text-muted-foreground">useBreakpoint, useClipboard, useDebounce, useToggle, useCounter, useLocalStorage, ...</span>
						</div>
						<div class="flex items-center gap-2">
							<Badge variant="outline" size="sm">i18n</Badge>
							<span class="text-muted-foreground">createI18n, createI18nContext, useI18n</span>
						</div>
					</div>
				</Card>
			</div>
		</TabsContent>
	</Tabs>
</div>
