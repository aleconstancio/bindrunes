<script lang="ts">
	import "../app.css";
	import { page } from "$app/state";
	import { AppProvider, SEO } from "bindrunes";
	import { Toaster } from "svelte-sonner";
	import HomepageTopbar from "$lib/components/HomepageTopbar.svelte";
	import ShowcaseSidebar from "$lib/components/ShowcaseSidebar.svelte";

	let { children } = $props();

	const isHomepage = $derived(page.url.pathname === "/");
</script>

<SEO
	title="bindrunes — The Svelte design system for the modern web"
	description="248+ components, 53+ composables, 126 theme combinations — everything you need to build beautiful Svelte apps."
/>

<AppProvider themeDefault="editorial" aestheticDefault="minimal" densityDefault="comfortable">
	{#if isHomepage}
		<!-- Homepage: clean landing layout -->
		<HomepageTopbar pathname={page.url.pathname} />
		{@render children()}
	{:else}
		<!-- Demo/Docs pages: sidebar layout -->
		<ShowcaseSidebar pathname={page.url.pathname}>
			{@render children()}
		</ShowcaseSidebar>
	{/if}
</AppProvider>

<Toaster />
