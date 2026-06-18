<script lang="ts">
import type { Snippet } from "svelte";
import DashboardShellHeader from "../../dashboard/DashboardShellHeader.svelte";
import PageShell from "../../PageShell.svelte";
import TabbedSettings from "./TabbedSettings.svelte";

interface SettingsTab {
	id: string;
	label: string;
	icon?: Snippet;
}

let {
	title = "Settings",
	activeTab = $bindable(""),
	tabs = [] as SettingsTab[],
	class: className = "",
	header,
	footer,
	tabContent,
	children,
}: {
	title?: string;
	activeTab?: string;
	tabs?: SettingsTab[];
	class?: string;
	header?: Snippet;
	footer?: Snippet;
	tabContent?: Snippet<[SettingsTab]>;
	children?: Snippet;
} = $props();
</script>

{#snippet topbar()}
	<DashboardShellHeader resolvedTitle={title} />
{/snippet}

<PageShell topbar={topbar} class={className}>
	{#snippet main()}
		<div class="p-6">
			{#if header}
				<div class="mb-6">{@render header()}</div>
			{/if}
			<TabbedSettings {tabs} bind:activeTab>
				{#snippet tabContent(tab)}
					{#if tabContent}
						{@render tabContent(tab)}
					{/if}
				{/snippet}
			</TabbedSettings>
			{#if footer}
				<div class="mt-6">{@render footer()}</div>
			{/if}
		</div>
	{/snippet}
</PageShell>
