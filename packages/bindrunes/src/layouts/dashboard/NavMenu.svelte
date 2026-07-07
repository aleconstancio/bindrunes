<script lang="ts">
import Tooltip from "../../primitives/Tooltip.svelte";
import type { NavGroup } from "../../shared-types";
import { SidebarGroup, SidebarMenu, SidebarMenuButton } from "../sidebar";
import { useSidebar } from "../sidebar/sidebar-context.svelte";

let {
	groups = [] as NavGroup[],
	pathname = "",
	onNavigate = undefined as ((to: string) => void) | undefined,
} = $props();

const sidebar = useSidebar();
</script>

{#each groups as group}
	<SidebarGroup label={group.label}>
		<SidebarMenu>
			{#each group.items as item}
				{@const isActive = (item.match ?? item.to) ? pathname.startsWith(item.match ?? item.to) : false}
				{#if sidebar.state === 'collapsed'}
					<Tooltip content={item.title}>
						<SidebarMenuButton
							isActive={isActive}
							href={item.to}
							onclick={onNavigate ? (e) => { e.preventDefault(); onNavigate?.(item.to); } : undefined}
						>
							{#if typeof item.icon === 'string'}
								<span class="text-title-1">{item.icon}</span>
							{:else}
								{@const Icon = item.icon}
								<Icon size={18} />
							{/if}
						</SidebarMenuButton>
					</Tooltip>
				{:else}
					<SidebarMenuButton
						isActive={isActive}
						href={item.to}
						onclick={onNavigate ? (e) => { e.preventDefault(); onNavigate?.(item.to); } : undefined}
					>
						{#if typeof item.icon === 'string'}
							<span class="text-title-1">{item.icon}</span>
						{:else}
							{@const Icon = item.icon}
							<Icon size={18} />
						{/if}
						<div class="min-w-0">
							<span class="text-label-md">{item.title}</span>
						</div>
					</SidebarMenuButton>
				{/if}
			{/each}
		</SidebarMenu>
	</SidebarGroup>
{/each}
