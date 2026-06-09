<script lang="ts">
import Breadcrumb from "./Breadcrumb.svelte";

let {
	title = "",
	description = undefined as string | undefined,
	backHref = undefined as string | undefined,
	breadcrumbs = [] as { label: string; href?: string }[],
	class: className = "",
	actions,
	children,
}: {
	title?: string;
	description?: string;
	backHref?: string;
	breadcrumbs?: { label: string; href?: string }[];
	class?: string;
	actions?: import("svelte").Snippet;
	children?: import("svelte").Snippet;
} = $props();
</script>

<div class="space-y-4 {className}">
  {#if breadcrumbs.length > 0}
    <Breadcrumb items={breadcrumbs} />
  {/if}

  <div class="flex items-start justify-between gap-4">
    <div class="min-w-0">
      <div class="flex items-center gap-3">
        {#if backHref}
          <a
            href={backHref}
            class="p-1.5 rounded transition-colors shrink-0"
            style="color: var(--muted-foreground);"
            aria-label="Go back"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </a>
        {/if}
        <div>
          <h1 class="text-headline-2" style="color: var(--foreground);">{title}</h1>
          {#if description}
            <p class="text-body-md mt-1" style="color: var(--muted-foreground);">{description}</p>
          {/if}
        </div>
      </div>
    </div>
    {#if actions}
      <div class="flex items-center gap-2 shrink-0">
        {@render actions()}
      </div>
    {/if}
  </div>

  {#if children}
    {@render children()}
  {/if}
</div>
