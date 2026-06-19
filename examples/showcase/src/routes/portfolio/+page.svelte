<script lang="ts">
	import { CaseStudy, ProjectGrid, PortfolioPage } from "bindrunes/boundrune";

	const projects = [
		{ id: "1", title: "E-commerce Platform", description: "A full-stack e-commerce solution with real-time inventory.", image: "", tags: ["Svelte", "Node.js", "PostgreSQL"] },
		{ id: "2", title: "Analytics Dashboard", description: "Real-time analytics with customizable widgets and charts.", image: "", tags: ["Svelte", "D3.js", "WebSocket"] },
		{ id: "3", title: "Social Media App", description: "A mobile-first social platform with real-time messaging.", image: "", tags: ["SvelteKit", "Firebase", "Tailwind"] },
		{ id: "4", title: "Task Management", description: "Kanban-style task management with team collaboration.", image: "", tags: ["Svelte", "Supabase", "TypeScript"] },
		{ id: "5", title: "Portfolio Website", description: "A creative portfolio with smooth animations.", image: "", tags: ["SvelteKit", "GSAP", "Three.js"] },
		{ id: "6", title: "Blog Platform", description: "A modern blog with markdown support and RSS feeds.", image: "", tags: ["SvelteKit", "MDsveX", "Vercel"] },
	];

	const caseStudyResults = [
		{ label: "Conversion Lift", value: "+42%" },
		{ label: "Load Time", value: "1.2s" },
		{ label: "Uptime", value: "99.9%" },
		{ label: "Revenue Impact", value: "$2.1M" },
	];
</script>

<PortfolioPage title="Portfolio" description="Project showcase and case studies">
	<p class="text-body-sm text-muted-foreground">
		Jump to: <a href="#case-study" class="text-primary hover:underline">Case Study</a>
	</p>

	<ProjectGrid {projects} columns={3} />

	<div class="space-y-4">
		<h2 id="case-study" class="text-display-3 text-foreground">Case Study</h2>

		<CaseStudy
			title="Redesigning the Checkout Flow"
			subtitle="How we reduced cart abandonment by 38% through UX research and iterative prototyping."
			client="Acme Corp"
			industry="E-commerce"
			duration="12 weeks"
			results={caseStudyResults}
		>
			<h2>Background</h2>
			<p>
				Acme Corp was experiencing a 67% cart abandonment rate on their primary e-commerce
				platform. Previous attempts to address the issue focused on performance optimizations,
				which yielded minimal improvement. We were brought in to take a user-centered approach.
			</p>

			<h2>Research & Discovery</h2>
			<p>
				We conducted 24 user interviews, analyzed heatmaps from 10k sessions, and performed
				a competitive audit of 8 industry leaders. The key findings revealed that trust signals
				were missing at critical decision points, and the multi-step checkout lacked clear
				progress indicators.
			</p>

			<h2>Solution</h2>
			<p>
				We collapsed the four-step checkout into a single scrolling page with an order summary
				sticky sidebar. Trust badges, customer reviews, and a money-back guarantee were placed
				adjacent to the payment form. A new express checkout option saved payment details for
				returning users.
			</p>

			<h2>Outcome</h2>
			<p>
				Within six weeks of launch, cart abandonment dropped from 67% to 41%. The average
				order value increased by 18% due to better cross-sell placement. Mobile conversion
				improved by 52%, making it the primary growth channel.
			</p>
		</CaseStudy>
	</div>
</PortfolioPage>
