<script lang="ts">
import { ArrowLeft, MoreHorizontal, Pencil, Plus, Search, Trash2, Users, X } from "lucide-svelte";
import { Badge, Button, Card, Checkbox, Dialog, Input, Select, Separator } from "urupe-ui";

interface User {
	id: number;
	name: string;
	email: string;
	role: string;
	status: "active" | "inactive";
}

let users = $state<User[]>([
	{ id: 1, name: "Sarah Chen", email: "sarah@example.com", role: "Admin", status: "active" },
	{ id: 2, name: "Marcus Johnson", email: "marcus@example.com", role: "Editor", status: "active" },
	{ id: 3, name: "Priya Patel", email: "priya@example.com", role: "Viewer", status: "inactive" },
	{ id: 4, name: "Alex Rivera", email: "alex@example.com", role: "Editor", status: "active" },
	{ id: 5, name: "Jordan Kim", email: "jordan@example.com", role: "Admin", status: "active" },
]);

let searchQuery = $state("");
let dialogOpen = $state(false);
let editingUser = $state<Partial<User> | null>(null);
let selectedIds = $state<Set<number>>(new Set());

let filteredUsers = $derived(
	users.filter(
		(u) =>
			u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			u.email.toLowerCase().includes(searchQuery.toLowerCase()),
	),
);

let allSelected = $derived(selectedIds.size === filteredUsers.length && filteredUsers.length > 0);
let someSelected = $derived(selectedIds.size > 0 && selectedIds.size < filteredUsers.length);

const roleOptions = [
	{ value: "Admin", label: "Admin" },
	{ value: "Editor", label: "Editor" },
	{ value: "Viewer", label: "Viewer" },
];

function openCreate() {
	editingUser = { name: "", email: "", role: "Viewer", status: "active" };
	dialogOpen = true;
}

function openEdit(user: User) {
	editingUser = { ...user };
	dialogOpen = true;
}

function saveUser() {
	if (!editingUser?.name || !editingUser?.email) return;
	const current = editingUser;
	if (current.id) {
		users = users.map((u) => (u.id === current.id ? ({ ...current } as User) : u));
	} else {
		const newUser: User = {
			id: Math.max(...users.map((u) => u.id)) + 1,
			name: current.name,
			email: current.email,
			role: current.role || "Viewer",
			status: "active",
		};
		users = [...users, newUser];
	}
	dialogOpen = false;
	editingUser = null;
}

function deleteUser(id: number) {
	users = users.filter((u) => u.id !== id);
}

function toggleSelect(id: number) {
	const next = new Set(selectedIds);
	if (next.has(id)) next.delete(id);
	else next.add(id);
	selectedIds = next;
}

function toggleAll() {
	if (selectedIds.size === filteredUsers.length) {
		selectedIds = new Set();
	} else {
		selectedIds = new Set(filteredUsers.map((u) => u.id));
	}
}
</script>

<div class="flex min-h-screen bg-background">
  <aside class="w-64 border-r border-border p-4">
    <div class="mb-6 px-2">
      <h2 class="text-lg font-bold text-foreground">CRUD Admin</h2>
    </div>
    <nav class="space-y-1">
      <a href="/" class="flex items-center rounded-md px-3 py-2 text-sm font-medium bg-primary text-primary-foreground">
        <Users class="mr-2 h-4 w-4" /> Users
      </a>
      <a href="/" class="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
        Products
      </a>
      <a href="/" class="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
        Orders
      </a>
      <a href="/" class="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
        Settings
      </a>
    </nav>
  </aside>

  <main class="flex-1 p-6">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-foreground">Users</h1>
        <p class="text-muted-foreground">Manage your team members and their roles.</p>
      </div>
      <Button onclick={openCreate}>
        <Plus class="mr-2 h-4 w-4" /> Add User
      </Button>
    </div>

    <Card>
      {#snippet header()}
        <div class="flex flex-row items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="relative">
              <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." class="pl-8 w-64" bind:value={searchQuery} />
            </div>
            {#if selectedIds.size > 0}
              <Badge variant="secondary">{selectedIds.size} selected</Badge>
            {/if}
          </div>
        </div>
      {/snippet}
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="pb-3 text-left font-medium text-muted-foreground">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                />
              </th>
              <th class="pb-3 text-left font-medium text-muted-foreground">Name</th>
              <th class="pb-3 text-left font-medium text-muted-foreground">Email</th>
              <th class="pb-3 text-left font-medium text-muted-foreground">Role</th>
              <th class="pb-3 text-left font-medium text-muted-foreground">Status</th>
              <th class="pb-3 text-right font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each filteredUsers as user}
              <tr class="border-b border-border last:border-0">
                <td class="py-3">
                  <Checkbox
                    checked={selectedIds.has(user.id)}
                  />
                </td>
                <td class="py-3 font-medium text-foreground">{user.name}</td>
                <td class="py-3 text-muted-foreground">{user.email}</td>
                <td class="py-3">{user.role}</td>
                <td class="py-3">
                  <Badge variant={user.status === "active" ? "default" : "secondary"}>
                    {user.status}
                  </Badge>
                </td>
                <td class="py-3 text-right">
                  <div class="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="sm" onclick={() => openEdit(user)}>
                      <Pencil class="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onclick={() => deleteUser(user.id)}>
                      <Trash2 class="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            {/each}
            {#if filteredUsers.length === 0}
              <tr>
                <td colspan="6" class="py-8 text-center text-muted-foreground">
                  No users found.
                </td>
              </tr>
            {/if}
          </tbody>
        </table>
      </div>
    </Card>
  </main>
</div>

<Dialog bind:open={dialogOpen} title={editingUser?.id ? "Edit User" : "Create User"}>
  {#snippet header()}
    <p class="text-sm text-muted-foreground">
      {editingUser?.id ? "Update user details below." : "Add a new team member."}
    </p>
  {/snippet}
  {#if editingUser}
    <div class="space-y-4 py-4">
      <div class="space-y-2">
        <Input label="Name" bind:value={editingUser.name} placeholder="Full name" />
      </div>
      <div class="space-y-2">
        <Input label="Email" bind:value={editingUser.email} placeholder="email@example.com" type="email" />
      </div>
      <div class="space-y-2">
        <Select
          label="Role"
          bind:value={editingUser.role}
          options={roleOptions}
        />
      </div>
    </div>
  {/if}
  {#snippet actions()}
    <Button variant="outline" onclick={() => { dialogOpen = false; editingUser = null; }}>Cancel</Button>
    <Button onclick={saveUser}>{editingUser?.id ? "Save Changes" : "Create User"}</Button>
  {/snippet}
</Dialog>
