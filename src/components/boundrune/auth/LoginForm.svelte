<script lang="ts">
import { Eye, EyeOff, LogIn } from "lucide-svelte";
import type { Snippet } from "svelte";
import Button from "../../Button.svelte";
import Input from "../../Input.svelte";
import MetaContainer from "../../MetaContainer.svelte";
import Block from "../Block.svelte";

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
	error = "",
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
let showPassword = $state(false);

async function handleSubmit(e: SubmitEvent) {
	e.preventDefault();
	if (onSubmit) await onSubmit({ email, password });
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
      {#if error}
        <div class="rounded-[--radius] bg-destructive-soft border border-destructive/30 p-3 text-body-sm text-destructive">
          {error}
        </div>
      {/if}

      {@render beforeFields?.()}

      <div>
        <label for="email" class="text-label-md text-foreground">{emailLabel}</label>
        <Input
          name="email"
          type="email"
          bind:value={email}
          required
          autocomplete="email"
          class="mt-1"
        />
      </div>

      <div>
        <label for="password" class="text-label-md text-foreground">{passwordLabel}</label>
        <div class="relative mt-1">
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            bind:value={password}
            required
            autocomplete="current-password"
            class="pr-10"
          />
          <button
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground
                   hover:text-foreground transition-colors cursor-pointer bg-transparent border-none"
            onclick={() => showPassword = !showPassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {#if showPassword}
              <EyeOff class="h-4 w-4" />
            {:else}
              <Eye class="h-4 w-4" />
            {/if}
          </button>
        </div>
      </div>

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
</Block>
