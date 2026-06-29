<script lang="ts">
import { CrudTemplate } from "bindrunes/layouts";

const users = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "User" },
  { id: "3", name: "Carol Davis", email: "carol@example.com", role: "Editor" },
  { id: "4", name: "David Wilson", email: "david@example.com", role: "User" },
];

let selected = $state<Record<string, unknown> | undefined>(undefined);
</script>

<CrudTemplate title="Users">
  {#snippet listPanel()}
    <div class="p-4 space-y-2">
      <h3 class="text-title-2 mb-4">Users</h3>
      {#each users as user}
        <button
          class="w-full text-left p-3 rounded-[--radius] border border-border hover:bg-muted transition-colors"
          class:bg-primary-10={selected?.id === user.id}
          onclick={() => selected = user}
        >
          <p class="text-label-md text-foreground">{user.name}</p>
          <p class="text-body-sm text-muted-foreground">{user.email}</p>
          <span class="text-mono-xs text-muted-foreground">{user.role}</span>
        </button>
      {/each}
    </div>
  {/snippet}

  {#snippet detailPanel()}
    {#if selected}
      <div class="p-6 space-y-4">
        <h3 class="text-title-1">{selected.name}</h3>
        <div class="space-y-2">
          <p class="text-body-md"><span class="text-muted-foreground">Email:</span> {selected.email}</p>
          <p class="text-body-md"><span class="text-muted-foreground">Role:</span> {selected.role}</p>
        </div>
      </div>
    {:else}
      <div class="flex items-center justify-center h-full text-muted-foreground">
        Select a user from the list
      </div>
    {/if}
  {/snippet}
</CrudTemplate>
