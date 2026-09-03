<script lang="ts">
import "../app.css";
import { DemoLayout } from "urupe-ui/playground";

let { children } = $props();
</script>

<DemoLayout
	title="urupe-ui"
	description="The Svelte 5 component library and design system for building B2B SaaS applications at scale."
	shell="landing"
	showThemeToggle={false}
>
	{@render children()}
</DemoLayout>
