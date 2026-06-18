<script lang="ts">
import type { Snippet } from "svelte";
import type { StatusVariant } from "../../shared-types";
import StatusChip from "../StatusChip.svelte";

let {
	headerPrefix = "",
	resolvedTitle = "",
	resolvedDescription = "",
	headerActions,
	statusChip = undefined as
		| { variant?: StatusVariant; label?: string; dot?: boolean; animate?: boolean }
		| undefined,
	trigger,
	breadcrumb = undefined as Snippet | undefined,
}: {
	headerPrefix?: string;
	resolvedTitle?: string;
	resolvedDescription?: string;
	headerActions?: Snippet;
	statusChip?: { variant?: StatusVariant; label?: string; dot?: boolean; animate?: boolean };
	trigger?: Snippet;
	breadcrumb?: Snippet;
} = $props();
</script>

<header class="sticky top-0 z-20 shrink-0 border-b border-border bg-background/45 backdrop-blur-md transition-all duration-[--duration-fluid]">
	<div class="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
		<div class="flex min-w-0 items-center gap-3">
			{#if trigger}{@render trigger()}{/if}
			<div class="min-w-0">
				{#if breadcrumb}
					<div class="mb-1">{@render breadcrumb()}</div>
				{/if}
				{#if headerPrefix}
					<p class="text-body-sm font-bold uppercase tracking-[0.24em] text-muted-foreground">{headerPrefix}</p>
				{/if}
				<h1 class="truncate text-title-1 text-foreground">{resolvedTitle}</h1>
				{#if resolvedDescription}
					<p class="hidden text-body-md md:block text-muted-foreground">{resolvedDescription}</p>
				{/if}
			</div>
		</div>
		<div class="hidden lg:flex items-center gap-3">
		{#if headerActions}
			{@render headerActions()}
		{:else if statusChip?.label}
			<StatusChip variant={statusChip.variant ?? 'info'} label={statusChip.label} dot={statusChip.dot ?? true} animate={statusChip.animate ?? false} />
		{/if}
		</div>
	</div>
</header>
