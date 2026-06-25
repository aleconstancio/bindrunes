<script lang="ts">
import type { Snippet } from "svelte";
import PageSection from "../../layouts/PageSection.svelte";
import type { LogoItem, TestimonialItem } from "../types";

let {
	title = "",
	testimonials = [] as TestimonialItem[],
	logos = [] as LogoItem[],
	class: className = "",
	testimonialSnippet = undefined as Snippet<[{ testimonial: TestimonialItem }]> | undefined,
	logoSnippet = undefined as Snippet<[{ logo: LogoItem }]> | undefined,
}: {
	title?: string;
	testimonials?: TestimonialItem[];
	logos?: LogoItem[];
	class?: string;
	testimonialSnippet?: Snippet<[{ testimonial: TestimonialItem }]>;
	logoSnippet?: Snippet<[{ logo: LogoItem }]>;
} = $props();
</script>

<PageSection reveal={false} size="xl" spacing="normal" background="muted" class={className}>
  <div class="space-y-12">
    {#if title}
      <h2 class="text-title-1 text-foreground text-center">{title}</h2>
    {/if}

    {#if testimonials.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each testimonials as testimonial}
          {#if testimonialSnippet}
            {@render testimonialSnippet({ testimonial })}
          {:else}
            <div class="rounded-[--radius] border border-border bg-card p-6 space-y-4">
              <span class="text-primary/40 text-headline-3 font-display">&ldquo;</span>
              <p class="text-body-md text-muted-foreground leading-[--text-line-height-relaxed]">&ldquo;{testimonial.quote}&rdquo;</p>
              <div class="flex items-center gap-3 pt-2">
                {#if testimonial.avatar}
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    class="w-10 h-10 rounded-[--radius-pill] object-cover"
                  />
                {:else}
                  <div class="w-10 h-10 rounded-[--radius-pill] bg-muted flex items-center justify-center">
                    <span class="text-label-md text-muted-foreground">{testimonial.author[0]?.toUpperCase()}</span>
                  </div>
                {/if}
                <div>
                  <p class="text-label-md text-foreground font-semibold">{testimonial.author}</p>
                  {#if testimonial.role}
                    <p class="text-body-sm text-muted-foreground">{testimonial.role}</p>
                  {/if}
                </div>
              </div>
            </div>
          {/if}
        {/each}
      </div>
    {/if}

    {#if logos.length > 0}
      <div class="border-t border-border pt-8">
        <p class="text-center text-mono-xs uppercase text-muted-foreground mb-6">Trusted by</p>
        <div class="flex flex-wrap items-center justify-center gap-8">
          {#each logos as logo}
            {#if logoSnippet}
              {@render logoSnippet({ logo })}
            {:else if logo.url}
              <a href={logo.url} class="text-muted-foreground hover:text-foreground transition-colors text-label-lg font-semibold">
                {logo.name}
              </a>
            {:else}
              <span class="text-muted-foreground text-label-lg font-semibold">{logo.name}</span>
            {/if}
          {/each}
        </div>
      </div>
    {/if}
  </div>
</PageSection>
