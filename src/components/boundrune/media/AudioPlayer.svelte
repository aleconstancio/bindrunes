<script lang="ts">
import { Pause, Play, Volume2 } from "lucide-svelte";

let {
	src = "",
	title = "",
	artist = "",
	cover = "",
	class: className = "",
}: {
	src?: string;
	title?: string;
	artist?: string;
	cover?: string;
	class?: string;
} = $props();

let playing = $state(false);
let audioEl = $state<HTMLAudioElement | null>(null);
let progress = $state(0);
let duration = $state(0);

function togglePlay() {
	if (!audioEl) return;
	if (playing) audioEl.pause();
	else audioEl.play();
	playing = !playing;
}

function handleTimeUpdate() {
	if (audioEl) {
		progress = audioEl.currentTime;
		duration = audioEl.duration || 0;
	}
}

function formatTime(s: number) {
	const m = Math.floor(s / 60);
	const sec = Math.floor(s % 60);
	return `${m}:${sec.toString().padStart(2, "0")}`;
}
</script>

<div class="flex items-center gap-4 p-4 rounded-[--radius] border border-border bg-card {className}">
  <audio bind:this={audioEl} {src} ontimeupdate={handleTimeUpdate} onended={() => playing = false}></audio>

  {#if cover}
    <img src={cover} alt={title} class="w-14 h-14 rounded-[--radius] object-cover" />
  {/if}

  <div class="flex-1 min-w-0">
    {#if title}
      <p class="text-label-md text-foreground truncate">{title}</p>
    {/if}
    {#if artist}
      <p class="text-body-xs text-muted-foreground truncate">{artist}</p>
    {/if}
    <div class="flex items-center gap-2 mt-1">
      <span class="text-mono-xs text-muted-foreground">{formatTime(progress)}</span>
      <div class="flex-1 h-1 bg-muted rounded-full overflow-hidden">
        <div class="h-full bg-primary" style="width: {duration ? (progress / duration) * 100 : 0}%"></div>
      </div>
      <span class="text-mono-xs text-muted-foreground">{formatTime(duration)}</span>
    </div>
  </div>

  <button
    type="button"
    class="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
    onclick={togglePlay}
  >
    {#if playing}
      <Pause class="h-5 w-5" />
    {:else}
      <Play class="h-5 w-5 ml-0.5" />
    {/if}
  </button>
</div>
