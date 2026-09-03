<script lang="ts">
import type { DemoFooterConfig } from "./scaffold-types";

interface Props {
	footer?: DemoFooterConfig;
}

let { footer = {} }: Props = $props();

const year = new Date().getFullYear();
const copyright = footer.copyright ?? `\u00a9 ${year} urupe-ui`;
</script>

<footer class="border-t border-border py-6 text-center text-body-sm text-muted-foreground">
	{#if footer.links && footer.links.length > 0}
		<nav class="flex flex-wrap items-center justify-center gap-4 mb-4" aria-label="Footer links">
			{#each footer.links as link}
				<a
					href={link.href}
					class="text-label-md text-muted-foreground transition-colors hover:text-foreground"
				>
					{link.label}
				</a>
			{/each}
		</nav>
	{/if}

	<p>{copyright}</p>

	{#if footer.bottomLinks && footer.bottomLinks.length > 0}
		<nav class="flex flex-wrap items-center justify-center gap-4 mt-4" aria-label="Legal links">
			{#each footer.bottomLinks as link}
				<a
					href={link.href}
					class="text-body-sm text-muted-foreground transition-colors hover:text-foreground"
				>
					{link.label}
				</a>
			{/each}
		</nav>
	{/if}
</footer>
