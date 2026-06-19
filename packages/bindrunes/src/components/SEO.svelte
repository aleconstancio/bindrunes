<script lang="ts">
let {
	title = undefined as string | undefined,
	description = undefined as string | undefined,
	ogTitle = undefined as string | undefined,
	ogDescription = undefined as string | undefined,
	ogImage = undefined as string | undefined,
}: {
	title?: string;
	description?: string;
	ogTitle?: string;
	ogDescription?: string;
	ogImage?: string;
} = $props();
</script>

<svelte:head>
  {#if title}
    <title>{title}</title>
  {/if}
  {#if description}
    <meta name="description" content={description} />
  {/if}
  {#if ogTitle || title}
    <meta property="og:title" content={ogTitle ?? title} />
  {/if}
  {#if ogDescription || description}
    <meta property="og:description" content={ogDescription ?? description} />
  {/if}
  {#if ogImage}
    <meta property="og:image" content={ogImage} />
  {/if}
</svelte:head>
