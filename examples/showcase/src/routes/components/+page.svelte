<script lang="ts">
	import { PageHeader, Card, Badge, Input } from "bindrunes";
	import { Search } from "lucide-svelte";

	interface ComponentEntry {
		name: string;
		category: string;
		description: string;
		demoPath: string;
	}

	const categoryDemos = [
		{ name: "Forms", path: "/components/forms", description: "Inputs, checkboxes, selects, sliders, and specialty fields" },
		{ name: "Overlays", path: "/components/overlays", description: "Dialogs, sheets, menus, popovers, and tooltips" },
		{ name: "Feedback", path: "/components/feedback", description: "Alerts, spinners, skeletons, progress, and status chips" },
		{ name: "Navigation", path: "/components/navigation", description: "Breadcrumbs, steppers, timelines, and pagination" },
		{ name: "Data Display", path: "/components/data-display", description: "Avatars, badges, progress bars, and keyboard shortcuts" },
	];

	const components: ComponentEntry[] = [
		// Foundation
		{ name: "Accordion", category: "Foundation", description: "Collapsible content sections", demoPath: "/app" },
		{ name: "AccordionItem", category: "Foundation", description: "Individual accordion item", demoPath: "/app" },

		// Feedback
		{ name: "Alert", category: "Feedback", description: "Alert messages with variants", demoPath: "/components/feedback" },
		{ name: "EmptyState", category: "Feedback", description: "Empty state placeholders", demoPath: "/components/feedback" },
		{ name: "ErrorBoundary", category: "Feedback", description: "Error boundary with retry", demoPath: "/app" },
		{ name: "Skeleton", category: "Feedback", description: "Loading skeleton", demoPath: "/components/feedback" },
		{ name: "Spinner", category: "Feedback", description: "Loading spinner", demoPath: "/components/feedback" },
		{ name: "PageLoading", category: "Feedback", description: "Full-page loading state", demoPath: "/components/feedback" },
		{ name: "Suspense", category: "Feedback", description: "Async content wrapper", demoPath: "/components/feedback" },
		{ name: "StatusChip", category: "Feedback", description: "Status indicator with dot", demoPath: "/components/feedback" },

		// Navigation
		{ name: "Breadcrumb", category: "Navigation", description: "Breadcrumb navigation", demoPath: "/components/navigation" },
		{ name: "NavigationMenu", category: "Navigation", description: "Main navigation menu", demoPath: "/components/navigation" },
		{ name: "Omnibar", category: "Navigation", description: "Command palette (Ctrl+K)", demoPath: "/app" },
		{ name: "Pagination", category: "Navigation", description: "Page navigation", demoPath: "/components/navigation" },
		{ name: "Stepper", category: "Navigation", description: "Step-by-step wizard UI", demoPath: "/components/navigation" },
		{ name: "Timeline", category: "Navigation", description: "Timeline display", demoPath: "/components/navigation" },
		{ name: "TreeView", category: "Navigation", description: "Hierarchical tree", demoPath: "/components/navigation" },

		// App Shell
		{ name: "AppProvider", category: "App Shell", description: "App-wide providers wrapper", demoPath: "/" },
		{ name: "AuthGuard", category: "App Shell", description: "Auth gate component", demoPath: "/auth/login" },
		{ name: "MetaContainer", category: "App Shell", description: "Responsive container", demoPath: "/dashboard" },
		{ name: "MetaLayout", category: "App Shell", description: "Slot-based layout", demoPath: "/dashboard" },
		{ name: "MetaScrollable", category: "App Shell", description: "Scrollable container", demoPath: "/dashboard" },
		{ name: "PageHeader", category: "App Shell", description: "Page header with title/description", demoPath: "/components/feedback" },
		{ name: "SectionHeader", category: "App Shell", description: "Section heading", demoPath: "/components/feedback" },
		{ name: "Separator", category: "App Shell", description: "Visual divider", demoPath: "/components/feedback" },
		{ name: "ListPage", category: "App Shell", description: "List page layout wrapper", demoPath: "/data/list" },

		// Data Display
		{ name: "Avatar", category: "Data Display", description: "User avatar", demoPath: "/components/data-display" },
		{ name: "Badge", category: "Data Display", description: "Status/tag badge", demoPath: "/components/data-display" },
		{ name: "Card", category: "Data Display", description: "Card container", demoPath: "/" },
		{ name: "DataChart", category: "Data Display", description: "Chart wrapper", demoPath: "/dashboard" },
		{ name: "DataTable", category: "Data Display", description: "Full data table with sort/filter/pagination", demoPath: "/data/list" },
		{ name: "MetricCard", category: "Data Display", description: "KPI metric card", demoPath: "/dashboard" },
		{ name: "Progress", category: "Data Display", description: "Progress bar", demoPath: "/components/data-display" },
		{ name: "Tabs", category: "Data Display", description: "Tab system", demoPath: "/app" },
		{ name: "Kbd", category: "Data Display", description: "Keyboard shortcut display", demoPath: "/components/data-display" },

		// Forms
		{ name: "Button", category: "Forms", description: "Button with aesthetic hooks", demoPath: "/components/forms" },
		{ name: "Checkbox", category: "Forms", description: "Checkbox input", demoPath: "/components/forms" },
		{ name: "Combobox", category: "Forms", description: "Searchable dropdown", demoPath: "/components/forms" },
		{ name: "DatePicker", category: "Forms", description: "Date picker", demoPath: "/calendar" },
		{ name: "Form", category: "Forms", description: "Form wrapper with validation", demoPath: "/data/list" },
		{ name: "FormField", category: "Forms", description: "Form field with label/error", demoPath: "/components/forms" },
		{ name: "Input", category: "Forms", description: "Text input", demoPath: "/components/forms" },
		{ name: "Label", category: "Forms", description: "Form label", demoPath: "/components/forms" },
		{ name: "NumberInput", category: "Forms", description: "Numeric input", demoPath: "/components/forms" },
		{ name: "PasswordInput", category: "Forms", description: "Password input with toggle", demoPath: "/components/forms" },
		{ name: "PinInput", category: "Forms", description: "PIN/OTP input", demoPath: "/components/forms" },
		{ name: "RadioGroup", category: "Forms", description: "Radio button group", demoPath: "/components/forms" },
		{ name: "RangeCalendar", category: "Forms", description: "Date range picker", demoPath: "/calendar" },
		{ name: "RatingGroup", category: "Forms", description: "Star rating input", demoPath: "/components/forms" },
		{ name: "RichTextEditor", category: "Forms", description: "Rich text editor", demoPath: "/marketing/blog" },
		{ name: "Select", category: "Forms", description: "Select dropdown", demoPath: "/components/forms" },
		{ name: "Slider", category: "Forms", description: "Range slider", demoPath: "/components/forms" },
		{ name: "Switch", category: "Forms", description: "Toggle switch", demoPath: "/components/forms" },
		{ name: "TagInput", category: "Forms", description: "Tag/chip input", demoPath: "/components/forms" },
		{ name: "TimeField", category: "Forms", description: "Time input", demoPath: "/components/forms" },
		{ name: "Toggle", category: "Forms", description: "Toggle button", demoPath: "/components/forms" },
		{ name: "ToggleGroup", category: "Forms", description: "Toggle button group", demoPath: "/components/forms" },

		// Overlays
		{ name: "AlertDialog", category: "Overlays", description: "Confirmation dialog", demoPath: "/components/overlays" },
		{ name: "ContextMenu", category: "Overlays", description: "Right-click context menu", demoPath: "/components/overlays" },
		{ name: "Dialog", category: "Overlays", description: "Modal dialog", demoPath: "/components/overlays" },
		{ name: "Drawer", category: "Overlays", description: "Side drawer", demoPath: "/components/overlays" },
		{ name: "DropdownMenu", category: "Overlays", description: "Dropdown menu", demoPath: "/components/overlays" },
		{ name: "Popconfirm", category: "Overlays", description: "Popover confirmation", demoPath: "/components/overlays" },
		{ name: "Popover", category: "Overlays", description: "Popover content", demoPath: "/components/overlays" },
		{ name: "Sheet", category: "Overlays", description: "Sheet overlay", demoPath: "/components/overlays" },
		{ name: "Tooltip", category: "Overlays", description: "Tooltip", demoPath: "/components/overlays" },

		// Theme
		{ name: "ThemeStudio", category: "Theme", description: "Theme customization panel", demoPath: "/app" },
		{ name: "ThemeToggle", category: "Theme", description: "Light/dark mode toggle", demoPath: "/" },
		{ name: "SEO", category: "Theme", description: "Meta tags / Open Graph", demoPath: "/" },

		// Dashboard
		{ name: "DashboardShell", category: "Dashboard", description: "Main dashboard layout", demoPath: "/dashboard" },
		{ name: "DashboardShellRight", category: "Dashboard", description: "Right sidebar variant", demoPath: "/dashboard" },
		{ name: "DashboardShellTopnav", category: "Dashboard", description: "Top navigation variant", demoPath: "/dashboard" },
		{ name: "DashboardShellSplit", category: "Dashboard", description: "Split panel layout", demoPath: "/dashboard/split" },
		{ name: "NavMenu", category: "Dashboard", description: "Sidebar navigation menu", demoPath: "/dashboard" },

		// Sidebar (15 components)
		{ name: "Sidebar", category: "Sidebar", description: "Main sidebar container", demoPath: "/dashboard" },
		{ name: "SidebarProvider", category: "Sidebar", description: "Context provider", demoPath: "/dashboard" },
		{ name: "SidebarContent", category: "Sidebar", description: "Scrollable content", demoPath: "/dashboard" },
		{ name: "SidebarHeader", category: "Sidebar", description: "Sidebar header", demoPath: "/dashboard" },
		{ name: "SidebarFooter", category: "Sidebar", description: "Sidebar footer", demoPath: "/dashboard" },
		{ name: "SidebarGroup", category: "Sidebar", description: "Menu group", demoPath: "/dashboard" },
		{ name: "SidebarMenu", category: "Sidebar", description: "Menu container", demoPath: "/dashboard" },
		{ name: "SidebarMenuItem", category: "Sidebar", description: "Menu item wrapper", demoPath: "/dashboard" },
		{ name: "SidebarMenuButton", category: "Sidebar", description: "Clickable menu button", demoPath: "/dashboard" },
		{ name: "SidebarMenuBadge", category: "Sidebar", description: "Badge in menu item", demoPath: "/dashboard" },
		{ name: "SidebarMenuSkeleton", category: "Sidebar", description: "Loading skeleton", demoPath: "/dashboard" },
		{ name: "SidebarRail", category: "Sidebar", description: "Collapsed rail mode", demoPath: "/dashboard" },
		{ name: "SidebarSeparator", category: "Sidebar", description: "Separator line", demoPath: "/dashboard" },
		{ name: "SidebarTrigger", category: "Sidebar", description: "Toggle button", demoPath: "/dashboard" },
		{ name: "SidebarLayout", category: "Sidebar", description: "Layout with positions", demoPath: "/dashboard" },

		// Landing (22 components)
		{ name: "HeroBanner", category: "Landing", description: "Hero section with CTA", demoPath: "/landing" },
		{ name: "FeatureGrid", category: "Landing", description: "Feature cards grid", demoPath: "/landing" },
		{ name: "FeatureComparison", category: "Landing", description: "Feature comparison table", demoPath: "/landing" },
		{ name: "ComparisonTable", category: "Landing", description: "Pricing comparison table", demoPath: "/landing" },
		{ name: "PricingTable", category: "Landing", description: "Pricing tiers with toggle", demoPath: "/landing" },
		{ name: "HowItWorks", category: "Landing", description: "Step-by-step process", demoPath: "/landing" },
		{ name: "Testimonial", category: "Landing", description: "Customer testimonial", demoPath: "/landing" },
		{ name: "TestimonialGrid", category: "Landing", description: "Testimonials grid", demoPath: "/landing" },
		{ name: "TeamSection", category: "Landing", description: "Team members grid", demoPath: "/landing" },
		{ name: "MetricsBar", category: "Landing", description: "Stats/metrics bar", demoPath: "/landing" },
		{ name: "StatsCounter", category: "Landing", description: "Animated counter", demoPath: "/landing" },
		{ name: "LogoCloud", category: "Landing", description: "Logo cloud/trust badges", demoPath: "/landing" },
		{ name: "IntegrationGrid", category: "Landing", description: "Integration partner grid", demoPath: "/landing" },
		{ name: "SecurityBadges", category: "Landing", description: "Security certification badges", demoPath: "/landing" },
		{ name: "Newsletter", category: "Landing", description: "Email subscription form", demoPath: "/landing" },
		{ name: "CtaBanner", category: "Landing", description: "Call-to-action banner", demoPath: "/landing" },
		{ name: "FAQ", category: "Landing", description: "FAQ accordion", demoPath: "/landing" },
		{ name: "VideoEmbed", category: "Landing", description: "Video embed", demoPath: "/landing" },
		{ name: "LandingNav", category: "Landing", description: "Landing page navigation", demoPath: "/landing" },
		{ name: "LandingSection", category: "Landing", description: "Reusable section wrapper", demoPath: "/landing" },
		{ name: "SiteFooter", category: "Landing", description: "Footer component", demoPath: "/landing" },
		{ name: "SiteFooterColumns", category: "Landing", description: "Footer with columns", demoPath: "/landing" },

		// Auth
		{ name: "AuthLayout", category: "Auth", description: "Auth layout wrapper", demoPath: "/auth/split-layout" },
		{ name: "LoginForm", category: "Auth", description: "Login form", demoPath: "/auth/login" },
		{ name: "RegisterForm", category: "Auth", description: "Registration form", demoPath: "/auth/register" },
		{ name: "ForgotPassword", category: "Auth", description: "Forgot password form", demoPath: "/auth/forgot-password" },
		{ name: "ResetPassword", category: "Auth", description: "Reset password form", demoPath: "/auth/reset-password" },
		{ name: "EmailVerification", category: "Auth", description: "Email verification", demoPath: "/auth/email-verify" },
		{ name: "SocialLogin", category: "Auth", description: "Social login buttons", demoPath: "" },
		{ name: "TwoFactorAuth", category: "Auth", description: "2FA verification", demoPath: "/auth/2fa" },

		// Calendar
		{ name: "EventCalendar", category: "Calendar", description: "Event calendar", demoPath: "/calendar" },
		{ name: "AvailabilityGrid", category: "Calendar", description: "Availability grid", demoPath: "" },
		{ name: "BookingForm", category: "Calendar", description: "Booking form", demoPath: "/calendar" },
		{ name: "Scheduler", category: "Calendar", description: "Time scheduler", demoPath: "/calendar" },

		// Chat
		{ name: "ChatThread", category: "Chat", description: "Chat message thread", demoPath: "/chat" },
		{ name: "ChatBubble", category: "Chat", description: "Individual chat bubble", demoPath: "/chat" },
		{ name: "ChatMessage", category: "Chat", description: "Chat message", demoPath: "/chat" },
		{ name: "ChatInput", category: "Chat", description: "Chat input field", demoPath: "/chat" },
		{ name: "ConversationList", category: "Chat", description: "Conversation list", demoPath: "/chat" },
		{ name: "TypingIndicator", category: "Chat", description: "Typing indicator animation", demoPath: "/chat" },

		// E-commerce
		{ name: "ProductCard", category: "E-commerce", description: "Product card", demoPath: "/ecommerce" },
		{ name: "ProductGrid", category: "E-commerce", description: "Product grid layout", demoPath: "/ecommerce" },
		{ name: "Cart", category: "E-commerce", description: "Shopping cart", demoPath: "/ecommerce" },
		{ name: "CartItem", category: "E-commerce", description: "Cart item row", demoPath: "/ecommerce" },
		{ name: "Checkout", category: "E-commerce", description: "Checkout flow", demoPath: "/ecommerce" },
		{ name: "OrderSummary", category: "E-commerce", description: "Order summary card", demoPath: "/ecommerce" },
		{ name: "PriceTag", category: "E-commerce", description: "Price display", demoPath: "/ecommerce" },

		// Media
		{ name: "AudioPlayer", category: "Media", description: "Audio player", demoPath: "/media" },
		{ name: "VideoPlayer", category: "Media", description: "Video player", demoPath: "/media" },
		{ name: "MediaGallery", category: "Media", description: "Image gallery", demoPath: "/media" },
		{ name: "ImageUpload", category: "Media", description: "Image upload with preview", demoPath: "/media" },
		{ name: "FileCard", category: "Media", description: "File display card", demoPath: "/media" },

		// Marketing
		{ name: "Banner", category: "Marketing", description: "Marketing banner", demoPath: "" },
		{ name: "BlogArticle", category: "Marketing", description: "Blog article view", demoPath: "/marketing/blog" },
		{ name: "BlogListing", category: "Marketing", description: "Blog listing grid", demoPath: "/marketing/blog" },
		{ name: "ChangelogPage", category: "Marketing", description: "Changelog display", demoPath: "/marketing/blog" },
		{ name: "CommentSection", category: "Marketing", description: "Comment section", demoPath: "" },
		{ name: "ContentWithImage", category: "Marketing", description: "Image + text section", demoPath: "/marketing/blog" },
		{ name: "CookieConsent", category: "Marketing", description: "Cookie consent banner", demoPath: "/marketing/blog" },
		{ name: "DocsLayout", category: "Marketing", description: "Documentation layout", demoPath: "/marketing/docs" },
		{ name: "Maintenance", category: "Marketing", description: "Maintenance page banner", demoPath: "/marketing/blog" },
		{ name: "Popup", category: "Marketing", description: "Modal popup", demoPath: "/marketing/blog" },
		{ name: "ReleaseNotes", category: "Marketing", description: "Release notes display", demoPath: "/marketing/blog" },
		{ name: "SocialProof", category: "Marketing", description: "Social proof strip", demoPath: "/marketing/blog" },

		// Portfolio
		{ name: "Portfolio", category: "Portfolio", description: "Portfolio layout", demoPath: "/portfolio" },
		{ name: "ProjectCard", category: "Portfolio", description: "Project card", demoPath: "/portfolio" },
		{ name: "ProjectGrid", category: "Portfolio", description: "Project grid layout", demoPath: "/portfolio" },
		{ name: "CaseStudy", category: "Portfolio", description: "Detailed case study", demoPath: "/portfolio" },

		// Settings
		{ name: "TabbedSettings", category: "Settings", description: "Tabbed settings layout", demoPath: "/settings" },
		{ name: "ProfileSettings", category: "Settings", description: "Profile settings form", demoPath: "/settings" },
		{ name: "SecuritySettings", category: "Settings", description: "Security settings", demoPath: "/settings" },
		{ name: "NotificationSettings", category: "Settings", description: "Notification preferences", demoPath: "/settings" },
		{ name: "DangerZone", category: "Settings", description: "Danger zone actions", demoPath: "/settings" },
		{ name: "SettingsSection", category: "Settings", description: "Settings section wrapper", demoPath: "/settings" },

		// CRUD / Data
		{ name: "CrudListPage", category: "CRUD", description: "CRUD table page", demoPath: "/data/list" },
		{ name: "CrudCreateForm", category: "CRUD", description: "Create form", demoPath: "" },
		{ name: "CrudCreateDrawer", category: "CRUD", description: "Create drawer", demoPath: "" },
		{ name: "CrudCreateModal", category: "CRUD", description: "Create modal", demoPath: "" },
		{ name: "CrudEditForm", category: "CRUD", description: "Edit form", demoPath: "" },
		{ name: "CrudEditDrawer", category: "CRUD", description: "Edit drawer", demoPath: "" },
		{ name: "CrudEditModal", category: "CRUD", description: "Edit modal", demoPath: "" },
		{ name: "CrudDeleteConfirm", category: "CRUD", description: "Delete confirmation", demoPath: "" },
		{ name: "CrudDetailDrawer", category: "CRUD", description: "Detail drawer", demoPath: "" },
		{ name: "AdvancedTable", category: "CRUD", description: "Advanced table features", demoPath: "/data/list" },
		{ name: "FacetedSearch", category: "CRUD", description: "Faceted filter panel", demoPath: "/data/list" },
		{ name: "WizardForm", category: "CRUD", description: "Multi-step form wizard", demoPath: "/data/list" },
		{ name: "ExportFlow", category: "CRUD", description: "Data export dialog", demoPath: "/data/list" },
		{ name: "ImportFlow", category: "CRUD", description: "File import with preview", demoPath: "/data/list" },
	];

	// Composables
	const composables = [
		{ name: "createTheme", category: "Design", description: "6 themes: editorial, dracula, nord, catppuccin, rose-pine, github", demoPath: "/app" },
		{ name: "createAesthetic", category: "Design", description: "4 aesthetics: editorial, glass, bento, expressive", demoPath: "/app" },
		{ name: "createDensity", category: "Design", description: "3 densities: compact, comfortable, spacious", demoPath: "/app" },
		{ name: "createDarkMode", category: "Design", description: "Light/dark mode via mode-watcher", demoPath: "/" },
		{ name: "createQuery", category: "Data", description: "Reactivity query cache with stale time, retry, refetch-on-focus", demoPath: "/data/list" },
		{ name: "createMutation", category: "Data", description: "Mutation with cache invalidation", demoPath: "/data/list" },
		{ name: "createApiClient", category: "Data", description: "Typed HTTP client (GET/POST/PUT/PATCH/DELETE)", demoPath: "" },
		{ name: "RealtimeClient", category: "Data", description: "SSE client with reconnection, gap detection", demoPath: "/chat" },
		{ name: "createForm", category: "Forms", description: "Valibot-based form state with dirty/touched/errors", demoPath: "/data/list" },
		{ name: "createWizard", category: "Forms", description: "Multi-step wizard with per-step validation", demoPath: "/data/list" },
		{ name: "createAuth", category: "Auth", description: "Token/user management, role/permission checks", demoPath: "" },
		{ name: "createAccess", category: "Auth", description: "Derived access helpers (isAdmin, can)", demoPath: "" },
		{ name: "createOmnibar", category: "UI", description: "Command palette state", demoPath: "/app" },
		{ name: "createToast", category: "UI", description: "Toast notifications via svelte-sonner", demoPath: "" },
		{ name: "createI18n", category: "i18n", description: "Reactive i18n with dictionary resolution", demoPath: "/" },
		{ name: "useBreakpoint", category: "UI", description: "Responsive breakpoint detection", demoPath: "/app" },
		{ name: "useClipboard", category: "UI", description: "Copy to clipboard", demoPath: "/app" },
		{ name: "useDebounce", category: "UI", description: "Debounced values", demoPath: "" },
		{ name: "useToggle", category: "UI", description: "Boolean toggle", demoPath: "/app" },
		{ name: "useCounter", category: "UI", description: "Counter state", demoPath: "/app" },
		{ name: "useLocalStorage", category: "UI", description: "LocalStorage reactive state", demoPath: "/app" },
		{ name: "useEventListener", category: "UI", description: "DOM event listener", demoPath: "" },
		{ name: "useIntersectionObserver", category: "UI", description: "Intersection observer", demoPath: "" },
		{ name: "useResizeObserver", category: "UI", description: "Resize observer", demoPath: "" },
		{ name: "shortcut", category: "Action", description: "Keyboard shortcut action", demoPath: "/app" },
	];

	let searchQuery = $state("");
	let activeCategory = $state("All");

	const categories = ["All", ...new Set(components.map(c => c.category))];

	let filteredComponents = $derived(
		components.filter(c => {
			const matchesSearch = searchQuery === "" ||
				c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				c.description.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesCategory = activeCategory === "All" || c.category === activeCategory;
			return matchesSearch && matchesCategory;
		})
	);

	let filteredComposables = $derived(
		composables.filter(c => {
			const matchesSearch = searchQuery === "" ||
				c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				c.description.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesCategory = activeCategory === "All" || c.category === activeCategory;
			return matchesSearch && matchesCategory;
		})
	);
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
	<PageHeader
		title="Component Index"
		description="Browse every component and composable in the bindrunes library ({components.length} components · {composables.length} composables)"
	/>

	<!-- Category Demo Pages -->
	<div>
		<h2 class="text-title-1 text-foreground mb-4">Interactive Demos</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each categoryDemos as demo}
				<a href={demo.path} class="block group">
					<Card padding class="h-full transition-all group-hover:shadow-md group-hover:scale-[1.01]">
						<div class="space-y-1">
							<h3 class="text-title-3 text-foreground group-hover:text-primary transition-colors">{demo.name}</h3>
							<p class="text-body-sm text-muted-foreground">{demo.description}</p>
						</div>
					</Card>
				</a>
			{/each}
		</div>
	</div>

	<!-- Search and Filter -->
	<div class="flex flex-col sm:flex-row gap-4">
		<div class="relative flex-1">
			<Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search components..."
				class="w-full h-10 pl-10 pr-4 rounded-[--radius-md] border border-border bg-background text-body-sm text-foreground"
			/>
		</div>
		<div class="flex flex-wrap gap-1">
			{#each categories as category}
				<button
					type="button"
					onclick={() => activeCategory = category}
					class="px-3 py-1.5 rounded-[--radius-sm] text-label-sm transition-colors cursor-pointer {activeCategory === category ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}"
				>
					{category}
				</button>
			{/each}
		</div>
	</div>

	<!-- Components -->
	{#if filteredComponents.length > 0}
		<div>
			<h2 class="text-title-1 text-foreground mb-4">Components ({filteredComponents.length})</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each filteredComponents as component}
					{#if component.demoPath}
						<a href={component.demoPath} class="block group">
							<Card padding class="h-full transition-all group-hover:shadow-md">
								<div class="space-y-2">
									<div class="flex items-center justify-between">
										<h3 class="text-title-3 text-foreground group-hover:text-primary transition-colors">{component.name}</h3>
										<Badge variant="outline" size="sm">{component.category}</Badge>
									</div>
									<p class="text-body-sm text-muted-foreground">{component.description}</p>
									<span class="text-label-sm text-primary group-hover:underline">View demo →</span>
								</div>
							</Card>
						</a>
					{:else}
						<Card padding class="h-full opacity-60">
							<div class="space-y-2">
								<div class="flex items-center justify-between">
									<h3 class="text-title-3 text-foreground">{component.name}</h3>
									<Badge variant="outline" size="sm">{component.category}</Badge>
								</div>
								<p class="text-body-sm text-muted-foreground">{component.description}</p>
							</div>
						</Card>
					{/if}
				{/each}
			</div>
		</div>
	{/if}

	<!-- Composables -->
	{#if filteredComposables.length > 0}
		<div>
			<h2 class="text-title-1 text-foreground mb-4">Composables ({filteredComposables.length})</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each filteredComposables as composable}
					{#if composable.demoPath}
						<a href={composable.demoPath} class="block group">
							<Card padding class="h-full transition-all group-hover:shadow-md">
								<div class="space-y-2">
									<div class="flex items-center justify-between">
										<h3 class="text-title-3 text-foreground group-hover:text-primary transition-colors font-mono">{composable.name}</h3>
										<Badge variant="outline" size="sm">{composable.category}</Badge>
									</div>
									<p class="text-body-sm text-muted-foreground">{composable.description}</p>
									<span class="text-label-sm text-primary group-hover:underline">View demo →</span>
								</div>
							</Card>
						</a>
					{:else}
						<Card padding class="h-full opacity-60">
							<div class="space-y-2">
								<div class="flex items-center justify-between">
									<h3 class="text-title-3 text-foreground font-mono">{composable.name}</h3>
									<Badge variant="outline" size="sm">{composable.category}</Badge>
								</div>
								<p class="text-body-sm text-muted-foreground">{composable.description}</p>
							</div>
						</Card>
					{/if}
				{/each}
			</div>
		</div>
	{/if}

	{#if filteredComponents.length === 0 && filteredComposables.length === 0}
		<div class="text-center py-12">
			<p class="text-body-lg text-muted-foreground">No components or composables match your search.</p>
		</div>
	{/if}
</div>
