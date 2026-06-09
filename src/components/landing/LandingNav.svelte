<script lang="ts">
import { Menu, X } from "lucide-svelte";
import { onMount } from "svelte";
import { slide } from "svelte/transition";
import type { TFunction } from "../../shared-types";
import Button from "../Button.svelte";
import DynamicIcon from "../DynamicIcon.svelte";
import NavigationMenu from "../NavigationMenu.svelte";
import ThemeToggle from "../ThemeToggle.svelte";
import { useLanding } from "./landing-context.svelte";

interface NavLogo {
	href: string;
	label: string;
	icon?: import("svelte").Component | string;
}

interface NavLink {
	label: string;
	href: string;
}

interface NavCTA {
	label: string;
	href: string;
	variant?: "primary" | "outline";
}

interface Props {
	logo?: NavLogo;
	links: NavLink[];
	cta?: NavCTA;
	sectionIds?: string[];
	children?: import("svelte").Snippet;
	t?: TFunction;
}

let { logo, links, cta, sectionIds = [], children, t }: Props = $props();

const landing = useLanding();

let observers: IntersectionObserver[] = [];

onMount(() => {
	observers = sectionIds
		.map((id) => {
			const el = document.getElementById(id);
			if (!el) return null;
			const observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) {
						landing.setActiveSection(id);
					}
				},
				{ rootMargin: "-40% 0px -45% 0px" },
			);
			observer.observe(el);
			return observer;
		})
		.filter(Boolean) as IntersectionObserver[];

	return () => observers.forEach((o) => o.disconnect());
});

function handleKeydown(e: KeyboardEvent) {
	if (e.key === "Escape" && landing.menuOpen) {
		landing.setMenuOpen(false);
	}
}
</script>

<nav class="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
	<div class="progress-bar"></div>
	<div class="mx-auto flex max-w-[var(--container-2xl)] items-center justify-between px-6 py-3">
		{#if logo}
			<a href={logo.href} class="flex items-center gap-2 no-underline">
				<DynamicIcon icon={logo.icon} size={22} class="text-primary" />
				<span class="text-title-1 text-foreground">{logo.label}</span>
			</a>
		{:else}
			<div></div>
		{/if}

		<div class="hidden md:block">
			<NavigationMenu {links} activeId={landing.activeSection} />
		</div>

		<div class="flex items-center gap-2">
			<div class="hidden sm:block">
				<ThemeToggle variant="icon" />
			</div>
			<button
				class="flex items-center justify-center rounded-[--radius] p-2 transition-colors hover:bg-muted md:hidden"
				onclick={() => landing.setMenuOpen(!landing.menuOpen)}
				aria-label="Menu"
				aria-expanded={landing.menuOpen}
			>
				{#if landing.menuOpen}
					<X size={20} class="text-foreground" />
				{:else}
					<Menu size={20} class="text-foreground" />
				{/if}
			</button>
			{#if cta}
				<Button variant={cta.variant ?? 'primary'} href={cta.href} class="text-label-md">
					{cta.label}
				</Button>
			{/if}
		</div>
	</div>

	{#if landing.menuOpen}
		<div transition:slide={{ duration: 220 }} class="border-t border-border bg-background/95 backdrop-blur-lg px-6 py-5 md:hidden" role="menu" tabindex="-1" onkeydown={handleKeydown}>
			<div class="flex flex-col gap-5">
				{#each links as link}
					<a
						href={link.href}
						class="text-left text-body-lg font-medium no-underline transition-colors hover:text-foreground {landing.activeSection === link.href.replace('#', '') ? 'text-foreground' : 'text-muted-foreground'}"
						onclick={() => landing.setMenuOpen(false)}
					>
						{link.label}
					</a>
				{/each}
				<div class="border-t border-border pt-4">
					<div class="flex items-center gap-3">
						<ThemeToggle variant="icon" />
						<span class="text-label-md text-muted-foreground">{t?.('landing.LandingNav.toggleTheme') ?? 'Alternar tema'}</span>
					</div>
				</div>
			</div>
		</div>
	{/if}

	{#if children}
		<div class="px-6 py-3 border-t border-border md:hidden">
			{@render children()}
		</div>
	{/if}
</nav>

<style>
	.progress-bar {
		position: absolute;
		bottom: 0;
		left: 0;
		height: 2px;
		background: var(--primary);
		transform-origin: left;
		scale: 0 1;
		animation: progress linear;
		animation-timeline: scroll(root);
	}

	@supports not (animation-timeline: scroll()) {
		.progress-bar {
			display: none;
		}
	}
</style>
