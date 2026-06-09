<script lang="ts">
import { Eye, EyeOff, UserPlus } from "lucide-svelte";
import Button from "../../Button.svelte";
import Input from "../../Input.svelte";
import MetaContainer from "../../MetaContainer.svelte";
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
} = $props();

let name = $state("");
let email = $state("");
let password = $state("");
let confirmPassword = $state("");
let showPassword = $state(false);
let showConfirm = $state(false);
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
    <div class="text-center space-y-2">
      <h1 class="text-title-1 text-foreground font-bold">{title}</h1>
      <p class="text-body-md text-muted-foreground">{description}</p>
    </div>

    <form onsubmit={handleSubmit} novalidate class="space-y-4">
      {#if error || validationError}
        <div class="rounded-[--radius] bg-destructive-soft border border-destructive/30 p-3 text-body-sm text-destructive">
          {error || validationError}
        </div>
      {/if}

      <div>
        <label for="name" class="text-label-md text-foreground">{nameLabel}</label>
        <Input name="name" type="text" bind:value={name} required autocomplete="name" class="mt-1" />
      </div>

      <div>
        <label for="reg-email" class="text-label-md text-foreground">{emailLabel}</label>
        <Input name="reg-email" type="email" bind:value={email} required autocomplete="email" class="mt-1" />
      </div>

      <div>
        <label for="reg-password" class="text-label-md text-foreground">{passwordLabel}</label>
        <div class="relative mt-1">
          <Input
            name="reg-password"
            type={showPassword ? "text" : "password"}
            bind:value={password}
            required
            autocomplete="new-password"
            class="pr-10"
          />
          <button
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none"
            onclick={() => showPassword = !showPassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {#if showPassword}<EyeOff class="h-4 w-4" />{:else}<Eye class="h-4 w-4" />{/if}
          </button>
        </div>
      </div>

      <div>
        <label for="reg-confirm" class="text-label-md text-foreground">{confirmPasswordLabel}</label>
        <div class="relative mt-1">
          <Input
            name="reg-confirm"
            type={showConfirm ? "text" : "password"}
            bind:value={confirmPassword}
            required
            autocomplete="new-password"
            class="pr-10"
          />
          <button
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none"
            onclick={() => showConfirm = !showConfirm}
            aria-label={showConfirm ? "Hide confirm" : "Show confirm"}
          >
            {#if showConfirm}<EyeOff class="h-4 w-4" />{:else}<Eye class="h-4 w-4" />{/if}
          </button>
        </div>
      </div>

      <Button type="submit" fullWidth {loading} class="mt-2">
        <UserPlus class="h-4 w-4 mr-2" />
        {submitLabel}
      </Button>
    </form>

    {#if onLogin}
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
