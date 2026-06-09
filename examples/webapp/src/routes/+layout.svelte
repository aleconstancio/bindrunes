<script lang="ts">
import { AppProvider, SEO } from "bindrunes";
import "../app.css";

let { children } = $props();
</script>

<SEO
  title="bindrunes"
  description="The Svelte 5 component library and design system for building B2B SaaS applications at scale."
/>

<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-[--radius]">
  Skip to content
</a>

<AppProvider themeDefault="editorial" aestheticDefault="editorial" densityDefault="comfortable">
  <main id="main-content">
    {@render children()}
  </main>
</AppProvider>
