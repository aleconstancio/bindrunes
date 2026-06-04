<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Component } from 'svelte';

  interface TeamMember {
    name: string;
    role: string;
    avatar?: string;
    avatarFallback?: string;
    bio?: string;
    social?: { icon: Component; href: string; label: string }[];
  }

  interface Props {
    title?: string;
    members: TeamMember[];
    columns?: 1 | 2 | 3 | 4;
    children?: Snippet;
  }

  let { title, members, columns = 3, children }: Props = $props();

  const gridClass = $derived(
    columns === 1 ? 'grid-cols-1'
      : columns === 2 ? 'grid-cols-1 sm:grid-cols-2'
      : columns === 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  );

  function getInitials(name: string) {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  }
</script>

<div class="px-6 py-12 section-reveal">
  {#if title}
    <h2 class="text-center text-3xl font-extrabold text-foreground mb-10">{title}</h2>
  {/if}
  <div class="grid {gridClass} gap-8">
    {#each members as member}
      <div class="text-center">
        {#if member.avatar}
          <img
            src={member.avatar}
            alt={member.name}
            class="mx-auto h-24 w-24 rounded-full border-2 border-primary/30 object-cover"
          />
        {:else}
          <div class="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10 text-2xl font-bold text-primary">
            {getInitials(member.name)}
          </div>
        {/if}
        <h3 class="mt-4 text-lg font-bold text-foreground">{member.name}</h3>
        <p class="text-sm text-primary">{member.role}</p>
        {#if member.bio}
          <p class="mt-2 text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
        {/if}
        {#if member.social && member.social.length > 0}
          <div class="mt-3 flex justify-center gap-3">
            {#each member.social as link}
              <a
                href={link.href}
                class="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={link.label}
              >
                <link.icon size={18} />
              </a>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>

{#if children}
  <div class="mt-8">
    {@render children()}
  </div>
{/if}
