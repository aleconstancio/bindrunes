<script lang="ts">
import type { Snippet } from "svelte";
import Avatar from "../Avatar.svelte";
import DynamicIcon from "../DynamicIcon.svelte";
import type { TeamMember } from "./landing-types";
import { getGridClass, getInitials } from "./landing-utils";

interface Props {
	title?: string;
	members: TeamMember[];
	columns?: 1 | 2 | 3 | 4;
	children?: Snippet;
	class?: string;
}

let { title, members, columns = 3, children, class: className = "" }: Props = $props();
</script>

<div class="px-6 py-12 section-reveal {className}">
  {#if title}
    <h2 class="text-center text-display-3 text-foreground mb-10">{title}</h2>
  {/if}
  <div class="grid {getGridClass(columns)} gap-8">
    {#each members as member, i}
      <div class="stagger-enter" style="--stagger-index: {i}">
      <div class="text-center">
        <Avatar src={member.avatar} alt={member.name} fallback={getInitials(member.name)} size="lg" class="mx-auto" />
        <h3 class="mt-4 text-title-2 text-foreground">{member.name}</h3>
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
                <DynamicIcon icon={link.icon} size={18} />
              </a>
            {/each}
          </div>
        {/if}
      </div>
      </div>
    {/each}
  </div>

  {#if children}
    <div class="mt-8">
      {@render children()}
    </div>
  {/if}
</div>
