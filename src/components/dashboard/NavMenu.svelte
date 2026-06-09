<script lang="ts">
  import { SidebarGroup, SidebarMenu, SidebarMenuButton } from '../sidebar/index';
  import type { NavGroup } from '../../shared-types';

  let {
    groups = [] as NavGroup[],
    pathname = '',
    onNavigate = undefined as ((to: string) => void) | undefined,
  } = $props();
</script>

{#each groups as group}
  <SidebarGroup label={group.label}>
    <SidebarMenu>
      {#each group.items as item}
        {@const isActive = (item.match ?? item.to) ? pathname.startsWith(item.match ?? item.to) : false}
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
            <p class="text-mono-xs mt-[0.1rem] text-muted-foreground">{item.description}</p>
          </div>
        </SidebarMenuButton>
      {/each}
    </SidebarMenu>
  </SidebarGroup>
{/each}

