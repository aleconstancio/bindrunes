<!-- packages/bindrunes/src/playground/ResponsiveFrame.svelte -->
<script lang="ts">
import type { Snippet } from "svelte";

interface Props {
	mode: "desktop" | "tablet" | "mobile";
	theme?: string;
	aesthetic?: string;
	density?: string;
	children: Snippet;
}

let {
	mode,
	theme = "editorial",
	aesthetic = "minimal",
	density = "comfortable",
	children,
}: Props = $props();

const widths = {
	desktop: "100%",
	tablet: "768px",
	mobile: "375px",
};

const labels = {
	desktop: "Desktop",
	tablet: "Tablet (768px)",
	mobile: "Mobile (375px)",
};
</script>

<div class="space-y-2">
  <div class="flex items-center justify-between">
    <span class="text-label-sm text-muted-foreground">{labels[mode]}</span>
    <span class="text-label-xs text-muted-foreground/60">{widths[mode]}</span>
  </div>
  <div
    role="region"
    aria-label="Component preview"
    class="mx-auto border border-border rounded-[--radius-lg] overflow-hidden bg-background transition-all duration-200"
    style:width={widths[mode]}
    style:max-width="100%"
    data-theme={theme}
    data-aesthetic={aesthetic}
    data-density={density}
  >
    <div class="p-4">
      {@render children()}
    </div>
  </div>
</div>
