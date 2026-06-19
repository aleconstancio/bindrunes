<!--
  @component
  Captures global JavaScript errors via `window.addEventListener("error", ...)` and
  `window.addEventListener("unhandledrejection", ...)`.

  NOTE: This does NOT catch errors thrown by child Svelte components during rendering.
  Svelte 5 does not have a built-in error boundary primitive. This component only
  intercepts uncaught global JS errors (e.g., from event handlers, timers, async code).
  For child component errors, use try/catch in async code or handle errors at the data layer.
-->
<script lang="ts">
import type { Snippet } from "svelte";
import { onMount } from "svelte";
import type { TFunction } from "../shared-types";
import { isBrowser } from "../utils/isBrowser";
import { toError } from "../utils/toError";
import Button from "./Button.svelte";

type Variant = "default" | "minimal" | "page";

let {
	t = undefined as TFunction | undefined,
	fallbackTitle = t?.("error.ErrorBoundary.title") ?? "Something went wrong",
	fallbackDescription = t?.("error.ErrorBoundary.description") ?? "An unexpected error occurred.",
	showRetry = true,
	showHome = false,
	homeUrl = "/",
	variant = "default" as Variant,
	onError,
	onRetry,
	disableToast = false,
	children,
}: {
	t?: TFunction;
	fallbackTitle?: string;
	fallbackDescription?: string;
	showRetry?: boolean;
	showHome?: boolean;
	homeUrl?: string;
	variant?: Variant;
	onError?: (error: Error) => void;
	onRetry?: () => void;
	disableToast?: boolean;
	children?: Snippet;
} = $props();

let error = $state<Error | null>(null);
let errorInfo = $state<string>("");

async function notifyError(title: string, description: string) {
	if (disableToast) return;
	try {
		const { toast } = await import("svelte-sonner");
		toast.error(title, { description: description.slice(0, 120) });
	} catch {
		// svelte-sonner not installed — silently skip
	}
}

onMount(() => {
	const errorHandler = (event: ErrorEvent) => {
		error = toError(event.error ?? event.message);
		errorInfo = event.message;
		onError?.(error);
		notifyError(fallbackTitle, errorInfo);
		event.preventDefault();
	};

	const rejectionHandler = (event: PromiseRejectionEvent) => {
		error = toError(event.reason);
		errorInfo = String(event.reason);
		onError?.(error);
		notifyError(fallbackTitle, errorInfo);
		event.preventDefault();
	};

	window.addEventListener("error", errorHandler);
	window.addEventListener("unhandledrejection", rejectionHandler);
	return () => {
		window.removeEventListener("error", errorHandler);
		window.removeEventListener("unhandledrejection", rejectionHandler);
	};
});

function retry() {
	error = null;
	errorInfo = "";
	if (onRetry) {
		onRetry();
	} else if (isBrowser) {
		window.location.reload();
	}
}
</script>

{#if error}
  {#if variant === 'minimal'}
    <div class="flex items-center gap-3 p-4 rounded-[--radius] border border-destructive bg-destructive-soft">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--destructive)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <p class="text-body-md text-foreground">{fallbackTitle}</p>
      {#if showRetry}
        <Button variant="ghost" size="sm" onclick={retry}>{t?.('common.reload') ?? 'Reload'}</Button>
      {/if}
    </div>
  {:else if variant === 'page'}
    <div class="fixed inset-0 z-50 flex flex-col items-center justify-center p-8 bg-background">
      <div class="flex flex-col items-center text-center max-w-md">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--destructive)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <h1 class="text-headline-2 mt-6 text-foreground">{fallbackTitle}</h1>
        <p class="text-body-md mt-3 text-muted-foreground">{fallbackDescription}</p>
        <div class="flex gap-3 mt-8">
          {#if showRetry}
            <Button onclick={retry}>{t?.('common.reload') ?? 'Reload'}</Button>
          {/if}
          {#if showHome}
            <Button variant="secondary" href={homeUrl}>{t?.('error.ErrorBoundary.home') ?? 'Home'}</Button>
          {/if}
        </div>
      </div>
    </div>
  {:else}
    <div class="flex flex-col items-center justify-center p-8 text-center min-h-[40vh]">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--destructive)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <h2 class="text-title-2 font-semibold mt-4 text-foreground">{fallbackTitle}</h2>
      <p class="text-body-md mt-2 max-w-md text-muted-foreground">{fallbackDescription}</p>
      <div class="flex gap-3 mt-6">
        {#if showRetry}
          <Button onclick={retry}>{t?.('common.reload') ?? 'Reload'}</Button>
        {/if}
        {#if showHome}
          <Button variant="secondary" href={homeUrl}>{t?.('error.ErrorBoundary.home') ?? 'Home'}</Button>
        {/if}
      </div>
    </div>
  {/if}
{:else}
  {@render children?.()}
{/if}
