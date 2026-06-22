<script lang="ts">
import type { Snippet } from "svelte";
import { PageSection } from "../layouts/PageSection.svelte";
import { Badge } from "../primitives/Badge.svelte";
import { Button } from "../primitives/Button.svelte";
import { Card } from "../primitives/Card.svelte";
import { Dialog } from "../primitives/Dialog.svelte";
import { EmptyState } from "../primitives/EmptyState.svelte";
import { Input } from "../primitives/Input.svelte";

interface Field {
	readonly name: string;
	readonly type: string;
	readonly required?: boolean;
	readonly label?: string;
}

interface Props {
	schema: {
		name: string;
		fields: Record<string, Field>;
	};
	data?: ReadonlyArray<Record<string, unknown>>;
	onCreate?: (item: Record<string, unknown>) => void;
	onUpdate?: (id: string, item: Record<string, unknown>) => void;
	onDelete?: (id: string) => void;
	title?: string;
	emptyMessage?: string;
}

let { schema, data = [], onCreate, onUpdate, onDelete, title, emptyMessage }: Props = $props();

let showCreateDialog = $state(false);
let showEditDialog = $state(false);
let editingItem = $state<Record<string, unknown> | null>(null);
let formData = $state<Record<string, unknown>>({});

const displayTitle = title ?? schema.name.charAt(0).toUpperCase() + schema.name.slice(1);
const fields = Object.entries(schema.fields).map(([key, def]) => ({
	name: key,
	type: def.type,
	required: def.required,
	label: def.label ?? key.charAt(0).toUpperCase() + key.slice(1),
}));

function resetForm() {
	formData = {};
	for (const f of fields) {
		formData[f.name] = "";
	}
}

function openCreate() {
	resetForm();
	showCreateDialog = true;
}

function openEdit(item: Record<string, unknown>) {
	editingItem = item;
	formData = { ...item };
	showEditDialog = true;
}

function handleCreate() {
	onCreate?.(formData);
	showCreateDialog = false;
	resetForm();
}

function handleUpdate() {
	if (editingItem) {
		onUpdate?.(String(editingItem.id), formData);
		showEditDialog = false;
		editingItem = null;
		resetForm();
	}
}

function handleDelete(id: string) {
	onDelete?.(id);
}

function formatValue(value: unknown): string {
	if (value === null || value === undefined) return "—";
	if (typeof value === "boolean") return value ? "Yes" : "No";
	if (typeof value === "object") return JSON.stringify(value);
	return String(value);
}
</script>

<PageSection size="2xl" spacing="wide" reveal={false}>
	<div class="space-y-6">
		<div class="flex items-center justify-between">
			<h1 class="text-display-2 text-foreground">{displayTitle}</h1>
			<Button variant="primary" onclick={openCreate}>Add {displayTitle}</Button>
		</div>

		{#if data.length === 0}
			<EmptyState
				title="No {displayTitle.toLowerCase()} yet"
				description={emptyMessage ?? `Create your first ${displayTitle.toLowerCase()} to get started.`}
			>
				{#snippet actions()}
					<Button variant="primary" onclick={openCreate}>Add {displayTitle}</Button>
				{/snippet}
			</EmptyState>
		{:else}
			<Card variant="surface" padding={false}>
				<div class="overflow-x-auto">
					<table class="w-full">
						<thead>
							<tr class="border-b border-border">
								{#each fields as field}
									<th class="px-4 py-3 text-left text-label-md text-muted-foreground">
										{field.label}
									</th>
								{/each}
								<th class="px-4 py-3 text-right text-label-md text-muted-foreground">
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{#each data as item (item.id ?? item)}
								<tr class="border-b border-border last:border-0 hover:bg-muted/50">
									{#each fields as field}
										<td class="px-4 py-3 text-body-md text-foreground">
											{formatValue(item[field.name])}
										</td>
									{/each}
									<td class="px-4 py-3 text-right">
										<div class="flex items-center justify-end gap-2">
											<Button variant="ghost" size="sm" onclick={() => openEdit(item)}>
												Edit
											</Button>
											<Button variant="ghost" size="sm" onclick={() => handleDelete(String(item.id))}>
												Delete
											</Button>
										</div>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</Card>
		{/if}
	</div>
</PageSection>

{#if showCreateDialog}
	<Dialog open={true} onOpenChange={(open) => { if (!open) showCreateDialog = false; }}>
		<h2 class="text-title-1 text-foreground">Create {displayTitle}</h2>
		<form class="space-y-4 mt-4" onsubmit={(e) => { e.preventDefault(); handleCreate(); }}>
			{#each fields as field}
				<Input
					label={field.label}
					type={field.type === "number" ? "number" : "text"}
					value={formData[field.name] ?? ""}
					oninput={(e) => { formData[field.name] = (e.target as HTMLInputElement).value; }}
					required={field.required}
				/>
			{/each}
			<div class="flex justify-end gap-2 mt-6">
				<Button variant="outline" onclick={() => { showCreateDialog = false; }}>Cancel</Button>
				<Button variant="primary" type="submit">Create</Button>
			</div>
		</form>
	</Dialog>
{/if}

{#if showEditDialog}
	<Dialog open={true} onOpenChange={(open) => { if (!open) showEditDialog = false; }}>
		<h2 class="text-title-1 text-foreground">Edit {displayTitle}</h2>
		<form class="space-y-4 mt-4" onsubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
			{#each fields as field}
				<Input
					label={field.label}
					type={field.type === "number" ? "number" : "text"}
					value={formData[field.name] ?? ""}
					oninput={(e) => { formData[field.name] = (e.target as HTMLInputElement).value; }}
					required={field.required}
				/>
			{/each}
			<div class="flex justify-end gap-2 mt-6">
				<Button variant="outline" onclick={() => { showEditDialog = false; }}>Cancel</Button>
				<Button variant="primary" type="submit">Save</Button>
			</div>
		</form>
	</Dialog>
{/if}
