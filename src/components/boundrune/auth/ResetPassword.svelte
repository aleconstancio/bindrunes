<script lang="ts">
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
} = $props();

let password = $state("");
let confirmPassword = $state("");
let _showPassword = $state(false);
let _showConfirm = $state(false);
let _validationError = $state("");

async function _handleSubmit(e: SubmitEvent) {
	e.preventDefault();
	_validationError = "";

	if (password !== confirmPassword) {
		_validationError = "Passwords do not match.";
		return;
	}
	if (password.length < 6) {
		_validationError = "Password must be at least 6 characters.";
		return;
	}

	if (onSubmit) await onSubmit({ password });
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
        <label for="reset-password" class="text-label-md text-foreground">{passwordLabel}</label>
        <div class="relative mt-1">
          <Input
            name="reset-password"
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
        <label for="reset-confirm" class="text-label-md text-foreground">{confirmLabel}</label>
        <div class="relative mt-1">
          <Input
            name="reset-confirm"
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
        <KeyRound class="h-4 w-4 mr-2" />
        {submitLabel}
      </Button>
    </form>

    {#if onBack}
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
