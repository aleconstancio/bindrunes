<script lang="ts">
	
	import { Badge, Button, Card, PageHeader, Spinner } from "urupe-ui";
	import { useMutation, useQuery, invalidateQuery } from "bindrunes-kit/client";
	import { goto } from "$app/navigation";
import { page } from "$app/state";

	const itemId = $derived(page.params.id);

	interface Item {
		id: string;
		name: string;
		description: string;
		status: "active" | "inactive" | "archived";
		createdAt: string;
		updatedAt: string;
	}

	const item = useQuery<Item>({
		key: `item-${itemId}`,
		fetcher: async () => {
			const res = await fetch(`/api/items/${itemId}`);
			if (!res.ok) throw new Error("Item not found");
			return res.json();
		},
	});

	const updateStatus = useMutation({
		mutator: async ({ id, status }: { id: string; status: Item["status"] }) => {
			const res = await fetch(`/api/items/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ status }),
			});
			return res.json();
		},
		invalidateKeys: ["items", `item-${itemId}`],
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
			hour: "2-digit",
			minute: "2-digit",
		});
	}

	async function handleDelete() {
		await deleteItem.mutate(itemId);
		goto("/app/items");
	}
</script>

<svelte:head>
	<title>{item.data?.name ?? "Item"}</title>
</svelte:head>

<div class="p-6 space-y-6">
	{#if item.isLoading}
		<div class="flex justify-center py-12">
			<Spinner />
		</div>
	{:else if item.data}
		<PageHeader
			title={item.data.name}
			description={item.data.description}
			backHref="/app/items"
		>
			{#snippet actions()}
				<Badge variant={statusVariant[item.data.status] ?? "default"}>
					{item.data.status}
				</Badge>
				<Button variant="outline" href={`/app/items/${itemId}/edit`}>Edit</Button>
				<Button variant="destructive" onclick={handleDelete}>Delete</Button>
			{/snippet}
		</PageHeader>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<div class="lg:col-span-2 space-y-4">
				<Card>
					<h3 class="text-label-lg text-foreground mb-3">Details</h3>
					<dl class="space-y-2 text-body-sm">
						<div class="flex justify-between">
							<dt class="text-muted-foreground">ID</dt>
							<dd class="font-mono text-foreground">{item.data.id}</dd>
						</div>
						<div class="flex justify-between">
							<dt class="text-muted-foreground">Created</dt>
							<dd class="text-foreground">{formatDate(item.data.createdAt)}</dd>
						</div>
						<div class="flex justify-between">
							<dt class="text-muted-foreground">Updated</dt>
							<dd class="text-foreground">{formatDate(item.data.updatedAt)}</dd>
						</div>
					</dl>
				</Card>
			</div>

			<div class="space-y-4">
				<Card>
					<h3 class="text-label-lg text-foreground mb-3">Actions</h3>
					<div class="space-y-2">
						{#if item.data.status !== "active"}
							<Button
								variant="outline"
								fullWidth
								onclick={() => updateStatus.mutate({ id: itemId, status: "active" })}
							>
								Activate
							</Button>
						{/if}
						{#if item.data.status !== "inactive"}
							<Button
								variant="outline"
								fullWidth
								onclick={() => updateStatus.mutate({ id: itemId, status: "inactive" })}
							>
								Deactivate
							</Button>
						{/if}
						{#if item.data.status !== "archived"}
							<Button
								variant="outline"
								fullWidth
								onclick={() => updateStatus.mutate({ id: itemId, status: "archived" })}
							>
								Archive
							</Button>
						{/if}
					</div>
				</Card>
			</div>
		</div>
	{:else}
		<div class="text-center py-12">
			<p class="text-body-md text-muted-foreground">Item not found</p>
			<Button href="/app/items" class="mt-4">Back to items</Button>
		</div>
	{/if}
</div>
