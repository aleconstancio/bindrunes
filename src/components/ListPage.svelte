<script lang="ts">
import Alert from "./Alert.svelte";
import Card from "./Card.svelte";
import EmptyState from "./EmptyState.svelte";
import Input from "./Input.svelte";
import PageHeader from "./PageHeader.svelte";
import PageLoading from "./PageLoading.svelte";

let {
	title = "",
	description = undefined as string | undefined,
	backHref = undefined as string | undefined,
	breadcrumbs = [] as { label: string; href?: string }[],
	query = undefined as
		| { isLoading?: boolean; isError?: boolean; error?: { message: string }; data?: unknown[] }
		| undefined,
	searchValue = $bindable(""),
	searchPlaceholder = "Search...",
	emptyTitle = "No results",
	emptyDescription = "No items found.",
	class: className = "",
	headerActions,
	filters,
	children,
}: {
	title?: string;
	description?: string;
	backHref?: string;
	breadcrumbs?: { label: string; href?: string }[];
	query?: { isLoading?: boolean; isError?: boolean; error?: { message: string }; data?: unknown[] };
	searchValue?: string;
	searchPlaceholder?: string;
	emptyTitle?: string;
	emptyDescription?: string;
	class?: string;
	headerActions?: import("svelte").Snippet;
	filters?: import("svelte").Snippet;
	children?: import("svelte").Snippet;
} = $props();
</script>

<div class="space-y-6 {className}">
  <PageHeader {title} {description} {backHref} {breadcrumbs}>
    {#snippet actions()}
      {#if headerActions}{@render headerActions()}{/if}
    {/snippet}
  </PageHeader>

  {#if query?.isLoading}
    <PageLoading type="table" />
  {:else if query?.isError}
    <Alert variant="destructive" title="Error" description={query.error?.message} />
  {:else}
    <div class="flex items-center gap-3">
      <div class="flex-1 max-w-sm">
        <Input placeholder={searchPlaceholder} bind:value={searchValue} />
      </div>
      {#if filters}
        {@render filters()}
      {/if}
    </div>

    {#if query?.data?.length === 0}
      <EmptyState title={emptyTitle} description={emptyDescription} />
    {:else if query?.data}
      <Card variant="glass" class="p-0 overflow-hidden">
        {@render children?.()}
      </Card>
    {:else}
      {@render children?.()}
    {/if}
  {/if}
</div>
