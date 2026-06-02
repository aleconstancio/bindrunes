<script lang="ts">
  type Variant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

  let {
    variant = 'info' as Variant,
    label = '',
    dot = false,
    animate = false,
  }: {
    variant?: Variant;
    label?: string;
    dot?: boolean;
    animate?: boolean;
  } = $props();

  const vars: Record<Variant, string> = {
    success: 'bg-[--success]/10 text-[--success] border-[--success]/30',
    warning: 'bg-[--warning]/10 text-[--warning] border-[--warning]/30',
    danger: 'bg-destructive/10 text-destructive border-destructive/30',
    info: 'bg-primary/10 text-primary border-primary/30',
    neutral: 'bg-muted text-muted-foreground border-border',
  };

  const dotVars: Record<Variant, string> = {
    success: 'bg-[--success]',
    warning: 'bg-[--warning]',
    danger: 'bg-destructive',
    info: 'bg-primary',
    neutral: 'bg-muted-foreground',
  };

  const ledGlowColors: Record<Variant, string> = {
    success: 'var(--success)',
    warning: 'var(--warning)',
    danger: 'var(--destructive)',
    info: 'var(--primary)',
    neutral: 'var(--muted-foreground)',
  };
</script>

<span class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.05em]
             transition-all duration-[--duration-snappy] led-status
             {vars[variant]}"
      style="--led-glow-color: {ledGlowColors[variant]}"
>
  {#if dot}
    <span class="w-1.5 h-1.5 rounded-full led-dot {dotVars[variant]} {animate ? 'animate-pulse' : ''}" />
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
