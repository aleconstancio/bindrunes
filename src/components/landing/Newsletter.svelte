<script lang="ts">
import type { Snippet } from "svelte";
import type { TFunction } from "../../shared-types";
import Button from "../Button.svelte";
import Input from "../Input.svelte";
import MetaContainer from "../MetaContainer.svelte";

interface Props {
	title: string;
	description?: string;
	placeholder?: string;
	buttonText?: string;
	onSubmit?: (email: string) => void;
	children?: Snippet;
	class?: string;
	t?: TFunction;
}

let {
	title,
	description,
	placeholder = "you@email.com",
	buttonText = "Subscribe",
	onSubmit,
	children,
	class: className = "",
	t,
}: Props = $props();

let email = $state("");

function _handleSubmit(e: Event) {
	e.preventDefault();
	onSubmit?.(email);
}
</script>

<section class="newsletter-section relative overflow-hidden px-6 py-16 sm:py-24 section-reveal {className}">
  <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
  <MetaContainer size="lg" padding={false} class="text-center relative">
    <h2 class="text-display-3 sm:text-display-2 text-foreground">
      {title}
    </h2>
    {#if description}
      <p class="mt-4 text-body-lg text-muted-foreground">
        {description}
      </p>
    {/if}
    <form onsubmit={_handleSubmit} class="mt-8 flex flex-col sm:flex-row gap-3 max-w-[var(--container-md)] mx-auto">
      <Input
        type="email"
        placeholder={t?.('landing.Newsletter.placeholder') ?? placeholder}
        bind:value={email}
        required
        class="flex-1"
      />
      <Button type="submit" variant="primary">{t?.('landing.Newsletter.button') ?? buttonText}</Button>
    </form>
  </MetaContainer>
</section>

{#if children}
  <div class="mt-8">
    {@render children()}
  </div>
{/if}
