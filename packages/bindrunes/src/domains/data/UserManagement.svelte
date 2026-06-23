<script lang="ts">
import type { Snippet } from "svelte";
import Avatar from "../../primitives/Avatar.svelte";
import Badge from "../../primitives/Badge.svelte";
import type { Column, SortState } from "../../shared-types";
import CrudListPage from "./CrudListPage.svelte";

interface ManagedUser {
	id: string | number;
	name: string;
	email: string;
	avatar?: string;
	role?: string;
	status?: "active" | "inactive" | "invited";
	lastLogin?: string;
}

let {
	users = [] as ManagedUser[],
	title = "Users",
	description = "Manage team members and their access.",
	loading = false,
	currentPage = 1,
	totalPages = 1,
	onPageChange = undefined as ((page: number) => void) | undefined,
	onCreate = undefined as (() => void) | undefined,
	onRowClick = undefined as ((user: ManagedUser) => void) | undefined,
	onSearch = undefined as ((search: string) => void) | undefined,
	class: className = "",
	bulkActions = undefined as Snippet | undefined,
}: {
	users?: ManagedUser[];
	title?: string;
	description?: string;
	loading?: boolean;
	currentPage?: number;
	totalPages?: number;
	onPageChange?: (page: number) => void;
	onCreate?: () => void;
	onRowClick?: (user: ManagedUser) => void;
	onSearch?: (search: string) => void;
	class?: string;
	bulkActions?: Snippet;
} = $props();

let searchValue = $state("");
let sort = $state<SortState | null>(null);

const statusVariant: Record<string, "success" | "warning" | "default"> = {
	active: "success",
	inactive: "default",
	invited: "warning",
};

const columns: Column[] = [
	{ key: "name", label: "User", sortable: true },
	{ key: "email", label: "Email", sortable: true },
	{ key: "role", label: "Role" },
	{ key: "status", label: "Status" },
	{ key: "lastLogin", label: "Last Login", sortable: true },
];
</script>

<CrudListPage
	{title}
	{description}
	{columns}
	rows={users as unknown as Record<string, unknown>[]}
	searchPlaceholder="Search users..."
	createLabel="Invite User"
	{onCreate}
	{loading}
	{currentPage}
	{totalPages}
	{onPageChange}
	bind:sort
	bind:searchValue
	emptyText="No users found."
	class={className}
	{bulkActions}
	onRowClick={onRowClick ? (row) => onRowClick(row as unknown as ManagedUser) : undefined}
/>
