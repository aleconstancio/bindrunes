<script lang="ts">
	import StatusChip from '../StatusChip.svelte';
	import type { StatusVariant } from '../../shared-types';

	let {
		headerPrefix = '',
		resolvedTitle = '',
		resolvedDescription = '',
		headerActions,
		statusChipVariant = undefined as StatusVariant | undefined,
		statusChipLabel = undefined as string | undefined,
		statusChipDot = true,
		statusChipAnimate = false,
		trigger,
	}: {
		headerPrefix?: string;
		resolvedTitle?: string;
		resolvedDescription?: string;
		headerActions?: import('svelte').Snippet;
		statusChipVariant?: StatusVariant;
		statusChipLabel?: string;
		statusChipDot?: boolean;
		statusChipAnimate?: boolean;
		trigger?: import('svelte').Snippet;
	} = $props();
</script>

<header class="sticky top-0 z-20 shrink-0 border-b border-border bg-background/45 backdrop-blur-md transition-all duration-300">
	<div class="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
		<div class="flex min-w-0 items-center gap-3">
			{#if trigger}{@render trigger()}{/if}
			<div class="min-w-0">
				{#if headerPrefix}
					<p class="text-body-sm font-bold uppercase tracking-[0.24em] text-muted-foreground">{headerPrefix}</p>
				{/if}
				<h1 class="truncate text-title-1 font-semibold text-foreground">{resolvedTitle}</h1>
				{#if resolvedDescription}
					<p class="hidden text-body-md md:block text-muted-foreground">{resolvedDescription}</p>
				{/if}
			</div>
		</div>
		<div class="hidden lg:flex items-center gap-3">
			{#if headerActions}
				{@render headerActions()}
			{:else if statusChipLabel}
				<StatusChip variant={statusChipVariant ?? 'info'} label={statusChipLabel} dot={statusChipDot} animate={statusChipAnimate} />
			{/if}
		</div>
	</div>
</header>
