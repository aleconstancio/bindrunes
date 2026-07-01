<script lang="ts">
	import {
		Button,
		ThemeToggle,
	} from "bindrunes";
	import {
		SidebarProvider,
		Sidebar,
		SidebarHeader,
		SidebarContent,
		SidebarGroup,
		SidebarMenu,
		SidebarMenuItem,
		SidebarMenuButton,
		SidebarTrigger,
		SidebarSeparator,
	} from "bindrunes/layouts";
	import {
		Layout,
		Shield,
		BarChart3,
		Settings,
		Globe,
		FileText,
		Briefcase,
		Database,
		ShoppingCart,
		Image,
		Calendar,
		MessageSquare,
		Palette,
		Paintbrush,
		Boxes,
		Play,
		BookOpen,
		Server,
		LucideGitBranch,
		Rss,
		ChevronRight,
	} from "lucide-svelte";

	let {
		pathname = "/",
		children,
	}: {
		pathname?: string;
		children: import("svelte").Snippet;
	} = $props();

	const groups = [
		{
			label: "Demos",
			items: [
				{ href: "/app", label: "App", icon: Layout },
				{ href: "/auth/login", label: "Auth", icon: Shield },
				{ href: "/dashboard", label: "Dashboard", icon: BarChart3 },
				{ href: "/settings", label: "Settings", icon: Settings },
				{ href: "/landing", label: "Landing", icon: Globe },
				{ href: "/marketing/blog", label: "Marketing", icon: FileText },
				{ href: "/portfolio", label: "Portfolio", icon: Briefcase },
				{ href: "/data/list", label: "Data", icon: Database },
				{ href: "/ecommerce", label: "E-commerce", icon: ShoppingCart },
				{ href: "/media", label: "Media", icon: Image },
				{ href: "/calendar", label: "Calendar", icon: Calendar },
				{ href: "/chat", label: "Chat", icon: MessageSquare },
			],
		},
		{
			label: "Design",
			items: [
				{ href: "/themes", label: "Themes", icon: Palette },
				{ href: "/aesthetics", label: "Aesthetics", icon: Paintbrush },
				{ href: "/components", label: "Components", icon: Boxes },
				{ href: "/playground", label: "Playground", icon: Play },
			],
		},
		{
			label: "Documentation",
			items: [
				{ href: "/docs/getting-started", label: "Getting Started", icon: BookOpen },
				{ href: "/docs/architecture", label: "Architecture", icon: Layout },
				{ href: "/docs/components", label: "Components", icon: Boxes },
				{ href: "/docs/composables", label: "Composables", icon: Settings },
				{ href: "/docs/design-system", label: "Design System", icon: Palette },
				{ href: "/docs/accessibility", label: "Accessibility", icon: Shield },
				{ href: "/docs/security", label: "Security", icon: Shield },
				{ href: "/docs/testing", label: "Testing", icon: Settings },
				{ href: "/docs/agentic", label: "Agentic", icon: MessageSquare },
				{ href: "/docs/changelog", label: "Changelog", icon: FileText },
				{ href: "/docs/contributing", label: "Contributing", icon: FileText },
			],
		},
		{
			label: "Kit",
			items: [
				{ href: "/kit/getting-started", label: "Getting Started", icon: BookOpen },
				{ href: "/kit/full-stack", label: "Full-Stack", icon: Server },
				{ href: "/kit/auth", label: "Auth", icon: Shield },
				{ href: "/kit/i18n", label: "i18n", icon: Globe },
				{ href: "/kit/deployment", label: "Deployment", icon: Server },
				{ href: "/kit/api-reference", label: "API Reference", icon: FileText },
			],
		},
		{
			label: "Migration",
			items: [
				{ href: "/migration/shadcn-svelte", label: "shadcn-svelte", icon: LucideGitBranch },
				{ href: "/migration/bootstrap", label: "Bootstrap", icon: LucideGitBranch },
				{ href: "/migration/ant-design", label: "Ant Design", icon: LucideGitBranch },
				{ href: "/migration/material-ui", label: "Material UI", icon: LucideGitBranch },
			],
		},
		{
			label: "Blog",
			items: [
				{ href: "/blog/why-bindrunes", label: "Why bindrunes", icon: Rss },
				{ href: "/blog/3-axis-design-system", label: "3-Axis Design", icon: Palette },
			],
		},
	];

	function isActive(href: string): boolean {
		if (href === "/") return pathname === "/";
		return pathname === href || pathname.startsWith(href + "/");
	}
</script>

<SidebarProvider defaultOpen={true} collapsible="icon">
	<Sidebar>
		<SidebarHeader>
			<div class="flex items-center gap-2 px-3 py-2">
				<a href="/" class="text-title-2 text-sidebar-foreground font-bold no-underline">⬡</a>
				<span class="text-title-2 text-sidebar-foreground font-bold group-data-[collapsed=true]:hidden">bindrunes</span>
			</div>
		</SidebarHeader>

		<SidebarSeparator />

		<SidebarContent>
			{#each groups as group}
				<SidebarGroup label={group.label}>
					<SidebarMenu>
						{#each group.items as item}
							<SidebarMenuItem>
								<SidebarMenuButton href={item.href} isActive={isActive(item.href)}>
									<item.icon size={16} />
									<span>{item.label}</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						{/each}
					</SidebarMenu>
				</SidebarGroup>
			{/each}
		</SidebarContent>
	</Sidebar>

	<div class="flex flex-col flex-1 min-w-0">
		<!-- Top bar -->
		<header class="sticky top-0 z-40 flex items-center gap-2 h-12 px-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<SidebarTrigger />
			<div class="ml-auto flex items-center gap-2">
				<Button href="/docs/getting-started" variant="primary" size="sm">Get Started</Button>
				<Button href="https://github.com/aleconstancio/bindrunes" variant="ghost" size="sm" target="_blank" rel="noopener noreferrer">GitHub</Button>
				<Button href="https://www.npmjs.com/package/bindrunes" variant="ghost" size="sm" target="_blank" rel="noopener noreferrer">npm</Button>
				<ThemeToggle />
			</div>
		</header>

		<!-- Page content -->
		<main class="flex-1 overflow-y-auto">
			{@render children()}
		</main>
	</div>
</SidebarProvider>
