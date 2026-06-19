<script lang="ts">
let {
	src = "",
	poster = "",
	controls = true,
	autoplay = false,
	loop = false,
	muted = false,
	class: className = "",
}: {
	src?: string;
	poster?: string;
	controls?: boolean;
	autoplay?: boolean;
	loop?: boolean;
	muted?: boolean;
	class?: string;
} = $props();
</script>

<div class="rounded-[--radius-lg] overflow-hidden border border-border {className}">
  <video
    {src}
    {poster}
    {controls}
    {autoplay}
    {loop}
    {muted}
    class="w-full aspect-video object-cover"
    preload="metadata"
  >
    Your browser does not support the video element.
  </video>
</div>
