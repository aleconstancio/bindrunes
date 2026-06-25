<script lang="ts">
import type { Snippet } from "svelte";

let {
	label = "",
	value = "",
	detail = "",
	variant = "default" as "default" | "success" | "warning" | "destructive",
	progress = undefined as number | undefined,
	progressMax = 100,
	responsive = false,
	children,
}: {
	label?: string;
	value?: string;
	detail?: string;
	variant?: "default" | "success" | "warning" | "destructive";
	progress?: number;
	progressMax?: number;
	responsive?: boolean;
	children?: Snippet;
} = $props();

const borderTop: Record<string, string> = {
	default: "var(--primary)",
	success: "var(--success)",
	warning: "var(--warning)",
	destructive: "var(--destructive)",
};
</script>

<div class="metric-card rounded-[--radius] border bg-card p-4 transition-all duration-[--duration-fluid] hover:-translate-y-1 {responsive ? 'container-queries' : ''}"
  style="--variant-color: {borderTop[variant]}; border-top: 2px solid {borderTop[variant]};">
  <p class="text-mono-xs font-medium text-muted-foreground uppercase">{label}</p>
  <p class="text-headline-2 text-foreground mt-1">{value}</p>
  {#if detail}
    <p class="text-body-sm text-muted-foreground mt-0.5">{detail}</p>
  {/if}
  {#if progress !== undefined}
    <div class="w-full h-1.5 rounded-[--radius-pill] bg-muted mt-2 overflow-hidden">
      <div class="h-full rounded-[--radius-pill] transition-all duration-[--duration-fluid] bg-primary"
        style="width: {Math.min(progress / progressMax * 100, 100)}%; background: {borderTop[variant]}">
      </div>
    </div>
  {/if}
  {#if children}
    <div class="mt-2">{@render children()}</div>
  {/if}
</div>

<style>
  .metric-card {
    border-color: var(--border);
    background: radial-gradient(circle at 12% 12%, oklch(from var(--variant-color) l c h / 0.04), transparent 65%), var(--card);
  }
  .metric-card:hover {
    border-color: oklch(from var(--variant-color) l c h / 0.22);
    box-shadow: 
      0 12px 20px -8px oklch(from var(--variant-color) l c h / 0.08),
      0 0 15px -3px oklch(from var(--variant-color) l c h / 0.04);
  }
</style>
