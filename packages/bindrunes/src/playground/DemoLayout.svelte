<script lang="ts">
import type { Snippet } from "svelte";
import { AppProvider, SEO } from "urupe-ui";
import DemoFooter from "./DemoFooter.svelte";
import DemoNav from "./DemoNav.svelte";
import { createDemoState } from "./scaffold-context.svelte";
import type {
	AestheticPreset,
	DemoFooterConfig,
	DemoNavLink,
	DensityPreset,
	ShellMode,
	ThemePreset,
} from "./scaffold-types";

interface Props {
	title?: string;
	description?: string;
	shell?: ShellMode;
	theme?: ThemePreset;
	aesthetic?: AestheticPreset;
	density?: DensityPreset;
	nav?: DemoNavLink[];
	footer?: DemoFooterConfig;
	showThemeToggle?: boolean;
	brand?: string;
	brandHref?: string;
	pathname?: string;
	headerActions?: Snippet;
	children: Snippet;
}

let {
	title = "urupe-ui Demo",
	description = "Component demo for urupe-ui",
	shell = "default",
	theme = "editorial",
	aesthetic = "minimal",
	density = "comfortable",
	nav = [],
	footer = {},
	showThemeToggle = true,
	brand = "urupe-ui",
	brandHref = "/",
	pathname = "/",
	headerActions,
	children,
}: Props = $props();

createDemoState({
	title,
	description,
	nav,
	footer,
	shell,
	theme,
	aesthetic,
	density,
	showThemeToggle,
});
</script>

<SEO {title} {description} />

{#if shell === "default"}
	<a
		href="#main-content"
		class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
	>
		Skip to content
	</a>
{/if}

<AppProvider themeDefault={theme} aestheticDefault={aesthetic} densityDefault={density}>
	{#if shell === "default"}
		<div class="min-h-screen flex flex-col">
			<DemoNav {nav} {showThemeToggle} brand={brand} href={brandHref} {pathname} {headerActions} />

			<main id="main-content" class="flex-1">
				{@render children()}
			</main>

			<DemoFooter {footer} />
		</div>
	{:else}
		{@render children()}
	{/if}
</AppProvider>
