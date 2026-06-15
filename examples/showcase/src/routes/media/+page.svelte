<script lang="ts">
	import { PageHeader, Collapsible, CodeSnippet } from "bindrunes";
	import { MediaGallery } from "bindrunes/boundrune";
	import { ImageUpload } from "bindrunes/boundrune";
	import { AudioPlayer } from "bindrunes/boundrune";
	import { FileCard } from "bindrunes/boundrune";
	import { VideoPlayer } from "bindrunes/boundrune";

	const images = [
		{ src: "https://picsum.photos/800/450?random=1", alt: "Landscape 1", caption: "Mountain vista at sunset" },
		{ src: "https://picsum.photos/800/450?random=2", alt: "Landscape 2", caption: "Ocean waves crashing" },
		{ src: "https://picsum.photos/800/450?random=3", alt: "Landscape 3", caption: "Forest trail in autumn" },
	];

	let selectedImage = $state(0);
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
	<PageHeader title="Media Components" description="Image upload, video player, audio player, and gallery" />

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
		<div class="space-y-6">
			<h2 class="text-title-2 text-foreground">Media Gallery</h2>
			<MediaGallery {images} bind:selectedIndex={selectedImage} />
		</div>

		<div class="space-y-6">
			<h2 class="text-title-2 text-foreground">Image Upload</h2>
			<ImageUpload onUpload={(file) => console.log("Upload:", file.name)} />
		</div>
	</div>
	<Collapsible>
		{#snippet trigger()}
			<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
		{/snippet}
		<div class="space-y-2 mt-2">
			<CodeSnippet
				code={`import { MediaGallery, ImageUpload } from "bindrunes/boundrune";\n\nconst images = [\n  { src: "https://picsum.photos/800/450?random=1", alt: "Landscape 1", caption: "Mountain vista" },\n  { src: "https://picsum.photos/800/450?random=2", alt: "Landscape 2", caption: "Ocean waves" },\n];\n\nlet selectedImage = $state(0);\n\n<MediaGallery {images} bind:selectedIndex={selectedImage} />\n<ImageUpload onUpload={(file) => console.log("Upload:", file.name)} />`}
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
				code={`import { VideoPlayer } from "bindrunes/boundrune";\n\n<!-- Default -->\n<VideoPlayer\n  src="https://example.com/video.mp4"\n  poster="https://example.com/poster.jpg"\n/>\n\n<!-- Muted & Looping -->\n<VideoPlayer\n  src="https://example.com/video.mp4"\n  poster="https://example.com/poster.jpg"\n  muted\n  loop\n/>`}
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
				code={`import { AudioPlayer } from "bindrunes/boundrune";\n\n<AudioPlayer\n  src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"\n  title="Demo Track"\n  artist="SoundHelix"\n/>`}
				language="svelte"
				title="Audio Player"
			/>
		</div>
	</Collapsible>

	<div class="space-y-4">
		<h2 class="text-title-2 text-foreground">File Cards</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			<FileCard name="document.pdf" size="2.4 MB" type="file" />
			<FileCard name="photo.jpg" size="1.8 MB" type="image" />
			<FileCard name="video.mp4" size="45.2 MB" type="video" />
			<FileCard name="music.mp3" size="8.1 MB" type="audio" />
			<FileCard name="archive.zip" size="12.3 MB" type="archive" />
		</div>
	</div>
	<Collapsible>
		{#snippet trigger()}
			<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
		{/snippet}
		<div class="space-y-2 mt-2">
			<CodeSnippet
				code={`import { FileCard } from "bindrunes/boundrune";\n\n<FileCard name="document.pdf" size="2.4 MB" type="file" />\n<FileCard name="photo.jpg" size="1.8 MB" type="image" />\n<FileCard name="video.mp4" size="45.2 MB" type="video" />\n<FileCard name="music.mp3" size="8.1 MB" type="audio" />`}
				language="svelte"
				title="File Cards"
			/>
		</div>
	</Collapsible>
</div>
