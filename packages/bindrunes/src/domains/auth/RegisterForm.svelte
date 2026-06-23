<script lang="ts">
import { UserPlus } from "lucide-svelte";
import type { Snippet } from "svelte";
import MetaContainer from "../../layouts/MetaContainer.svelte";
import Button from "../../primitives/Button.svelte";
import ErrorBanner from "../../primitives/ErrorBanner.svelte";
import Input from "../../primitives/Input.svelte";
import PasswordInput from "../../primitives/PasswordInput.svelte";
import Block from "../Block.svelte";

let {
	title = "Create an account",
	description = "Fill in the details below to get started.",
	nameLabel = "Full name",
	emailLabel = "Email",
	passwordLabel = "Password",
	confirmPasswordLabel = "Confirm password",
	submitLabel = "Create account",
	onSubmit = undefined as
		| ((data: { name: string; email: string; password: string }) => void | Promise<void>)
		| undefined,
	onLogin = undefined as (() => void) | undefined,
	loginLabel = "Sign in",
	loading = false,
	error = "",
	class: className = "",
	header = undefined as Snippet | undefined,
	beforeFields = undefined as Snippet | undefined,
	afterFields = undefined as Snippet | undefined,
	footer = undefined as Snippet | undefined,
}: {
	title?: string;
	description?: string;
	nameLabel?: string;
	emailLabel?: string;
	passwordLabel?: string;
	confirmPasswordLabel?: string;
	submitLabel?: string;
	onSubmit?: (data: { name: string; email: string; password: string }) => void | Promise<void>;
	onLogin?: () => void;
	loginLabel?: string;
	loading?: boolean;
	error?: string;
	class?: string;
	header?: Snippet;
	beforeFields?: Snippet;
	afterFields?: Snippet;
	footer?: Snippet;
} = $props();

let name = $state("");
let email = $state("");
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

	if (onSubmit) await onSubmit({ name, email, password });
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

      {@render beforeFields?.()}

      <div>
        <label for="name" class="text-label-md text-foreground">{nameLabel}</label>
        <Input id="name" name="name" type="text" bind:value={name} required autocomplete="name" class="mt-1" />
      </div>

      <div>
        <label for="reg-email" class="text-label-md text-foreground">{emailLabel}</label>
        <Input id="reg-email" name="reg-email" type="email" bind:value={email} required autocomplete="email" class="mt-1" />
      </div>

      <PasswordInput
        name="reg-password"
        label={passwordLabel}
        bind:value={password}
        required
        autocomplete="new-password"
        class="mt-1"
      />

      <PasswordInput
        name="reg-confirm"
        label={confirmPasswordLabel}
        bind:value={confirmPassword}
        required
        autocomplete="new-password"
        class="mt-1"
      />

      {@render afterFields?.()}

      <Button type="submit" fullWidth {loading} class="mt-2">
        <UserPlus class="h-4 w-4 mr-2" />
        {submitLabel}
      </Button>
    </form>

    {#if footer}
      {@render footer()}
    {:else if onLogin}
      <p class="text-center text-body-sm text-muted-foreground">
        Already have an account?
        <button
          type="button"
          class="text-primary hover:underline font-medium cursor-pointer bg-transparent border-none"
          onclick={onLogin}
        >
          {loginLabel}
        </button>
      </p>
    {/if}
  </MetaContainer>
</Block>
