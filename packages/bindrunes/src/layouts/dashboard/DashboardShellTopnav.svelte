<script lang="ts">
import type { Component, Snippet } from "svelte";
import StatusChip from "../../components/StatusChip.svelte";
import ThemeToggle from "../../components/ThemeToggle.svelte";
import type { NavGroup, StatusVariant } from "../../shared-types";
import MetaScrollable from "../MetaScrollable.svelte";
import DashboardShellBrand from "./DashboardShellBrand.svelte";

let {
	appName = "",
	brandIcon = undefined as string | Component | undefined,
	navigation = [] as NavGroup[],
	pathname = undefined as string | undefined,
	headerActions,
	statusChip = undefined as
		| { variant?: StatusVariant; label?: string; dot?: boolean; animate?: boolean }
		| undefined,
	children,
}: {
	appName?: string;
	brandIcon?: string | Component;
	navigation?: NavGroup[];
	pathname?: string;
	headerActions?: Snippet;
	statusChip?: { variant?: StatusVariant; label?: string; dot?: boolean; animate?: boolean };
	children?: Snippet;
} = $props();

let pagePath = $derived(
	pathname ?? (typeof window !== "undefined" ? window.location.pathname : ""),
);
</script>

<div class="flex flex-col min-h-screen">
	<header class="sticky top-0 z-20 shrink-0 border-b border-border bg-background/45 backdrop-blur-md transition-all duration-[--duration-fluid]">
		<div class="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
			<div class="flex items-center gap-6">
				<DashboardShellBrand {brandIcon} {appName} />
				<nav class="hidden md:flex items-center gap-1">
					{#each navigation as group}
						{#each group.items as item}
							<a
								href={item.to}
								class="px-3 py-1.5 text-label-md rounded transition-colors"
								class:text-foreground={pagePath.startsWith(item.to)}
								class:text-muted-foreground={!pagePath.startsWith(item.to)}
								class:bg-muted={pagePath.startsWith(item.to)}
								class:bg-transparent={!pagePath.startsWith(item.to)}
							>
								{item.title}
							</a>
						{/each}
					{/each}
				</nav>
			</div>
			<div class="flex items-center gap-3">
				{#if headerActions}
					{@render headerActions()}
				{:else if statusChip?.label}
					<StatusChip variant={statusChip.variant ?? 'info'} label={statusChip.label} dot={statusChip.dot ?? true} animate={statusChip.animate ?? false} />
				{/if}
				<ThemeToggle />
			</div>
		</div>
	</header>
	<main class="flex-1 min-w-0">
		<MetaScrollable class="h-full">
			{@render children?.()}
		</MetaScrollable>
	</main>
</div>
