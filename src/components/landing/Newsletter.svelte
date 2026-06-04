<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Button, Input } from 'bindrunes';

  interface Props {
    title: string;
    description?: string;
    placeholder?: string;
    buttonText?: string;
    onSubmit?: (email: string) => void;
    children?: Snippet;
  }

  let {
    title,
    description,
    placeholder = 'seu@email.com',
    buttonText = 'Inscrever',
    onSubmit,
    children,
  }: Props = $props();

  let email = $state('');

  function handleSubmit(e: Event) {
    e.preventDefault();
    onSubmit?.(email);
  }
</script>

<section class="newsletter-section relative overflow-hidden px-6 py-16 sm:py-24 section-reveal">
  <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
  <div class="mx-auto max-w-2xl text-center relative">
    <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
      {title}
    </h2>
    {#if description}
      <p class="mt-4 text-lg text-muted-foreground leading-relaxed">
        {description}
      </p>
    {/if}
    <form onsubmit={handleSubmit} class="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        {placeholder}
        bind:value={email}
        required
        class="flex-1 h-10 px-4 rounded-[--radius] border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <Button type="submit" variant="primary">{buttonText}</Button>
    </form>
  </div>
</section>

{#if children}
  <div class="mt-8">
    {@render children()}
  </div>
{/if}
