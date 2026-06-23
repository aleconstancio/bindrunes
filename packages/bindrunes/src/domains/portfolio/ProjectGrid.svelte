<script lang="ts">
import type { Snippet } from "svelte";
import { getGridClass } from "../../utils/grid";
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
</script>

<div class="grid {getGridClass(columns)} gap-6 {className}">
  {#each projects as project, i}
    {#if cardSnippet}
      {@render cardSnippet({ project, index: i })}
    {:else}
      <ProjectCard {...project} />
    {/if}
  {/each}
</div>
