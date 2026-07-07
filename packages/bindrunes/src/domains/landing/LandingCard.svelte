<script lang="ts">
import type { Snippet } from "svelte";

type Tone = "primary" | "success" | "warning" | "neutral";

let {
	tone = "neutral" as Tone,
	padding = true,
	class: className = "",
	children,
}: {
	tone?: Tone;
	padding?: boolean;
	class?: string;
	children?: Snippet;
} = $props();

let mouseX = $state(0);
let mouseY = $state(0);
let isHovered = $state(false);
let cardElement = $state<HTMLDivElement>();

function handleMouseMove(event: MouseEvent) {
	if (!cardElement) return;
	const rect = cardElement.getBoundingClientRect();
	mouseX = event.clientX - rect.left;
	mouseY = event.clientY - rect.top;
}
</script>

<div
  bind:this={cardElement}
  onmousemove={handleMouseMove}
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  class="landing-card landing-card--{tone} {padding ? 'landing-card--padded' : ''} {className}"
  style="--mouse-x: {mouseX}px; --mouse-y: {mouseY}px; --spotlight-opacity: {isHovered ? 1 : 0};"
>
  <div class="landing-card-highlight"></div>
  <div class="landing-card-spotlight"></div>
  <div class="landing-card-content">
    {@render children?.()}
  </div>
</div>

<style>
  .landing-card {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: var(--radius-lg, 0.75rem);
    background: var(--glass-surface);
    border: 1px solid var(--glass-border);
    transition:
      border-color var(--duration-fluid, 250ms),
      box-shadow var(--duration-fluid, 250ms),
      transform var(--duration-fluid, 250ms);
  }

  .landing-card--padded {
    padding: var(--radius-md, 0.5rem);
  }

  /* Inner highlight — faint light source at top */
  .landing-card-highlight {
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: inherit;
    background: linear-gradient(
      180deg,
      oklch(from var(--background) l c h / 0.08) 0%,
      transparent 40%
    );
    z-index: 1;
  }

  .landing-card-spotlight {
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: inherit;
    z-index: 1;
    background: radial-gradient(
      300px circle at var(--mouse-x, 0px) var(--mouse-y, 0px),
      var(--spotlight-color, oklch(from var(--primary) l c h / 0.15)) 0%,
      transparent 80%
    );
    opacity: var(--spotlight-opacity, 0);
    transition: opacity var(--duration-fluid, 250ms);
  }

  .landing-card--primary {
    --spotlight-color: oklch(from var(--primary) l c h / 0.12);
  }
  .landing-card--success {
    --spotlight-color: oklch(from var(--success) l c h / 0.12);
  }
  .landing-card--warning {
    --spotlight-color: oklch(from var(--warning) l c h / 0.12);
  }
  .landing-card--neutral {
    --spotlight-color: oklch(from var(--primary) l c h / 0.06);
  }

  :global(.dark) .landing-card--primary {
    --spotlight-color: oklch(from var(--primary) l c h / 0.22);
  }
  :global(.dark) .landing-card--success {
    --spotlight-color: oklch(from var(--success) l c h / 0.22);
  }
  :global(.dark) .landing-card--warning {
    --spotlight-color: oklch(from var(--warning) l c h / 0.22);
  }
  :global(.dark) .landing-card--neutral {
    --spotlight-color: oklch(from var(--primary) l c h / 0.1);
  }

  .landing-card-content {
    position: relative;
    z-index: 2;
    flex: 1;
  }

  /* ── Hover: depth + tone-aware glow ── */

  .landing-card:hover {
    transform: translateY(-2px);
  }

  /* Primary tone */
  .landing-card--primary:hover {
    border-color: oklch(from var(--primary) l c h / 0.3);
    box-shadow:
      0 8px 24px -6px oklch(from var(--primary) l c h / 0.12),
      0 0 16px -4px oklch(from var(--primary) l c h / 0.08);
  }

  /* Success tone */
  .landing-card--success:hover {
    border-color: oklch(from var(--success) l c h / 0.3);
    box-shadow:
      0 8px 24px -6px oklch(from var(--success) l c h / 0.12),
      0 0 16px -4px oklch(from var(--success) l c h / 0.08);
  }

  /* Warning tone */
  .landing-card--warning:hover {
    border-color: oklch(from var(--warning) l c h / 0.3);
    box-shadow:
      0 8px 24px -6px oklch(from var(--warning) l c h / 0.12),
      0 0 16px -4px oklch(from var(--warning) l c h / 0.08);
  }

  /* Neutral tone — uses primary at reduced intensity */
  .landing-card--neutral:hover {
    border-color: oklch(from var(--primary) l c h / 0.18);
    box-shadow:
      0 8px 24px -6px oklch(0 0 0 / 0.06),
      0 0 12px -4px oklch(from var(--primary) l c h / 0.05);
  }

  /* ── Dark mode adjustments ── */

  :global(.dark) .landing-card-highlight {
    background: linear-gradient(
      180deg,
      oklch(1 0 0 / 0.04) 0%,
      transparent 35%
    );
  }

  :global(.dark) .landing-card--primary:hover {
    box-shadow:
      0 8px 24px -6px oklch(from var(--primary) l c h / 0.2),
      0 0 20px -4px oklch(from var(--primary) l c h / 0.12);
  }

  :global(.dark) .landing-card--success:hover {
    box-shadow:
      0 8px 24px -6px oklch(from var(--success) l c h / 0.2),
      0 0 20px -4px oklch(from var(--success) l c h / 0.12);
  }

  :global(.dark) .landing-card--warning:hover {
    box-shadow:
      0 8px 24px -6px oklch(from var(--warning) l c h / 0.2),
      0 0 20px -4px oklch(from var(--warning) l c h / 0.12);
  }

  :global(.dark) .landing-card--neutral:hover {
    box-shadow:
      0 8px 24px -6px oklch(1 0 0 / 0.04),
      0 0 16px -4px oklch(from var(--primary) l c h / 0.08);
  }
</style>
