<script lang="ts">
	import { Card, Badge } from "bindrunes";
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
	} from "lucide-svelte";

	const categories = [
		{ href: "/app", title: "App", description: "Core layout, sidebar, navigation primitives", icon: Layout, color: "text-blue-500" },
		{ href: "/auth/login", title: "Auth", description: "Login, register, 2FA, social login, split layout", icon: Shield, color: "text-red-500" },
		{ href: "/dashboard", title: "Dashboard", description: "Overview stats, activity feed, split panels", icon: BarChart3, color: "text-green-500" },
		{ href: "/settings", title: "Settings", description: "Profile, security, notifications, danger zone", icon: Settings, color: "text-gray-500" },
		{ href: "/landing", title: "Landing", description: "Hero, features, pricing, testimonials, FAQ", icon: Globe, color: "text-purple-500" },
		{ href: "/marketing/blog", title: "Marketing", description: "Blog, changelog, docs layout, content sections", icon: FileText, color: "text-orange-500" },
		{ href: "/portfolio", title: "Portfolio", description: "Project grid, case studies, showcase", icon: Briefcase, color: "text-yellow-500" },
		{ href: "/data/list", title: "Data", description: "CRUD tables, forms, wizards, import/export", icon: Database, color: "text-cyan-500" },
		{ href: "/ecommerce", title: "E-commerce", description: "Products, cart, checkout, order summary", icon: ShoppingCart, color: "text-pink-500" },
		{ href: "/media", title: "Media", description: "Image upload, video player, audio, gallery", icon: Image, color: "text-indigo-500" },
		{ href: "/calendar", title: "Calendar", description: "Event calendar, scheduler, booking forms", icon: Calendar, color: "text-teal-500" },
		{ href: "/chat", title: "Chat", description: "AI chat interface, messages, conversation list", icon: MessageSquare, color: "text-violet-500" },
	];

	const stats = [
		{ value: "160+", label: "Components" },
		{ value: "47", label: "Composables" },
		{ value: "6", label: "Themes" },
		{ value: "12", label: "Boundrune Categories" },
	];
</script>

<div class="min-h-screen">
	<!-- Hero -->
	<section class="relative overflow-hidden border-b border-border">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
			<Badge variant="primary" size="lg">Svelte 5 + Tailwind v4</Badge>
			<h1 class="text-display-1 text-foreground tracking-tight">
				bindrunes
			</h1>
			<p class="text-body-lg text-muted-foreground max-w-2xl mx-auto">
				160+ components · 47 composables · 12 Boundrune categories · 6 themes.
				A complete design system for building modern Svelte applications.
			</p>
			<div class="flex items-center justify-center gap-4 pt-4">
				<a
					href="/landing"
					class="inline-flex items-center justify-center gap-2 h-10 px-6 rounded-[--radius-md] bg-primary text-primary-foreground text-label-md font-medium hover:opacity-90 transition-opacity"
				>
					Explore Demos
				</a>
				<a
					href="https://github.com/aleconstancio/bindrunes"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center gap-2 h-10 px-6 rounded-[--radius-md] border border-border bg-background text-foreground text-label-md font-medium hover:bg-muted transition-colors"
				>
					View on GitHub
				</a>
			</div>
		</div>
	</section>

	<!-- Stats bar -->
	<section class="border-b border-border bg-muted/30">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
				{#each stats as stat}
					<div class="text-center">
						<div class="text-display-3 text-foreground font-bold">{stat.value}</div>
						<div class="text-body-sm text-muted-foreground mt-1">{stat.label}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Category grid -->
	<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
		<div class="text-center space-y-3 mb-12">
			<h2 class="text-display-2 text-foreground">Explore Every Category</h2>
			<p class="text-body-lg text-muted-foreground max-w-xl mx-auto">
				Each page demonstrates real working examples with interactive demos.
			</p>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
			{#each categories as category}
				<a href={category.href} class="block group">
					<Card variant="glass" padding class="h-full transition-all duration-200 group-hover:shadow-lg group-hover:scale-[1.02]">
						<div class="space-y-3">
							<div class="flex items-center gap-3">
								<div class="flex h-10 w-10 items-center justify-center rounded-[--radius-lg] bg-muted">
									<category.icon class="h-5 w-5 {category.color}" />
								</div>
								<h3 class="text-title-2 text-foreground group-hover:text-primary transition-colors">{category.title}</h3>
							</div>
							<p class="text-body-sm text-muted-foreground">{category.description}</p>
							<div class="pt-1">
								<span class="text-label-sm text-primary group-hover:underline">View demos →</span>
							</div>
						</div>
					</Card>
				</a>
			{/each}
		</div>
	</section>

	<!-- Component index link -->
	<section class="border-t border-border">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center space-y-4">
			<h2 class="text-title-1 text-foreground">Component Index</h2>
			<p class="text-body text-muted-foreground">
				Browse every component and composable in the library.
			</p>
			<a
				href="/components"
				class="inline-flex items-center justify-center gap-2 h-10 px-6 rounded-[--radius-md] border border-border bg-background text-foreground text-label-md font-medium hover:bg-muted transition-colors"
			>
				Open Component Index →
			</a>
		</div>
	</section>
</div>
