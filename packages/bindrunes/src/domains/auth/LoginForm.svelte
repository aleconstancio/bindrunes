<script lang="ts">
import { LogIn } from "lucide-svelte";
import type { Snippet } from "svelte";
import MetaContainer from "../../layouts/MetaContainer.svelte";
import PageSection from "../../layouts/PageSection.svelte";
import Button from "../../primitives/Button.svelte";
import ErrorBanner from "../../primitives/ErrorBanner.svelte";
import Input from "../../primitives/Input.svelte";
import PasswordInput from "../../primitives/PasswordInput.svelte";

let {
	title = "Sign in",
	description = "Enter your credentials to access your account.",
	emailLabel = "Email",
	passwordLabel = "Password",
	submitLabel = "Sign in",
	onSubmit = undefined as
		| ((data: { email: string; password: string }) => void | Promise<void>)
		| undefined,
	onForgotPassword = undefined as (() => void) | undefined,
	onRegister = undefined as (() => void) | undefined,
	registerLabel = "Create an account",
	loading = false,
	error = undefined as string | undefined,
	class: className = "",
	header = undefined as Snippet | undefined,
	beforeFields = undefined as Snippet | undefined,
	afterFields = undefined as Snippet | undefined,
	footer = undefined as Snippet | undefined,
}: {
	title?: string;
	description?: string;
	emailLabel?: string;
	passwordLabel?: string;
	submitLabel?: string;
	onSubmit?: (data: { email: string; password: string }) => void | Promise<void>;
	onForgotPassword?: () => void;
	onRegister?: () => void;
	registerLabel?: string;
	loading?: boolean;
	error?: string;
	class?: string;
	header?: Snippet;
	beforeFields?: Snippet;
	afterFields?: Snippet;
	footer?: Snippet;
} = $props();

let email = $state("");
let password = $state("");

async function handleSubmit(e: SubmitEvent) {
	e.preventDefault();
	if (onSubmit) await onSubmit({ email, password });
}
</script>

<PageSection reveal={false} size="sm" spacing="normal" class={className}>
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
      {#if error}
        <ErrorBanner {error} />
      {/if}

      {@render beforeFields?.()}

      <div>
        <label for="email" class="text-label-md text-foreground">{emailLabel}</label>
        <Input
          name="email"
          id="email"
          type="email"
          bind:value={email}
          required
          autocomplete="email"
          class="mt-1"
        />
      </div>

      <PasswordInput
        name="password"
        label={passwordLabel}
        bind:value={password}
        required
        autocomplete="current-password"
        class="mt-1"
      />

      {@render afterFields?.()}

      {#if onForgotPassword}
        <div class="flex justify-end">
          <button
            type="button"
            class="text-body-sm text-primary hover:underline cursor-pointer bg-transparent border-none"
            onclick={onForgotPassword}
          >
            Forgot password?
          </button>
        </div>
      {/if}

      <Button type="submit" fullWidth {loading} class="mt-2">
        <LogIn class="h-4 w-4 mr-2" />
        {submitLabel}
      </Button>
    </form>

    {#if footer}
      {@render footer()}
    {:else if onRegister}
      <p class="text-center text-body-sm text-muted-foreground">
        Don&rsquo;t have an account?
        <button
          type="button"
          class="text-primary hover:underline font-medium cursor-pointer bg-transparent border-none"
          onclick={onRegister}
        >
          {registerLabel}
        </button>
      </p>
    {/if}
  </MetaContainer>
</PageSection>
