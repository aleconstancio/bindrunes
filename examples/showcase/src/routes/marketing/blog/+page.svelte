<script lang="ts">
	import { PageHeader } from "bindrunes/layouts";
	import { Banner, BlogArticle, BlogListing, ChangelogPage, CommentSection, ContentWithImage, CookieConsent, Maintenance, Popup, ReleaseNotes, SocialProof } from "bindrunes/domains/marketing";
	import { Button } from "bindrunes";

	let popupOpen = $state(false);
	let bannerOpen = $state(true);

	const posts = [
		{ id: "1", title: "Getting Started with bindrunes", excerpt: "Learn how to set up and use bindrunes in your SvelteKit project.", author: "Alice", date: "Jan 15, 2024", readTime: "5", tags: ["Tutorial", "Svelte"] },
		{ id: "2", title: "Advanced Theming Guide", excerpt: "Deep dive into the three-axis design system and custom themes.", author: "Bob", date: "Jan 10, 2024", readTime: "8", tags: ["Design", "Themes"] },
		{ id: "3", title: "Building Dashboard UIs", excerpt: "How to compose dashboard layouts with bindrunes components.", author: "Charlie", date: "Jan 5, 2024", readTime: "6", tags: ["Dashboard", "Layout"] },
	];

	const changelog = [
		{
			version: "1.2.0",
			date: "2024-01-15",
			entries: [
				{ type: "added" as const, description: "New Chat components for AI interfaces" },
				{ type: "added" as const, description: "E-commerce components (ProductCard, Cart, Checkout)" },
				{ type: "changed" as const, description: "Improved Button variants with link/soft/subtle" },
			],
		},
		{
			version: "1.1.0",
			date: "2024-01-01",
			entries: [
				{ type: "added" as const, description: "Calendar components (EventCalendar, Scheduler)" },
				{ type: "fixed" as const, description: "Dialog size variants not working" },
			],
		},
	];

	const contentItems = [
		{
			title: "Build faster with composable primitives",
			description: "Every component is designed to work together. Mix and match to create complex layouts without fighting the framework. Our primitives adapt to your design system automatically.",
			image: "https://picsum.photos/seed/primitives/600/400",
			imageSide: "left" as const,
		},
		{
			title: "Theming that just works",
			description: "Three-axis design system gives you full control over density, color, and rounding. Ship a consistent look across your entire app with a single config change.",
			image: "https://picsum.photos/seed/theming/600/400",
			imageSide: "right" as const,
		},
		{
			title: "Type-safe from end to end",
			description: "Full TypeScript support with auto-generated types for every component prop, event, and slot. Catch errors at compile time, not runtime.",
			image: "https://picsum.photos/seed/typesafe/600/400",
			imageSide: "left" as const,
		},
	];

	const testimonials = [
		{
			quote: "bindrunes cut our UI development time in half. The theming system is incredibly well thought out.",
			author: "Sarah Chen",
			role: "Engineering Lead at Acme Corp",
			avatar: "https://i.pravatar.cc/80?u=sarah",
		},
		{
			quote: "We replaced three separate UI libraries with bindrunes. The component API is clean and predictable.",
			author: "Marcus Rodriguez",
			role: "CTO at StartupXYZ",
			avatar: "https://i.pravatar.cc/80?u=marcus",
		},
		{
			quote: "The density system alone makes this worth it. Our dashboard looks great on every screen size.",
			author: "Anika Patel",
			role: "Product Designer at Figma",
			avatar: "https://i.pravatar.cc/80?u=anika",
		},
	];

	const logos = [
		{ name: "Vercel", url: "https://vercel.com" },
		{ name: "Supabase", url: "https://supabase.com" },
		{ name: "Stripe", url: "https://stripe.com" },
		{ name: "Linear", url: "https://linear.app" },
		{ name: "Notion", url: "https://notion.so" },
	];

	const comments = [
		{ author: "Alex Morgan", avatar: "https://i.pravatar.cc/80?u=alex", content: "This article really helped me understand the design system approach. Great walkthrough!", date: "2 days ago" },
		{ author: "Jordan Lee", content: "Would love to see a follow-up on custom token definitions.", date: "1 day ago" },
		{ author: "Sam Rivera", avatar: "https://i.pravatar.cc/80?u=sam", content: "We've been using this pattern in production for months now. Works beautifully.", date: "5 hours ago" },
	];

	const release = {
		version: "2.0.0",
		date: "2024-06-01",
		added: [
			"BlogArticle component for single article views",
			"ContentWithImage section for image-text layouts",
			"Maintenance page banner with estimated time",
			"Popup modal with badge and CTA support",
			"ReleaseNotes component with categorized entries",
			"SocialProof strip with testimonials and logos",
		],
		changed: [
			"Upgraded to Svelte 5 runes throughout",
			"Improved Block component spacing system",
		],
		fixed: [
			"Dialog backdrop click not closing on mobile",
			"Badge alignment in compact layouts",
		],
	};
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
	<PageHeader title="Marketing Components" description="Blog, changelog, content sections, and cookie consent" />

	<section>
		<h2 class="text-title-2 text-foreground mb-4">Blog Listing</h2>
		<BlogListing {posts} columns={3} />
	</section>

	<section>
		<h2 class="text-title-2 text-foreground mb-4">Blog Article</h2>
		<BlogArticle
			title="Building a Design System from Scratch"
			content="A design system is more than a component library. It is a shared language that bridges design and engineering. When built well, it accelerates every feature your team ships.

Start with tokens. Define your spacing scale, color palette, and typography before writing a single component. These primitives become the foundation everything else builds on.

Component composition is the real power. Small, focused components like Button, Input, and Badge combine into complex patterns like forms, cards, and data tables. Keep each piece simple and let the system handle complexity."
			authorName="Elena Voss"
			authorRole="Lead Engineer"
			publishDate="2024-06-01"
			readTime="12"
			tags={["Design Systems", "Svelte", "Architecture"]}
		/>
	</section>

	<section>
		<h2 class="text-title-2 text-foreground mb-4">Content With Image</h2>
		<ContentWithImage items={contentItems} />
	</section>

	<section>
		<h2 class="text-title-2 text-foreground mb-4">Maintenance</h2>
		<Maintenance
			title="Scheduled Maintenance"
			description="We are upgrading our infrastructure to serve you better. All services will be temporarily unavailable during this window."
			estimatedTime="~45 minutes"
			contactHref="https://status.example.com"
			contactLabel="View status page"
		/>
	</section>

	<section>
		<h2 class="text-title-2 text-foreground mb-4">Popup</h2>
		<p class="text-body-sm text-muted-foreground mb-4">Click the button to open the modal popup.</p>
		<Button variant="outline" onclick={() => (popupOpen = true)}>Show Popup</Button>
		<Popup
			bind:open={popupOpen}
			badge="New Release"
			title="bindrunes v2.0 is here"
			description="A complete redesign with Svelte 5 runes, new marketing components, and improved theming."
			ctaLabel="Read the announcement"
			ctaHref="#"
		/>
	</section>

	<section>
		<h2 class="text-title-2 text-foreground mb-4">Release Notes</h2>
		<ReleaseNotes {release} />
	</section>

	<section>
		<h2 class="text-title-2 text-foreground mb-4">Social Proof</h2>
		<SocialProof
			title="Trusted by thousands of developers"
			{testimonials}
			{logos}
		/>
	</section>

	<section>
		<h2 class="text-title-2 text-foreground mb-4">Changelog</h2>
		<ChangelogPage entries={changelog} />
	</section>

	<section>
		<h2 class="text-title-2 text-foreground mb-4">Cookie Consent</h2>
		<p class="text-body-sm text-muted-foreground mb-4">This banner appears at the bottom of the screen.</p>
		<CookieConsent />
	</section>

	<section>
		<h2 class="text-title-2 text-foreground mb-4">Banner</h2>
		<p class="text-body-sm text-muted-foreground mb-4">A dismissible top or bottom banner for announcements.</p>
		<Banner
			bind:open={bannerOpen}
			position="top"
			text="bindrunes v2.0 is now available with 50+ new components!"
			ctaLabel="Learn more"
			ctaHref="#"
		/>
	</section>

	<section>
		<h2 class="text-title-2 text-foreground mb-4">Comment Section</h2>
		<CommentSection
			items={comments}
			onSubmit={(text) => console.log("New comment:", text)}
			placeholder="Share your thoughts..."
			submitLabel="Post comment"
		/>
	</section>
</div>
