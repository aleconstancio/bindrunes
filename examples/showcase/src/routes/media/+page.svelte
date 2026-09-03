<script lang="ts">
	import { MediaTemplate } from "urupe-ui/layouts";
	import { MediaGallery, ImageUpload, AudioPlayer, FileCard, VideoPlayer } from "urupe-ui/domains/media";
	import { Collapsible, CodeSnippet } from "urupe-ui";

	const images = [
		{ src: "https://picsum.photos/800/450?random=1", alt: "Landscape 1", caption: "Mountain vista at sunset" },
		{ src: "https://picsum.photos/800/450?random=2", alt: "Landscape 2", caption: "Ocean waves crashing" },
		{ src: "https://picsum.photos/800/450?random=3", alt: "Landscape 3", caption: "Forest trail in autumn" },
	];

	let selectedImage = $state(0);
</script>

<MediaTemplate title="Media Components">
	{#snippet sidebar()}
		<div class="space-y-6">
			<h2 class="text-title-2 text-foreground">File Cards</h2>
			<div class="space-y-3">
				<FileCard name="document.pdf" size="2.4 MB" type="file" />
				<FileCard name="photo.jpg" size="1.8 MB" type="image" />
				<FileCard name="video.mp4" size="45.2 MB" type="video" />
				<FileCard name="music.mp3" size="8.1 MB" type="audio" />
				<FileCard name="archive.zip" size="12.3 MB" type="archive" />
			</div>

			<h2 class="text-title-2 text-foreground">Media Gallery</h2>
			<MediaGallery {images} bind:selectedIndex={selectedImage} />
		</div>
	{/snippet}

	<div class="space-y-12">
		<div class="space-y-6">
			<h2 class="text-title-2 text-foreground">Image Upload</h2>
			<ImageUpload onUpload={(file) => console.log("Upload:", file.name)} />
		</div>
		<Collapsible>
			{#snippet trigger()}
				<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
			{/snippet}
			<div class="space-y-2 mt-2">
				<CodeSnippet
					code={`import { MediaGallery, ImageUpload } from "urupe-ui/domains/media";\n\nconst images = [\n  { src: "https://picsum.photos/800/450?random=1", alt: "Landscape 1", caption: "Mountain vista" },\n  { src: "https://picsum.photos/800/450?random=2", alt: "Landscape 2", caption: "Ocean waves" },\n];\n\nlet selectedImage = $state(0);\n\n<MediaGallery {images} bind:selectedIndex={selectedImage} />\n<ImageUpload onUpload={(file) => console.log("Upload:", file.name)} />`}
					language="svelte"
					title="Gallery & Upload"
				/>
			</div>
		</Collapsible>

		<div class="space-y-6">
			<h2 class="text-title-2 text-foreground">Video Player</h2>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div class="space-y-4">
					<h3 class="text-body text-muted-foreground">Default</h3>
					<VideoPlayer
						src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
						poster="https://picsum.photos/640/360?random=10"
					/>
				</div>
				<div class="space-y-4">
					<h3 class="text-body text-muted-foreground">Muted & Looping</h3>
					<VideoPlayer
						src="https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
						poster="https://picsum.photos/640/360?random=11"
						muted
						loop
					/>
				</div>
			</div>
		</div>
		<Collapsible>
			{#snippet trigger()}
				<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
			{/snippet}
			<div class="space-y-2 mt-2">
				<CodeSnippet
					code={`import { VideoPlayer } from "urupe-ui/domains/media";\n\n<!-- Default -->\n<VideoPlayer\n  src="https://example.com/video.mp4"\n  poster="https://example.com/poster.jpg"\n/>\n\n<!-- Muted & Looping -->\n<VideoPlayer\n  src="https://example.com/video.mp4"\n  poster="https://example.com/poster.jpg"\n  muted\n  loop\n/>`}
					language="svelte"
					title="Video Player"
				/>
			</div>
		</Collapsible>

		<div class="space-y-6">
			<h2 class="text-title-2 text-foreground">Audio Player</h2>
			<AudioPlayer
				src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
				title="Demo Track"
				artist="SoundHelix"
			/>
		</div>
		<Collapsible>
			{#snippet trigger()}
				<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
			{/snippet}
			<div class="space-y-2 mt-2">
				<CodeSnippet
					code={`import { AudioPlayer } from "urupe-ui/domains/media";\n\n<AudioPlayer\n  src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"\n  title="Demo Track"\n  artist="SoundHelix"\n/>`}
					language="svelte"
					title="Audio Player"
				/>
			</div>
		</Collapsible>

		<Collapsible>
			{#snippet trigger()}
				<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
			{/snippet}
			<div class="space-y-2 mt-2">
				<CodeSnippet
					code={`import { FileCard } from "urupe-ui/domains/media";\n\n<FileCard name="document.pdf" size="2.4 MB" type="file" />\n<FileCard name="photo.jpg" size="1.8 MB" type="image" />\n<FileCard name="video.mp4" size="45.2 MB" type="video" />\n<FileCard name="music.mp3" size="8.1 MB" type="audio" />`}
					language="svelte"
					title="File Cards"
				/>
			</div>
		</Collapsible>
	</div>
</MediaTemplate>
