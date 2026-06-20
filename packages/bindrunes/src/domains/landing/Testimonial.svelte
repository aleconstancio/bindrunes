<script lang="ts">
import type { Snippet } from "svelte";
import Avatar from "../Avatar.svelte";
import { getInitials } from "./landing-utils";

interface Props {
	quote: string;
	author: string;
	role?: string;
	avatar?: string;
	avatarFallback?: string;
	children?: Snippet;
	class?: string;
}

let {
	quote,
	author,
	role,
	avatar,
	avatarFallback,
	children,
	class: className = "",
}: Props = $props();

const initials = $derived(avatarFallback ?? getInitials(author));
</script>

<div class="mx-auto max-w-[var(--container-lg)] text-center px-6 py-12 section-reveal {className}">
	<div class="mb-6 flex justify-center">
		<Avatar src={avatar} alt={author} fallback={initials} />
	</div>
  <blockquote class="text-title-1 italic text-foreground">
    &ldquo;{quote}&rdquo;
  </blockquote>
  <div class="mt-6">
    <cite class="not-italic">
      <p class="font-bold text-foreground">{author}</p>
      {#if role}
        <p class="text-body-md text-muted-foreground">{role}</p>
      {/if}
    </cite>
  </div>
  {#if children}
    <div class="mt-6">
      {@render children()}
    </div>
  {/if}
</div>
