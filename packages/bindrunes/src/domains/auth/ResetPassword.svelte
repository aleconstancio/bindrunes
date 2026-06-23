<script lang="ts">
import { KeyRound } from "lucide-svelte";
import type { Snippet } from "svelte";
import MetaContainer from "../../layouts/MetaContainer.svelte";
import Button from "../../primitives/Button.svelte";
import ErrorBanner from "../../primitives/ErrorBanner.svelte";
import PasswordInput from "../../primitives/PasswordInput.svelte";
import Block from "../Block.svelte";

let {
	title = "Reset password",
	description = "Enter your new password below.",
	passwordLabel = "New password",
	confirmLabel = "Confirm new password",
	submitLabel = "Reset password",
	onSubmit = undefined as ((data: { password: string }) => void | Promise<void>) | undefined,
	onBack = undefined as (() => void) | undefined,
	backLabel = "Back to sign in",
	loading = false,
	error = "",
	class: className = "",
	header = undefined as Snippet | undefined,
	footer = undefined as Snippet | undefined,
}: {
	title?: string;
	description?: string;
	passwordLabel?: string;
	confirmLabel?: string;
	submitLabel?: string;
	onSubmit?: (data: { password: string }) => void | Promise<void>;
	onBack?: () => void;
	backLabel?: string;
	loading?: boolean;
	error?: string;
	class?: string;
	header?: Snippet;
	footer?: Snippet;
} = $props();

let password = $state("");
let confirmPassword = $state("");
let validationError = $state("");

async function handleSubmit(e: SubmitEvent) {
	e.preventDefault();
	validationError = "";

	if (password !== confirmPassword) {
		validationError = "Passwords do not match.";
		return;
	}
	if (password.length < 6) {
		validationError = "Password must be at least 6 characters.";
		return;
	}

	if (onSubmit) await onSubmit({ password });
}
</script>

<Block size="sm" spacing="normal" class={className}>
  <MetaContainer size="sm" padding={false} class="mx-auto">
    {#if header}
      {@render header()}
    {:else}
      <div class="text-center space-y-2">
        <h1 class="text-title-1 text-foreground font-bold">{title}</h1>
        <p class="text-body-md text-muted-foreground">{description}</p>
      </div>
    {/if}

    <form onsubmit={handleSubmit} novalidate class="space-y-4">
      {#if error || validationError}
        <ErrorBanner error={error || validationError} />
      {/if}

      <PasswordInput
        name="reset-password"
        label={passwordLabel}
        bind:value={password}
        required
        autocomplete="new-password"
        class="mt-1"
      />

      <PasswordInput
        name="reset-confirm"
        label={confirmLabel}
        bind:value={confirmPassword}
        required
        autocomplete="new-password"
        class="mt-1"
      />

      <Button type="submit" fullWidth {loading} class="mt-2">
        <KeyRound class="h-4 w-4 mr-2" />
        {submitLabel}
      </Button>
    </form>

    {#if footer}
      {@render footer()}
    {:else if onBack}
      <div class="text-center">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 text-body-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none"
          onclick={onBack}
        >
          {backLabel}
        </button>
      </div>
    {/if}
  </MetaContainer>
</Block>
