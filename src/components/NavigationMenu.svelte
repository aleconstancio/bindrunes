<script lang="ts">
import { NavigationMenu as BitsNavigationMenu } from "bits-ui";

type NavLink = { label: string; href: string };

let {
	links = [] as NavLink[],
	activeId = undefined as string | undefined,
	class: className = "",
}: {
	links?: NavLink[];
	activeId?: string;
	class?: string;
} = $props();
</script>

<BitsNavigationMenu.Root
	class="relative {className}"
	orientation="horizontal"
	delayDuration={0}
>
	<BitsNavigationMenu.List class="flex items-center gap-1 list-none m-0 p-0">
		{#each links as link}
			<BitsNavigationMenu.Item>
				<BitsNavigationMenu.Link
					href={link.href}
					class="inline-flex items-center rounded-[--radius-sm] px-3 py-1.5 text-label-md transition-colors no-underline
					       hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
					       {activeId && (link.href.endsWith(activeId) || link.href === `/${activeId}` || link.href === activeId) ? 'text-foreground bg-muted' : 'text-muted-foreground'}"
				>
					{link.label}
				</BitsNavigationMenu.Link>
			</BitsNavigationMenu.Item>
		{/each}
	</BitsNavigationMenu.List>
</BitsNavigationMenu.Root>
