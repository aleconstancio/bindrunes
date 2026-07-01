<script lang="ts">
	import "../app.css";
	import { page } from "$app/state";
	import { DemoLayout } from "bindrunes/playground";
	import { createI18n } from "bindrunes";
	import en from "bindrunes/i18n/en";
	import ptBR from "bindrunes/i18n/pt-BR";
	import { Globe } from "lucide-svelte";
	import { Toaster } from "svelte-sonner";
	import DesignSystemSwitcher from "$lib/components/DesignSystemSwitcher.svelte";

	let { children } = $props();

	const i18n = createI18n({
		default: "en",
		dicts: { en, "pt-BR": ptBR },
	});

	const nav = [
		{ href: "/app", label: "App" },
		{ href: "/auth/login", label: "Auth" },
		{ href: "/dashboard", label: "Dashboard" },
		{ href: "/settings", label: "Settings" },
		{ href: "/landing", label: "Landing" },
		{ href: "/marketing/blog", label: "Marketing" },
		{ href: "/portfolio", label: "Portfolio" },
		{ href: "/data/list", label: "Data" },
		{ href: "/ecommerce", label: "E-commerce" },
		{ href: "/media", label: "Media" },
		{ href: "/calendar", label: "Calendar" },
		{ href: "/chat", label: "Chat" },
		{ href: "/themes", label: "Themes" },
		{ href: "/aesthetics", label: "Aesthetics" },
		{ href: "/components", label: "Components" },
		{ href: "/playground", label: "Playground" },
		{ href: "/docs", label: "Docs — Getting Started" },
		{ href: "/docs/architecture", label: "Docs — Architecture" },
		{ href: "/docs/components", label: "Docs — Components" },
		{ href: "/docs/composables", label: "Docs — Composables" },
		{ href: "/docs/design-system", label: "Docs — Design System" },
		{ href: "/docs/accessibility", label: "Docs — Accessibility" },
		{ href: "/docs/security", label: "Docs — Security" },
		{ href: "/docs/testing", label: "Docs — Testing" },
		{ href: "/docs/agentic", label: "Docs — Agentic" },
		{ href: "/docs/changelog", label: "Docs — Changelog" },
		{ href: "/docs/contributing", label: "Docs — Contributing" },
		{ href: "/kit/getting-started", label: "Kit — Getting Started" },
		{ href: "/kit/full-stack", label: "Kit — Full-Stack" },
		{ href: "/kit/auth", label: "Kit — Auth" },
		{ href: "/kit/i18n", label: "Kit — i18n" },
		{ href: "/kit/deployment", label: "Kit — Deployment" },
		{ href: "/kit/api-reference", label: "Kit — API Reference" },
		{ href: "/migration/shadcn-svelte", label: "Migration — shadcn-svelte" },
		{ href: "/migration/bootstrap", label: "Migration — Bootstrap" },
		{ href: "/migration/ant-design", label: "Migration — Ant Design" },
		{ href: "/migration/material-ui", label: "Migration — Material UI" },
		{ href: "/blog/why-bindrunes", label: "Blog — Why bindrunes" },
		{ href: "/blog/3-axis-design-system", label: "Blog — 3-Axis Design" },
	];

	function toggleLocale() {
		i18n.setLocale(i18n.locale === "en" ? "pt-BR" : "en");
	}
</script>

<DemoLayout
	title="bindrunes Showcase"
	description="Component showcase for the bindrunes design system"
	{nav}
	pathname={page.url.pathname}
	footer={{
		copyright: "\u00a9 2026 bindrunes. MIT License.",
		links: [
			{ label: "GitHub", href: "https://github.com/aleconstancio/bindrunes" },
			{ label: "npm", href: "https://www.npmjs.com/package/bindrunes" },
		],
		bottomLinks: [
			{ label: "Documentation", href: "/components" },
			{ label: "Design System", href: "/landing" },
		],
	}}
>
	{#snippet headerActions()}
		<DesignSystemSwitcher />

		<button
			type="button"
			class="hidden sm:inline-flex items-center gap-1.5 h-8 px-2.5 rounded-[--radius-sm] border border-border bg-muted/50 text-muted-foreground text-label-sm hover:bg-muted transition-colors cursor-pointer"
			title="Press Ctrl+K to open command palette"
		>
			<span>Ctrl+K</span>
		</button>

		<button
			type="button"
			onclick={toggleLocale}
			class="inline-flex items-center justify-center h-8 w-8 rounded-[--radius-sm] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
			title="Toggle language"
		>
			<Globe class="h-4 w-4" />
			<span class="sr-only">{i18n.locale === "en" ? "Switch to Portuguese" : "Switch to English"}</span>
		</button>

		<a
			href="https://github.com/aleconstancio/bindrunes"
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center justify-center h-8 w-8 rounded-[--radius-sm] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
			title="View on GitHub"
		>
			<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
			<span class="sr-only">GitHub</span>
		</a>

		<a
			href="https://www.npmjs.com/package/bindrunes"
			target="_blank"
			rel="noopener noreferrer"
			class="hidden sm:inline-flex items-center h-8 px-2.5 rounded-[--radius-sm] text-label-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
			title="View on npm"
		>
			npm
		</a>
	{/snippet}

	{@render children()}
</DemoLayout>

<Toaster />
