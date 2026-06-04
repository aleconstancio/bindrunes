<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Component } from 'svelte';
  import { getGridClass, getInitials } from './landing-utils';

  import type { TeamMember } from './landing-types';

  interface Props {
    title?: string;
    members: TeamMember[];
    columns?: 1 | 2 | 3 | 4;
    children?: Snippet;
    class?: string;
  }

  let { title, members, columns = 3, children, class: className = '' }: Props = $props();


</script>

<div class="px-6 py-12 section-reveal {className}">
  {#if title}
    <h2 class="text-center text-display-3 text-foreground mb-10">{title}</h2>
  {/if}
  <div class="grid {getGridClass(columns)} gap-8">
    {#each members as member}
      <div class="text-center">
        {#if member.avatar}
          <img
            src={member.avatar}
            alt={member.name}
            class="mx-auto h-24 w-24 rounded-full border-2 border-primary/30 object-cover"
          />
        {:else}
          <div class="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10 text-headline-2 text-primary">
            {getInitials(member.name)}
          </div>
        {/if}
        <h3 class="mt-4 text-title-2 font-bold text-foreground">{member.name}</h3>
        <p class="text-label-md text-primary">{member.role}</p>
        {#if member.bio}
          <p class="mt-2 text-body-md text-muted-foreground">{member.bio}</p>
        {/if}
        {#if member.social && member.social.length > 0}
          <div class="mt-3 flex justify-center gap-3">
            {#each member.social as link}
              <a
                href={link.href}
                class="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={link.label}
              >
                {#if typeof link.icon === 'string'}
                  <span class="text-body-lg">{link.icon}</span>
                {:else}
                  {@const Icon = link.icon}
                  <Icon size={18} />
                {/if}
              </a>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>

  {#if children}
    <div class="mt-8">
      {@render children()}
    </div>
  {/if}
</div>
