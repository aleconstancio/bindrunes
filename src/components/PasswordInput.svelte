<script lang="ts">
import { Eye, EyeOff } from "lucide-svelte";
import type { Snippet } from "svelte";
import Input from "./Input.svelte";

let {
	name = "password",
	value = $bindable(""),
	label = undefined as string | undefined,
	placeholder = undefined as string | undefined,
	required = false,
	autocomplete = "current-password",
	disabled = false,
	error = undefined as string | undefined,
	class: className = "",
}: {
	name?: string;
	value?: string;
	label?: string;
	placeholder?: string;
	required?: boolean;
	autocomplete?: string;
	disabled?: boolean;
	error?: string;
	class?: string;
} = $props();

let showPassword = $state(false);
</script>

<div>
  {#if label}
    <label for={name} class="text-label-md text-foreground">{label}</label>
  {/if}
  <div class="relative mt-1">
    <Input
      {name}
      type={showPassword ? "text" : "password"}
      bind:value
      {required}
      {autocomplete}
      {placeholder}
      {disabled}
      {error}
      class="pr-10 {className}"
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
