<script lang="ts">
import type { Component } from "svelte";
import { useSidebar } from "../sidebar/sidebar-context.svelte";

let {
	brandIcon = undefined as string | Component | undefined,
	appName = "",
	appSubtitle = undefined as string | undefined,
}: {
	brandIcon?: string | Component;
	appName?: string;
	appSubtitle?: string;
} = $props();

const sidebar = useSidebar();
</script>

<div class="flex items-center gap-3 py-1 px-2">
	{#if brandIcon}
		{#if typeof brandIcon === 'string'}
			<span class="text-headline-2">{brandIcon}</span>
		{:else}
			{@const BrandIcon = brandIcon}
			<BrandIcon size={24} class="text-primary" />
		{/if}
	{/if}
	{#if sidebar.state === 'expanded'}
		<div>
			<p class="text-body-sm font-bold uppercase tracking-[--text-letter-spacing-widest] text-muted-foreground">{appName}</p>
			{#if appSubtitle}
				<p class="text-body-lg font-semibold text-foreground">{appSubtitle}</p>
			{/if}
		</div>
	{/if}
</div>
