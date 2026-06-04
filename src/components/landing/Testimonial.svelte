<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    quote: string;
    author: string;
    role?: string;
    avatar?: string;
    avatarFallback?: string;
    children?: Snippet;
  }

  let {
    quote,
    author,
    role,
    avatar,
    avatarFallback,
    children,
  }: Props = $props();

  const initials = $derived(
    avatarFallback ?? author.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  );
</script>

<div class="mx-auto max-w-2xl text-center px-6 py-12 section-reveal">
  <div class="mb-6 flex justify-center">
    {#if avatar}
      <img
        src={avatar}
        alt={author}
        class="h-16 w-16 rounded-full border-2 border-primary/30 object-cover"
      />
    {:else}
      <div class="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10 text-lg font-bold text-primary">
        {initials}
      </div>
    {/if}
  </div>
  <blockquote class="text-xl italic text-foreground leading-relaxed">
    &ldquo;{quote}&rdquo;
  </blockquote>
  <div class="mt-6">
    <p class="font-bold text-foreground">{author}</p>
    {#if role}
      <p class="text-sm text-muted-foreground">{role}</p>
    {/if}
  </div>
  {#if children}
    <div class="mt-6">
      {@render children()}
    </div>
  {/if}
</div>
