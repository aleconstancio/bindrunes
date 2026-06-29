<script lang="ts">
	import { PageHeader } from "bindrunes/layouts";
	import { ChangelogPage } from "bindrunes/domains/marketing";

	const changelog = [
		{
			version: "1.0.1",
			date: "2026-06-10",
			entries: [
				{ type: "fixed" as const, description: "OKLCH contrast check variable naming collision" },
				{ type: "added" as const, description: "Theme and aesthetic comparison pages" },
				{ type: "changed" as const, description: "Enhanced showcase with design system switcher" },
			],
		},
		{
			version: "1.0.0",
			date: "2026-06-01",
			entries: [
				{ type: "added" as const, description: "160+ components across 12 Boundrune categories" },
				{ type: "added" as const, description: "47 composables (data, forms, auth, UI, i18n)" },
				{ type: "added" as const, description: "6 themes: editorial, dracula, nord, catppuccin, rose-pine, github" },
				{ type: "added" as const, description: "4 aesthetics: minimal, glass, bento, expressive" },
				{ type: "added" as const, description: "3 density modes: compact, comfortable, spacious" },
				{ type: "added" as const, description: "Three-axis design system with orthogonal theme/aesthetic/density" },
				{ type: "added" as const, description: "Svelte 5 runes throughout (no legacy stores)" },
				{ type: "added" as const, description: "Tailwind CSS v4 integration plugin" },
				{ type: "added" as const, description: "Valibot-based form validation" },
			],
		},
		{
			version: "0.9.0",
			date: "2026-05-15",
			entries: [
				{ type: "added" as const, description: "Chat components (ChatThread, ChatInput, ConversationList)" },
				{ type: "added" as const, description: "E-commerce components (ProductGrid, Cart, Checkout)" },
				{ type: "added" as const, description: "Calendar components (EventCalendar, Scheduler, BookingForm)" },
				{ type: "added" as const, description: "Media components (VideoPlayer, AudioPlayer, MediaGallery)" },
				{ type: "changed" as const, description: "Migrated all components to Svelte 5 runes" },
			],
		},
		{
			version: "0.8.0",
			date: "2026-04-01",
			entries: [
				{ type: "added" as const, description: "Dashboard shell with 3 layout variants" },
				{ type: "added" as const, description: "Sidebar components (15 components)" },
				{ type: "added" as const, description: "Landing page components (22 components)" },
				{ type: "added" as const, description: "Settings components (TabbedSettings, ProfileSettings, etc.)" },
				{ type: "fixed" as const, description: "Dialog backdrop click not closing on mobile" },
			],
		},
	];
</script>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
	<PageHeader title="Changelog" description="Release history and updates for bindrunes" />
	<ChangelogPage entries={changelog} />
</div>
