<script lang="ts">
import { ArrowLeft, Mail } from "lucide-svelte";
import Button from "../../Button.svelte";
import Input from "../../Input.svelte";
import MetaContainer from "../../MetaContainer.svelte";
import Block from "../Block.svelte";

let {
	title = "Forgot password",
	description = "Enter your email address and we'll send you a link to reset your password.",
	emailLabel = "Email",
	submitLabel = "Send reset link",
	backLabel = "Back to sign in",
	onSubmit = undefined as ((email: string) => void | Promise<void>) | undefined,
	onBack = undefined as (() => void) | undefined,
	loading = false,
	sent = false,
	error = "",
	class: className = "",
}: {
	title?: string;
	description?: string;
	emailLabel?: string;
	submitLabel?: string;
	backLabel?: string;
	onSubmit?: (email: string) => void | Promise<void>;
	onBack?: () => void;
	loading?: boolean;
	sent?: boolean;
	error?: string;
	class?: string;
} = $props();

let email = $state("");

async function handleSubmit(e: SubmitEvent) {
	e.preventDefault();
	if (onSubmit) await onSubmit(email);
}
</script>

<Block size="sm" spacing="normal" class={className}>
  <MetaContainer size="sm" padding={false} class="mx-auto">
    <div class="text-center space-y-2">
      <h1 class="text-title-1 text-foreground font-bold">{title}</h1>
      <p class="text-body-md text-muted-foreground">{description}</p>
    </div>

    {#if sent}
      <div class="rounded-[--radius] bg-success-soft border border-success/30 p-4 text-body-sm text-success text-center">
        If an account with that email exists, we've sent a password reset link.
      </div>
    {:else}
      <form onsubmit={handleSubmit} novalidate class="space-y-4">
        {#if error}
          <div class="rounded-[--radius] bg-destructive-soft border border-destructive/30 p-3 text-body-sm text-destructive">
            {error}
          </div>
        {/if}

        <div>
          <label for="forgot-email" class="text-label-md text-foreground">{emailLabel}</label>
          <Input name="forgot-email" type="email" bind:value={email} required autocomplete="email" class="mt-1" />
        </div>

        <Button type="submit" fullWidth {loading} class="mt-2">
          <Mail class="h-4 w-4 mr-2" />
          {submitLabel}
        </Button>
      </form>
    {/if}

    {#if onBack}
      <div class="text-center">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 text-body-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none"
          onclick={onBack}
        >
          <ArrowLeft class="h-3.5 w-3.5" />
          {backLabel}
        </button>
      </div>
    {/if}
  </MetaContainer>
</Block>
