<script lang="ts">
type Variant = "success" | "warning" | "destructive" | "info" | "neutral";

let {
	variant = "info" as Variant,
	label = "",
	dot = false,
	animate = false,
}: {
	variant?: Variant;
	label?: string;
	dot?: boolean;
	animate?: boolean;
} = $props();

const vars: Record<Variant, string> = {
	success: "bg-success-soft text-success border-success/30",
	warning: "bg-warning-soft text-warning border-warning/30",
	destructive: "bg-destructive-soft text-destructive border-destructive/30",
	info: "bg-info-soft text-info border-info/30",
	neutral: "bg-muted text-muted-foreground border-border",
};

const dotVars: Record<Variant, string> = {
	success: "bg-success",
	warning: "bg-warning",
	destructive: "bg-destructive",
	info: "bg-info",
	neutral: "bg-muted-foreground",
};

const ledGlowColors: Record<Variant, string> = {
	success: "var(--success)",
	warning: "var(--warning)",
	destructive: "var(--destructive)",
	info: "var(--info)",
	neutral: "var(--muted-foreground)",
};
</script>

<span data-variant={variant} class="inline-flex items-center gap-1.5 rounded-[--radius-pill] border px-2.5 py-0.5 text-mono-xs uppercase
             transition-all duration-[--duration-snappy] led-status
             {vars[variant]}"
      style="--led-glow-color: {ledGlowColors[variant]}"
>
  {#if dot}
    <span class="w-1.5 h-1.5 rounded-[--radius-pill] led-dot {dotVars[variant]} {animate ? 'animate-pulse' : ''}"></span>
  {/if}
  {label}
</span>

<style>
  .led-status {
    box-shadow: 0 0 8px -2px oklch(from var(--led-glow-color) l c h / 0.3);
    border-color: oklch(from var(--led-glow-color) l c h / 0.25);
    background-color: oklch(from var(--led-glow-color) l c h / 0.06);
  }
  .led-dot {
    box-shadow: 0 0 6px 1.5px oklch(from var(--led-glow-color) l c h / 0.6);
  }
</style>
