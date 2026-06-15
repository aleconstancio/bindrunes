<script lang="ts">
import "../app.css";
import { DemoLayout } from "bindrunes/scaffold";

let { children } = $props();
</script>

<DemoLayout
	title="bindrunes"
	description="The Svelte 5 component library and design system for building B2B SaaS applications at scale."
	shell="landing"
	showThemeToggle={false}
>
	{@render children()}
</DemoLayout>
