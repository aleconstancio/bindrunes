<script lang="ts">
import { Card, Badge, Button, DataTable, Dialog } from "urupe-ui";
import type { Column } from "urupe-ui";
import { Plus, Pencil, Trash2 } from "lucide-svelte";

const columns: Column[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "role", label: "Role", filterable: true },
];

let users = $state([
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "User" },
  { id: "3", name: "Carol Davis", email: "carol@example.com", role: "Editor" },
]);

let dialogOpen = $state(false);
let editingUser = $state<{ id?: string; name: string; email: string; role: string }>({ name: "", email: "", role: "User" });
let isEditing = $state(false);

function openCreate() {
  editingUser = { name: "", email: "", role: "User" };
  isEditing = false;
  dialogOpen = true;
}

function openEdit(user: { id: string; name: string; email: string; role: string }) {
  editingUser = { ...user };
  isEditing = true;
  dialogOpen = true;
}

function save() {
  if (isEditing && editingUser.id) {
    users = users.map(u => u.id === editingUser.id ? { ...u, ...editingUser } : u);
  } else {
    users = [...users, { ...editingUser, id: String(Date.now()) }];
  }
  dialogOpen = false;
}

function deleteUser(id: string) {
  users = users.filter(u => u.id !== id);
}
</script>

<div class="max-w-5xl mx-auto p-6 space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-display-3">CRUD Variants</h1>
      <p class="text-body-lg text-muted-foreground">Same entity managed via different CRUD patterns.</p>
    </div>
    <Button onclick={openCreate}>
      <Plus size={16} /> Add User
    </Button>
  </div>

  <Card>
    <div class="p-0">
      <DataTable {columns} data={users}>
        {#snippet cell(column, row)}
          {#if column.key === "role"}
            <Badge variant="soft">{row.role}</Badge>
          {:else}
            {row[column.key]}
          {/if}
        {/snippet}
        {#snippet rowActions(row)}
          <Button variant="ghost" size="icon" onclick={() => openEdit(row)}>
            <Pencil size={14} />
          </Button>
          <Button variant="ghost" size="icon" onclick={() => deleteUser(row.id)}>
            <Trash2 size={14} />
          </Button>
        {/snippet}
      </DataTable>
    </div>
  </Card>

  <Dialog bind:open={dialogOpen}>
    <div class="p-6 space-y-4">
      <h2 class="text-title-1">{isEditing ? "Edit" : "Create"} User</h2>
      <input class="w-full p-2 border rounded" placeholder="Name" bind:value={editingUser.name} />
      <input class="w-full p-2 border rounded" placeholder="Email" bind:value={editingUser.email} />
      <select class="w-full p-2 border rounded" bind:value={editingUser.role}>
        <option value="User">User</option>
        <option value="Admin">Admin</option>
        <option value="Editor">Editor</option>
      </select>
      <div class="flex justify-end gap-2">
        <Button variant="outline" onclick={() => dialogOpen = false}>Cancel</Button>
        <Button onclick={save}>Save</Button>
      </div>
    </div>
  </Dialog>
</div>
