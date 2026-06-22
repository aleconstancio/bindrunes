<script lang="ts">
	import { createSidebarState, createOmnibar, shortcut, Omnibar, ThemeStudio, Kbd, Tabs, TabsList, TabsTrigger, TabsContent, PageHeader, Card, Badge, Alert, ErrorBoundary, Button, createAuth, createAccess, createToast, createApiClient, useDebounce, useEventListener, useIntersectionObserver, useResizeObserver, useToggle, useCounter, Collapsible, CodeSnippet } from "bindrunes";
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
	const toggled = useToggle(false);
	const counter = useCounter(0);
	let clipboardText = $state("");
	let localValue = $state("");
	let activeTab = $state("primitives");

	// createAuth demo
	const auth = createAuth();
	let authEmail = $state("demo@example.com");
	let authName = $state("Demo User");

	// createAccess demo (derived from auth)
	const access = createAccess(auth);

	// createToast demo
	const toast = createToast();

	// createApiClient demo
	const apiClient = createApiClient({
		baseUrl: "https://jsonplaceholder.typicode.com",
		onError: (err) => console.error("API error:", err),
	});
	let apiResult = $state("");
	let apiLoading = $state(false);

	// useDebounce demo
	let searchInput = $state("");
	const debouncedSearch = useDebounce(searchInput, 500);

	// useEventListener demo
	let mouseCoords = $state({ x: 0, y: 0 });
	useEventListener("mousemove", (e) => {
		mouseCoords = { x: e.clientX, y: e.clientY };
	});

	// useIntersectionObserver demo
	let intersectionTarget = $state<HTMLElement | null>(null);
	let isVisible = $state(false);
	$effect(() => {
		if (intersectionTarget) {
			useIntersectionObserver(intersectionTarget, (intersecting) => {
				isVisible = intersecting;
			}, { threshold: 0.5 });
		}
	});

	// useResizeObserver demo
	let resizeTarget = $state<HTMLElement | null>(null);
	let resizeSize = $state({ width: 0, height: 0 });
	$effect(() => {
		if (resizeTarget) {
			useResizeObserver(resizeTarget, (entry) => {
				const { width, height } = entry.contentRect;
				resizeSize = { width: Math.round(width), height: Math.round(height) };
			});
		}
	});
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
			<Collapsible>
				{#snippet trigger()}
					<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
				{/snippet}
				<div class="space-y-2 mt-2">
					<CodeSnippet
						code={`import { ErrorBoundary, Alert, Badge } from "bindrunes";\n\n<ErrorBoundary variant="minimal">\n  <div class="p-4 text-center">Content rendered inside ErrorBoundary</div>\n</ErrorBoundary>\n\n<Alert variant="info" title="Information" description="This is an informational alert." />\n<Alert variant="success" title="Success" description="Operation completed successfully." />\n\n<Badge>Default</Badge>\n<Badge variant="primary">Primary</Badge>\n<Badge variant="success">Success</Badge>`}
						language="svelte"
						title="Primitives"
					/>
				</div>
			</Collapsible>
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
					4 aesthetics (minimal, glass, bento, expressive), and 3 density scales.
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
			<Collapsible>
				{#snippet trigger()}
					<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
				{/snippet}
				<div class="space-y-2 mt-2">
					<CodeSnippet
						code={`import { createOmnibar, Omnibar, shortcut, Kbd } from "bindrunes";\n\nconst omnibar = createOmnibar({\n  options: [\n    { id: "1", label: "Go to Dashboard", description: "Navigate to dashboard", category: "Navigation", action: () => {} },\n    { id: "2", label: "Toggle Theme", description: "Switch light/dark mode", category: "Actions", action: () => {} },\n  ],\n});\n\n<svelte:window use:shortcut={{ key: "k", ctrl: true, callback: () => omnibar.open() }} />\n\n<Omnibar state={omnibar} />`}
						language="svelte"
						title="Omnibar"
					/>
				</div>
			</Collapsible>
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
				<!-- Existing UI Composables -->
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
								<Button size="sm" onclick={() => toggled.toggle()}>
									{toggled.value ? "ON" : "OFF"}
								</Button>
								<span class="text-body-sm text-muted-foreground">State: {toggled.value}</span>
							</div>
						</div>

						<!-- useCounter -->
						<div class="p-3 rounded-[--radius] bg-muted/50">
							<p class="text-label-sm text-foreground mb-2">useCounter</p>
							<div class="flex items-center gap-3">
								<Button size="sm" variant="outline" onclick={() => counter.decrement()}>−</Button>
								<span class="text-body-lg text-foreground font-mono w-12 text-center">{counter.count}</span>
								<Button size="sm" variant="outline" onclick={() => counter.increment()}>+</Button>
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

						<!-- useDebounce -->
						<div class="p-3 rounded-[--radius] bg-muted/50">
							<p class="text-label-sm text-foreground mb-2">useDebounce</p>
							<input
								type="text"
								bind:value={searchInput}
								placeholder="Type to search (debounced 500ms)..."
								class="w-full h-9 px-3 rounded-[--radius] border border-border bg-background text-body-sm text-foreground"
							/>
							<p class="text-body-xs text-muted-foreground mt-1">Debounced value: <span class="font-mono text-foreground">{debouncedSearch.current || "(empty)"}</span></p>
						</div>

						<!-- useEventListener -->
						<div class="p-3 rounded-[--radius] bg-muted/50">
							<p class="text-label-sm text-foreground mb-2">useEventListener</p>
							<p class="text-body-sm text-muted-foreground">Move your mouse anywhere on the page:</p>
							<div class="mt-2 font-mono text-body-sm text-foreground">
								x: {mouseCoords.x}, y: {mouseCoords.y}
							</div>
						</div>
					</div>
				</Card>

				<!-- Auth & Access Composables -->
				<Card padding>
					<div class="flex items-center gap-2 mb-4">
						<Users class="h-5 w-5 text-primary" />
						<h3 class="text-title-2 text-foreground">Auth & Access</h3>
					</div>
					<div class="space-y-4">
						<!-- createAuth -->
						<div class="p-3 rounded-[--radius] bg-muted/50">
							<p class="text-label-sm text-foreground mb-2">createAuth</p>
							{#if auth.isAuthenticated}
								<div class="space-y-2">
									<div class="text-body-sm text-muted-foreground">
										Logged in as <span class="font-medium text-foreground">{auth.user?.name}</span>
										({auth.user?.email})
									</div>
									<div class="text-body-xs text-muted-foreground">
										Roles: {auth.roles.join(", ") || "none"}
									</div>
									<Button size="sm" variant="outline" onclick={() => auth.logout()}>Logout</Button>
								</div>
							{:else}
								<div class="space-y-2">
									<input
										type="text"
										bind:value={authName}
										placeholder="Name"
										class="w-full h-8 px-2 rounded-[--radius] border border-border bg-background text-body-sm text-foreground"
									/>
									<input
										type="email"
										bind:value={authEmail}
										placeholder="Email"
										class="w-full h-8 px-2 rounded-[--radius] border border-border bg-background text-body-sm text-foreground"
									/>
									<Button size="sm" onclick={() => auth.login("demo-token-123", {
										id: "1",
										email: authEmail,
										name: authName,
										roles: ["admin", "editor"],
										permissions: ["read", "write", "delete"],
									})}>
										Login as Demo User
									</Button>
								</div>
							{/if}
						</div>

						<!-- createAccess -->
						<div class="p-3 rounded-[--radius] bg-muted/50">
							<p class="text-label-sm text-foreground mb-2">createAccess</p>
							<div class="space-y-1 text-body-sm text-muted-foreground">
								<div>isAuth: <Badge variant={access.isAuth ? "success" : "secondary"} size="sm">{access.isAuth}</Badge></div>
								<div>isAdmin: <Badge variant={access.isAdmin ? "success" : "secondary"} size="sm">{access.isAdmin}</Badge></div>
								<div>can(read): <Badge variant={access.can({ permissions: ["read"] }) ? "success" : "secondary"} size="sm">{access.can({ permissions: ["read"] })}</Badge></div>
								<div>can(delete): <Badge variant={access.can({ permissions: ["delete"] }) ? "success" : "secondary"} size="sm">{access.can({ permissions: ["delete"] })}</Badge></div>
							</div>
						</div>

						<!-- createToast -->
						<div class="p-3 rounded-[--radius] bg-muted/50">
							<p class="text-label-sm text-foreground mb-2">createToast</p>
							<div class="flex flex-wrap gap-2">
								<Button size="sm" onclick={() => toast.success("Operation completed!")}>Success</Button>
								<Button size="sm" variant="outline" onclick={() => toast.error("Something went wrong")}>Error</Button>
								<Button size="sm" variant="outline" onclick={() => toast.warning("Please check input")}>Warning</Button>
								<Button size="sm" variant="outline" onclick={() => toast.info("Here is some info")}>Info</Button>
							</div>
						</div>

						<!-- createApiClient -->
						<div class="p-3 rounded-[--radius] bg-muted/50">
							<p class="text-label-sm text-foreground mb-2">createApiClient</p>
							<p class="text-body-xs text-muted-foreground mb-2">Configured with jsonplaceholder.typicode.com</p>
							<Button
								size="sm"
								disabled={apiLoading}
								onclick={async () => {
									apiLoading = true;
									try {
										const data = await apiClient.get<{ title: string }[]>("/posts", { _limit: "1" });
										apiResult = data[0]?.title ?? "No result";
									} catch (e) {
										apiResult = `Error: ${e}`;
									} finally {
										apiLoading = false;
									}
								}}
							>
								{apiLoading ? "Loading..." : "GET /posts"}
							</Button>
							{#if apiResult}
								<p class="text-body-xs text-muted-foreground mt-2 font-mono">{apiResult}</p>
							{/if}
						</div>
					</div>
				</Card>

				<!-- Observer Composables -->
				<Card padding>
					<div class="flex items-center gap-2 mb-4">
						<BarChart3 class="h-5 w-5 text-primary" />
						<h3 class="text-title-2 text-foreground">Observers</h3>
					</div>
					<div class="space-y-4">
						<!-- useIntersectionObserver -->
						<div class="p-3 rounded-[--radius] bg-muted/50">
							<p class="text-label-sm text-foreground mb-2">useIntersectionObserver</p>
							<p class="text-body-xs text-muted-foreground mb-2">Scroll this box into view to trigger:</p>
							<div class="h-24 overflow-y-auto rounded-[--radius] border border-border">
								<div class="h-32 flex items-center justify-center">
									<div
										bind:this={intersectionTarget}
										class="px-4 py-2 rounded-[--radius] text-body-sm font-medium transition-colors {isVisible ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}"
									>
										{isVisible ? "Visible!" : "Not visible yet"}
									</div>
								</div>
							</div>
						</div>

						<!-- useResizeObserver -->
						<div class="p-3 rounded-[--radius] bg-muted/50">
							<p class="text-label-sm text-foreground mb-2">useResizeObserver</p>
							<p class="text-body-xs text-muted-foreground mb-2">Drag the corner to resize:</p>
							<div
								bind:this={resizeTarget}
								class="w-full h-24 rounded-[--radius] border-2 border-dashed border-border bg-background flex items-center justify-center cursor-se-resize resize overflow-hidden"
							>
								<span class="text-body-sm text-muted-foreground font-mono">
									{resizeSize.width} × {resizeSize.height}
								</span>
							</div>
						</div>
					</div>
				</Card>

				<!-- Available Composables -->
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
			<Collapsible>
				{#snippet trigger()}
					<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
				{/snippet}
				<div class="space-y-2 mt-2">
					<CodeSnippet
						code={`import { createAuth, createAccess, createToast, createApiClient } from "bindrunes";\n\n// Auth & Access\nconst auth = createAuth();\nauth.login("token", { id: "1", email: "user@example.com", name: "User", roles: ["admin"] });\nconst access = createAccess(auth);\nconsole.log(access.isAdmin); // derived from auth state\n\n// Toast notifications\nconst toast = createToast();\ntoast.success("Operation completed!");\ntoast.error("Something went wrong");\n\n// API Client\nconst api = createApiClient({ baseUrl: "https://api.example.com" });\nconst data = await api.get("/users");`}
						language="svelte"
						title="Composables"
					/>
				</div>
			</Collapsible>
		</TabsContent>
	</Tabs>
</div>
