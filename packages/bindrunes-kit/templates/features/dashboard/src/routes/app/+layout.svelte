<script lang="ts">
	
	import { MetaLayout, MetaScrollable, ThemeToggle } from "bindrunes";
	import {
		Sidebar,
		SidebarContent,
		SidebarFooter,
		SidebarGroup,
		SidebarHeader,
		SidebarMenu,
		SidebarMenuButton,
		SidebarProvider,
		SidebarTrigger,
	} from "bindrunes/layouts";
import type { Snippet } from "svelte";
	import { afterNavigate, goto } from "$app/navigation";
	import { page } from "$app/state";

	let { children }: { children?: Snippet } = $props();

	let pathname = $state(page.url.pathname);

	afterNavigate(() => {
		pathname = page.url.pathname;
	});

	const navigation = [
		{
			label: "Main",
			items: [
				{ title: "Dashboard", to: "/app", icon: "📊", description: "Overview" },
				{ title: "Items", to: "/app/items", icon: "📦", description: "Manage items" },
			],
		},
		{
			label: "Account",
			items: [
				{ title: "Settings", to: "/app/settings", icon: "⚙️", description: "Preferences" },
				{ title: "Billing", to: "/app/billing", icon: "💳", description: "Subscription" },
			],
		},
	];
</script>

<SidebarProvider defaultOpen collapsible="icon">
	<Sidebar>
		<SidebarHeader>
			<div class="flex items-center gap-2 px-3 py-2">
				<span class="text-lg">🚀</span>
				<span class="text-label-lg font-semibold text-foreground group-data-[collapsible=icon]:hidden">
					My App
				</span>
			</div>
		</SidebarHeader>

		<SidebarContent>
			{#each navigation as group}
				<SidebarGroup label={group.label}>
					<SidebarMenu>
						{#each group.items as item}
							{@const isActive = pathname === item.to || pathname.startsWith(`${item.to}/`)}
							<SidebarMenuButton {isActive} href={item.to}>
								<span>{item.icon}</span>
								<div class="min-w-0">
									<span class="text-label-md">{item.title}</span>
									<p class="text-mono-xs mt-[0.1rem] text-muted-foreground">{item.description}</p>
								</div>
							</SidebarMenuButton>
						{/each}
					</SidebarMenu>
				</SidebarGroup>
			{/each}
		</SidebarContent>

		<SidebarFooter>
			<ThemeToggle />
		</SidebarFooter>
	</Sidebar>

	<div class="flex-1 flex flex-col min-w-0 h-screen">
		<header class="shrink-0 border-b border-border bg-background/45 backdrop-blur-md z-20">
			<div class="flex items-center gap-3 px-4 h-14">
				<SidebarTrigger />
				<h1 class="text-label-lg text-foreground">My App</h1>
			</div>
		</header>
		<main class="flex-1 min-w-0">
			<MetaScrollable class="h-full">
				{@render children?.()}
			</MetaScrollable>
		</main>
	</div>
</SidebarProvider>
