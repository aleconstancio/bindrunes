<script lang="ts">
import type { Snippet } from "svelte";
import type { TFunction } from "../shared-types";
import type { FormState } from "../utils/createForm.svelte";
import Button from "./Button.svelte";

let {
	t = undefined as TFunction | undefined,
	form = undefined as
		| FormState<
				Record<
					string,
					import("valibot").BaseSchema<unknown, unknown, import("valibot").BaseIssue<unknown>>
				>
		  >
		| undefined,
	submitLabel = t?.("form.Form.submit") ?? "Submit",
	loading = false,
	disabled = false,
	onSubmit = undefined as ((e: SubmitEvent) => void | Promise<void>) | undefined,
	onSuccess = undefined as (() => void) | undefined,
	onError = undefined as ((err: Error) => void) | undefined,
	successMessage = t?.("form.Form.success") ?? "Saved successfully",
	errorMessage = t?.("form.Form.error") ?? "Error saving.",
	disableToast = false,
	children,
}: {
	t?: TFunction;
	form?: FormState<
		Record<
			string,
			import("valibot").BaseSchema<unknown, unknown, import("valibot").BaseIssue<unknown>>
		>
	>;
	submitLabel?: string;
	loading?: boolean;
	disabled?: boolean;
	onSubmit?: (e: SubmitEvent) => void | Promise<void>;
	onSuccess?: () => void;
	onError?: (err: Error) => void;
	successMessage?: string;
	errorMessage?: string;
	disableToast?: boolean;
	children?: Snippet;
} = $props();

let submitting = $state(false);
let isSubmittingDerived = $derived(submitting || loading);

async function showToast(type: "success" | "error", message: string) {
	if (disableToast) return;
	try {
		const { toast } = await import("svelte-sonner");
		if (type === "success") toast.success(message);
		else toast.error(message);
	} catch {
		// svelte-sonner not installed — silently skip
	}
}

async function handleSubmit(e: SubmitEvent) {
	e.preventDefault();
	if (isSubmittingDerived) return;

	submitting = true;
	try {
		if (form) {
			await form.handleSubmit(e);
			if (Object.keys(form.errors).length > 0) return;
		} else if (onSubmit) {
			await onSubmit(e);
		} else {
			return;
		}
		await showToast("success", successMessage);
		onSuccess?.();
	} catch (err) {
		const msg = err instanceof Error ? err.message : errorMessage;
		await showToast("error", msg);
		onError?.(err instanceof Error ? err : new Error(String(err)));
	} finally {
		submitting = false;
	}
}
</script>

<form onsubmit={handleSubmit} novalidate class="space-y-4">
  {@render children?.()}
  {#if form && form.isSubmitted && Object.keys(form.errors).length > 0}
    <div class="mb-4 text-body-sm text-destructive" role="alert" aria-live="assertive">
      {#each Object.values(form.errors) as error}
        {#if error}<p>{error}</p>{/if}
      {/each}
    </div>
  {/if}
  {#if submitLabel}
    <Button type="submit" {disabled} loading={isSubmittingDerived} class="mt-4">{submitLabel}</Button>
  {/if}
</form>
