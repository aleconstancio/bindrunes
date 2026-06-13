<script lang="ts">
import { NavigationMenu } from "bits-ui";
import type { Snippet } from "svelte";

const BitsNavigationMenu = NavigationMenu;

type NavLink = { label: string; href: string };

let {
	links = [] as NavLink[],
	activeId = undefined as string | undefined,
	class: className = "",
	linkSnippet = undefined as Snippet<[{ link: NavLink; isActive: boolean }]> | undefined,
}: {
	links?: NavLink[];
	activeId?: string;
	class?: string;
	linkSnippet?: Snippet<[{ link: NavLink; isActive: boolean }]>;
} = $props();

function isActive(link: NavLink): boolean {
	if (!activeId) return false;
	return link.href.endsWith(activeId) || link.href === `/${activeId}` || link.href === activeId;
}
</script>

<BitsNavigationMenu.Root
	class="relative {className}"
	orientation="horizontal"
	delayDuration={0}
>
	<BitsNavigationMenu.List class="flex items-center gap-1 list-none m-0 p-0">
		{#each links as link}
			{@const active = isActive(link)}
			<BitsNavigationMenu.Item>
				<BitsNavigationMenu.Link
					href={link.href}
					class="inline-flex items-center rounded-[--radius-sm] px-3 py-1.5 text-label-md transition-colors no-underline
					       hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
					       {active ? 'text-foreground bg-muted' : 'text-muted-foreground'}"
				>
					{#if linkSnippet}
						{@render linkSnippet({ link, isActive: active })}
					{:else}
						{link.label}
					{/if}
				</BitsNavigationMenu.Link>
			</BitsNavigationMenu.Item>
		{/each}
	</BitsNavigationMenu.List>
</BitsNavigationMenu.Root>
