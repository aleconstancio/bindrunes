<script lang="ts">
import type { Snippet } from "svelte";
import ProjectCard from "./ProjectCard.svelte";

interface Project {
	id: string;
	title: string;
	description?: string;
	image?: string;
	tags?: string[];
	href?: string;
}

let {
	projects = [] as Project[],
	columns = 3,
	class: className = "",
	cardSnippet = undefined as Snippet<[{ project: Project; index: number }]> | undefined,
}: {
	projects?: Project[];
	columns?: 2 | 3 | 4;
	class?: string;
	cardSnippet?: Snippet<[{ project: Project; index: number }]>;
} = $props();

const gridCols: Record<number, string> = {
	2: "sm:grid-cols-2",
	3: "sm:grid-cols-2 lg:grid-cols-3",
	4: "sm:grid-cols-2 lg:grid-cols-4",
};
</script>

<div class="grid grid-cols-1 {gridCols[columns]} gap-6 {className}">
  {#each projects as project, i}
    {#if cardSnippet}
      {@render cardSnippet({ project, index: i })}
    {:else}
      <ProjectCard {...project} />
    {/if}
  {/each}
</div>
