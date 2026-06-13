<script lang="ts">
import { Progress } from "bits-ui";

const BitsProgress = Progress;

let {
	value = 0,
	max = 100,
	size = "md" as "sm" | "md" | "lg",
	variant = "default" as "default" | "success" | "warning" | "destructive",
	indeterminate = false,
	showValue = false,
	label = undefined as string | undefined,
}: {
	value?: number;
	max?: number;
	size?: "sm" | "md" | "lg";
	variant?: "default" | "success" | "warning" | "destructive";
	indeterminate?: boolean;
	showValue?: boolean;
	label?: string;
} = $props();

const heights: Record<string, string> = {
	sm: "h-1",
	md: "h-2",
	lg: "h-3",
};

const colors: Record<string, string> = {
	default: "bg-primary",
	success: "bg-success",
	warning: "bg-warning",
	destructive: "bg-destructive",
};

let percentage = $derived(Math.min(Math.round((value / max) * 100), 100));
</script>

<div class="w-full">
  {#if label || showValue}
    <div class="flex items-center justify-between mb-1.5">
      {#if label}
        <span class="text-label-sm text-muted-foreground">{label}</span>
      {/if}
      {#if showValue && !indeterminate}
        <span class="text-mono-xs text-muted-foreground">{percentage}%</span>
      {/if}
    </div>
  {/if}
  <BitsProgress.Root
    value={indeterminate ? undefined : value}
    {max}
    class="w-full rounded-full bg-muted {heights[size]} overflow-hidden"
  >
    <BitsProgress.Track
      class="h-full rounded-full transition-all duration-[--duration-fluid] {colors[variant]}
             {indeterminate ? 'animate-progress-indeterminate' : ''}"
      style={indeterminate ? '' : `width: ${percentage}%`}
    />
  </BitsProgress.Root>
</div>

<style>
  @keyframes progress-indeterminate {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(0%); }
    100% { transform: translateX(100%); }
  }
  :global(.animate-progress-indeterminate) {
    animation: progress-indeterminate 1.5s var(--ease-standard) infinite;
    width: 40%;
  }
</style>
