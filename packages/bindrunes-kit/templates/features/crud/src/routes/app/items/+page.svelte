<script lang="ts">
	
	import { Badge, Button, Card, DataTable, PageHeader, Spinner } from "urupe-ui";
	import { useMutation, useQuery } from "bindrunes-kit/client";
	import { goto } from "$app/navigation";
import { page } from "$app/state";

	interface Item {
		id: string;
		name: string;
		status: "active" | "inactive" | "archived";
		createdAt: string;
	}

	const items = useQuery<Item[]>({
		key: "items",
		fetcher: async () => {
			const res = await fetch("/api/items");
			return res.json();
		},
	});

	const deleteItem = useMutation({
		mutator: async (id: string) => {
			await fetch(`/api/items/${id}`, { method: "DELETE" });
			return id;
		},
		invalidateKeys: ["items"],
	});

	const statusVariant: Record<string, "success" | "warning" | "default"> = {
		active: "success",
		inactive: "warning",
		archived: "default",
	};

	function formatDate(iso: string) {
		return new Date(iso).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	}
</script>

<svelte:head>
	<title>Items</title>
</svelte:head>

<div class="p-6 space-y-6">
	<PageHeader title="Items" description="Manage your items">
		{#snippet actions()}
			<Button href="/app/items/new">New Item</Button>
		{/snippet}
	</PageHeader>

	{#if items.isLoading}
		<div class="flex justify-center py-12">
			<Spinner />
		</div>
	{:else if items.data && items.data.length > 0}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each items.data as item}
				<Card interactive onclick={() => goto(`/app/items/${item.id}`)}>
					<div class="space-y-3">
						<div class="flex items-start justify-between gap-2">
							<h3 class="text-label-lg text-foreground truncate">{item.name}</h3>
							<Badge variant={statusVariant[item.status] ?? "default"} size="sm">
								{item.status}
							</Badge>
						</div>
						<p class="text-body-sm text-muted-foreground">
							Created {formatDate(item.createdAt)}
						</p>
					</div>
					{#snippet footer()}
						<div class="flex items-center justify-between">
							<span class="text-mono-xs text-muted-foreground">{item.id.slice(0, 8)}</span>
							<Button
								variant="ghost"
								size="sm"
								onclick={(e) => {
									e.stopPropagation();
									deleteItem.mutate(item.id);
								}}
							>
								Delete
							</Button>
						</div>
					{/snippet}
				</Card>
			{/each}
		</div>
	{:else}
		<Card>
			<div class="text-center py-12 space-y-3">
				<p class="text-body-md text-muted-foreground">No items yet</p>
				<Button href="/app/items/new">Create your first item</Button>
			</div>
		</Card>
	{/if}
</div>
