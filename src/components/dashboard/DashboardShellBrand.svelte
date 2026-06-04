<script lang="ts">
	import type { Component } from 'svelte';

	let {
		brandIcon = undefined as string | Component | undefined,
		appName = '',
		appSubtitle = undefined as string | undefined,
	}: {
		brandIcon?: string | Component;
		appName?: string;
		appSubtitle?: string;
	} = $props();
</script>

{#if brandIcon || appName}
	<div class="flex items-center gap-3 py-1">
		{#if brandIcon}
			{#if typeof brandIcon === 'string'}
				<span class="text-headline-2">{brandIcon}</span>
			{:else}
				{@const BrandIcon = brandIcon}
				<BrandIcon size={24} style="color: var(--primary)" />
			{/if}
		{/if}
		<div>
			<p class="text-body-sm font-bold uppercase tracking-[0.26em] text-muted-foreground">{appName}</p>
			{#if appSubtitle}
				<p class="text-body-lg font-semibold text-foreground">{appSubtitle}</p>
			{/if}
		</div>
	</div>
{/if}
