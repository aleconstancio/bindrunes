<script lang="ts">
import { Menu, X } from "lucide-svelte";
import type { Snippet } from "svelte";
import { slide } from "svelte/transition";
import ThemeToggle from "../primitives/ThemeToggle.svelte";
import type { DemoNavLink } from "./scaffold-types";

interface Props {
	nav?: DemoNavLink[];
	showThemeToggle?: boolean;
	brand?: string;
	href?: string;
	headerActions?: Snippet;
	pathname?: string;
}

let {
	nav = [],
	showThemeToggle = true,
	brand = "bindrunes",
	href = "/",
	headerActions,
	pathname = "/",
}: Props = $props();

let mobileOpen = $state(false);

function isActive(linkHref: string): boolean {
	if (linkHref === "/") return pathname === "/";
	return pathname.startsWith(linkHref);
}

function closeMobile() {
	mobileOpen = false;
}

function handleKeydown(e: KeyboardEvent) {
	if (e.key === "Escape" && mobileOpen) {
		mobileOpen = false;
	}
}
</script>

<svelte:window onkeydown={handleKeydown} />

<header class="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-14">
			<a {href} class="text-title-2 text-foreground font-bold">{brand}</a>

			{#if nav.length > 0}
				<nav class="hidden lg:flex items-center gap-1" aria-label="Main navigation">
					{#each nav as link}
						<a
							href={link.href}
							class="px-3 py-1.5 text-label-sm rounded-[--radius-sm] transition-colors {isActive(link.href)
								? 'text-foreground bg-muted font-medium'
								: 'text-muted-foreground hover:text-foreground hover:bg-muted'}"
						>
							{link.label}
						</a>
					{/each}
				</nav>
			{/if}

			<div class="flex items-center gap-1">
				{#if headerActions}
					{@render headerActions()}
				{/if}
				{#if showThemeToggle}
					<ThemeToggle />
				{/if}

				{#if nav.length > 0}
					<button
						type="button"
						class="lg:hidden inline-flex items-center justify-center h-8 w-8 rounded-[--radius-sm] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
						onclick={() => (mobileOpen = !mobileOpen)}
						aria-label={mobileOpen ? "Close menu" : "Open menu"}
						aria-expanded={mobileOpen}
					>
						{#if mobileOpen}
							<X size={18} />
						{:else}
							<Menu size={18} />
						{/if}
					</button>
				{/if}
			</div>
		</div>
	</div>

	{#if mobileOpen}
		<div
			transition:slide={{ duration: 220 }}
			class="border-t border-border bg-background/95 backdrop-blur-lg lg:hidden"
			role="menu"
			tabindex="-1"
		>
			<div class="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
				{#each nav as link}
					<a
						href={link.href}
						class="px-3 py-2 text-body-md rounded-[--radius-sm] transition-colors {isActive(link.href)
							? 'text-foreground bg-muted font-medium'
							: 'text-muted-foreground hover:text-foreground hover:bg-muted'}"
						role="menuitem"
						onclick={closeMobile}
					>
						{link.label}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</header>
