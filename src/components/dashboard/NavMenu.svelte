<script lang="ts">
  import { SidebarGroup, SidebarMenu, SidebarMenuButton } from '../sidebar/index.js';
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
        <SidebarMenuButton isActive={isActive}>
          {#if typeof item.icon === 'string'}
            <span class="text-lg">{item.icon}</span>
          {:else}
            {@const Icon = item.icon}
            <Icon size={18} />
          {/if}
          <div class="min-w-0">
            <span class="text-sm font-medium">{item.title}</span>
            <p class="text-[0.7rem] mt-[0.1rem] opacity-70">{item.description}</p>
          </div>
        </SidebarMenuButton>
      {/each}
    </SidebarMenu>
  </SidebarGroup>
{/each}
