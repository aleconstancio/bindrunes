<script lang="ts">
	import { Button, ThemeToggle, NavigationMenu } from "urupe-ui";

	let {
		pathname = "/",
	}: {
		pathname?: string;
	} = $props();

	const links = [
		{ label: "Docs", href: "/docs/getting-started" },
		{ label: "Components", href: "/components" },
		{ label: "GitHub", href: "https://github.com/aleconstancio/urupe-ui" },
	];
</script>

<header class="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
		<a href="/" class="flex items-center gap-2 no-underline">
			<span class="text-title-1 text-foreground font-bold">⬡</span>
			<span class="text-title-2 text-foreground font-bold">urupe-ui</span>
		</a>

		<nav class="hidden sm:flex items-center">
			<NavigationMenu {links} />
		</nav>

		<div class="flex items-center gap-2">
			<Button href="/docs/getting-started" variant="primary" size="sm">Get Started</Button>
			<Button href="/app" variant="ghost" size="sm">Demos</Button>
			<ThemeToggle />
		</div>
	</div>
</header>
