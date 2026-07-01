<script lang="ts">
import type { Snippet } from "svelte";
import ErrorMessage from "./ErrorMessage.svelte";

let {
	label = undefined as string | undefined,
	value = $bindable(""),
	placeholder = "",
	error = undefined as string | undefined,
	helper = undefined as string | undefined,
	disabled = false,
	required = false,
	type = "text" as
		| "text"
		| "email"
		| "password"
		| "number"
		| "tel"
		| "url"
		| "search"
		| "date"
		| "time"
		| "textarea",
	name = undefined as string | undefined,
	id = undefined as string | undefined,
	prefix,
	suffix,
	class: className = "",
	...restProps
}: {
	label?: string;
	value?: string;
	placeholder?: string;
	error?: string;
	helper?: string;
	disabled?: boolean;
	required?: boolean;
	type?:
		| "text"
		| "email"
		| "password"
		| "number"
		| "tel"
		| "url"
		| "search"
		| "date"
		| "time"
		| "textarea";
	name?: string;
	id?: string;
	prefix?: Snippet;
	suffix?: Snippet;
	class?: string;
	[key: string]: unknown;
} = $props();

let fallbackId = $state(`input-${Math.random().toString(36).slice(2, 10)}`);
const inputId = $derived(id ?? fallbackId);

let describedBy = $derived(error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined);
</script>

{#if label}
  <label class="block text-label-md mb-2 text-muted-foreground" for={inputId}>
    {label}
    {#if required}<span class="text-destructive">*</span>{/if}
  </label>
{/if}

<div class="relative">
  {#if prefix}
    <div class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
      {@render prefix()}
    </div>
  {/if}

  {#if type === 'textarea'}
    <textarea
      id={inputId}
      {name}
      {placeholder}
      {disabled}
      {required}
      bind:value
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy}
      class="w-full rounded-[--radius] border bg-input px-3 py-2 text-body-md
             text-foreground placeholder:text-muted-foreground
             transition-colors duration-[--duration-snappy]
             focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:ring-offset-background
             disabled:opacity-50 disabled:cursor-not-allowed
             {error ? 'border-destructive' : 'border-border'}
             {prefix ? 'pl-10' : ''} {suffix ? 'pr-10' : ''}
             {className}"
      rows={4}
      {...restProps}
    ></textarea>
  {:else}
    <input
      id={inputId}
      {type}
      {name}
      {placeholder}
      {disabled}
      {required}
      bind:value
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy}
      class="w-full rounded-[--radius] border bg-input px-3 py-2 text-body-md
             text-foreground placeholder:text-muted-foreground
             transition-colors duration-[--duration-snappy]
             focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:ring-offset-background
             disabled:opacity-50 disabled:cursor-not-allowed
             {error ? 'border-destructive' : 'border-border'}
             {prefix ? 'pl-10' : ''} {suffix ? 'pr-10' : ''}
             {className}"
      {...restProps}
    />
  {/if}

  {#if suffix}
    <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
      {@render suffix()}
    </div>
  {/if}
</div>

{#if error}
  <ErrorMessage id="{inputId}-error">{error}</ErrorMessage>
{:else if helper}
  <p id="{inputId}-helper" class="mt-1.5 text-body-sm text-muted-foreground">{helper}</p>
{/if}
