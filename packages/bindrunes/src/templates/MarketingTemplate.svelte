<script lang="ts">
import type { Snippet } from "svelte";
import CtaBanner from "../domains/landing/CtaBanner.svelte";
import FAQ from "../domains/landing/FAQ.svelte";
import FeatureGrid from "../domains/landing/FeatureGrid.svelte";
import HeroBanner from "../domains/landing/HeroBanner.svelte";
import HowItWorks from "../domains/landing/HowItWorks.svelte";
import IntegrationGrid from "../domains/landing/IntegrationGrid.svelte";
import LandingNav from "../domains/landing/LandingNav.svelte";
import LogoCloud from "../domains/landing/LogoCloud.svelte";
import { createLandingState } from "../domains/landing/landing-context.svelte";
import type {
	CTA,
	FAQItem,
	Feature,
	FooterLink,
	Integration,
	Logo,
	Metric,
	NavCTA,
	Plan,
	StatData,
	Step,
	TeamMember,
	Testimonial,
} from "../domains/landing/landing-types";
import MetricsBar from "../domains/landing/MetricsBar.svelte";
import Newsletter from "../domains/landing/Newsletter.svelte";
import PricingTable from "../domains/landing/PricingTable.svelte";
import SiteFooter from "../domains/landing/SiteFooter.svelte";
import StatsCounter from "../domains/landing/StatsCounter.svelte";
import TeamSection from "../domains/landing/TeamSection.svelte";
import TestimonialGrid from "../domains/landing/TestimonialGrid.svelte";
import VideoEmbed from "../domains/landing/VideoEmbed.svelte";
import PageSection from "../layouts/PageSection.svelte";
import PageShell from "../layouts/PageShell.svelte";
import type { NavLink } from "../shared-types";

let {
	logo,
	navLinks = [],
	cta,
	badge,
	heroTitle,
	heroDescription,
	heroCtas = [],
	heroFootnote,
	heroBackground = "gradient",
	heroLevel = 1,
	metrics,
	features,
	featureColumns = 3,
	featureVariant = "card",
	steps,
	plans,
	testimonials,
	stats,
	faqItems,
	ctaTitle,
	ctaDescription,
	ctaLabel = "Get started for free",
	ctaHref = "#",
	footerLinks = [],
	copyright,
	bottomLinks = [],
	class: className = "",
	logos,
	logosTitle,
	integrations,
	team,
	newsletter,
	video,
	heroSnippet,
	navSnippet,
	featuresSnippet,
	pricingSnippet,
	metricsSnippet,
	howItWorksSnippet,
	testimonialsSnippet,
	statsSnippet,
	logosSnippet,
	integrationsSnippet,
	teamSnippet,
	newsletterSnippet,
	videoSnippet,
	ctaSnippet,
	faqSnippet,
	footerSnippet,
	children,
}: {
	logo?: Logo;
	navLinks?: NavLink[];
	cta?: NavCTA;
	badge?: string;
	heroTitle?: Snippet;
	heroDescription?: string;
	heroCtas?: CTA[];
	heroFootnote?: { title: string; description: string };
	heroBackground?: "gradient" | "solid" | "none";
	heroLevel?: 1 | 2;
	metrics?: Metric[];
	features?: Feature[];
	featureColumns?: number;
	featureVariant?: "card" | "inline";
	steps?: Step[];
	plans?: Plan[];
	testimonials?: Testimonial[];
	stats?: StatData[];
	faqItems?: FAQItem[];
	ctaTitle?: string;
	ctaDescription?: string;
	ctaLabel?: string;
	ctaHref?: string;
	footerLinks?: FooterLink[];
	copyright?: string;
	bottomLinks?: FooterLink[];
	class?: string;
	logos?: Logo[];
	logosTitle?: string;
	integrations?: Integration[];
	team?: TeamMember[];
	newsletter?: { title?: string; description?: string };
	video?: { url: string; poster?: string };
	heroSnippet?: Snippet;
	navSnippet?: Snippet;
	featuresSnippet?: Snippet;
	pricingSnippet?: Snippet;
	metricsSnippet?: Snippet;
	howItWorksSnippet?: Snippet;
	testimonialsSnippet?: Snippet;
	statsSnippet?: Snippet;
	logosSnippet?: Snippet;
	integrationsSnippet?: Snippet;
	teamSnippet?: Snippet;
	newsletterSnippet?: Snippet;
	videoSnippet?: Snippet;
	ctaSnippet?: Snippet;
	faqSnippet?: Snippet;
	footerSnippet?: Snippet;
	children?: Snippet;
} = $props();

createLandingState();

const sectionIds = $derived(
	[
		metrics?.length ? "metrics" : null,
		logos?.length ? "logos" : null,
		features?.length ? "features" : null,
		integrations?.length ? "integrations" : null,
		steps?.length ? "how-it-works" : null,
		video ? "video" : null,
		plans?.length ? "pricing" : null,
		testimonials?.length ? "testimonials" : null,
		team?.length ? "team" : null,
		stats?.length ? "stats" : null,
		newsletter ? "newsletter" : null,
		faqItems?.length ? "faq" : null,
	].filter(Boolean) as string[],
);
</script>

<div class="landing-page {className}">
	{#if navSnippet}
		{@render navSnippet()}
	{:else}
		<LandingNav {logo} links={navLinks} {cta} {sectionIds} />
	{/if}

	{#if heroSnippet}
		{@render heroSnippet()}
	{:else if heroTitle || heroDescription}
		<HeroBanner
			{badge}
			title={heroTitle}
			description={heroDescription}
			ctas={heroCtas}
			footnote={heroFootnote}
			background={heroBackground}
			level={heroLevel}
		/>
	{/if}

	{#if metricsSnippet}
		{@render metricsSnippet()}
	{:else if metrics?.length}
		<PageSection id="metrics" size="xl">
			<MetricsBar {metrics} />
		</PageSection>
	{/if}

	{#if logosSnippet}
		{@render logosSnippet()}
	{:else if logos?.length}
		<PageSection id="logos" size="xl" reveal={false}>
			<LogoCloud title={logosTitle} logos={logos} />
		</PageSection>
	{/if}

	{#if featuresSnippet}
		{@render featuresSnippet()}
	{:else if features?.length}
		<PageSection id="features" size="xl">
			<h2 class="text-center text-display-3 text-foreground">Features</h2>
			<div class="mt-10">
				<FeatureGrid {features} columns={featureColumns} variant={featureVariant} />
			</div>
		</PageSection>
	{/if}

	{#if integrationsSnippet}
		{@render integrationsSnippet()}
	{:else if integrations?.length}
		<PageSection id="integrations" size="xl">
			<IntegrationGrid {integrations} />
		</PageSection>
	{/if}

	{#if howItWorksSnippet}
		{@render howItWorksSnippet()}
	{:else if steps?.length}
		<PageSection id="how-it-works" size="xl">
			<h2 class="text-center text-display-3 text-foreground">How it works</h2>
			<div class="mt-10">
				<HowItWorks {steps} showConnector />
			</div>
		</PageSection>
	{/if}

	{#if videoSnippet}
		{@render videoSnippet()}
	{:else if video}
		<PageSection id="video" size="lg">
			<VideoEmbed videoUrl={video.url} posterUrl={video.poster} />
		</PageSection>
	{/if}

	{#if pricingSnippet}
		{@render pricingSnippet()}
	{:else if plans?.length}
		<PageSection id="pricing" size="xl" background="muted">
			<h2 class="text-center text-display-3 text-foreground">Pricing</h2>
			<div class="mt-10">
				<PricingTable {plans} />
			</div>
		</PageSection>
	{/if}

	{#if testimonialsSnippet}
		{@render testimonialsSnippet()}
	{:else if testimonials?.length}
		<PageSection id="testimonials" size="xl">
			<h2 class="text-center text-display-3 text-foreground">What our customers say</h2>
			<div class="mt-10">
				<TestimonialGrid {testimonials} />
			</div>
		</PageSection>
	{/if}

	{#if teamSnippet}
		{@render teamSnippet()}
	{:else if team?.length}
		<PageSection id="team" size="xl">
			<TeamSection members={team} />
		</PageSection>
	{/if}

	{#if statsSnippet}
		{@render statsSnippet()}
	{:else if stats?.length}
		<PageSection id="stats" size="xl">
			<StatsCounter {stats} />
		</PageSection>
	{/if}

	{#if faqSnippet}
		{@render faqSnippet()}
	{:else if faqItems?.length}
		<PageSection id="faq" size="lg">
			<h2 class="text-center text-display-3 text-foreground">Frequently asked questions</h2>
			<div class="mt-10">
				<FAQ items={faqItems} />
			</div>
		</PageSection>
	{/if}

	{#if ctaSnippet}
		{@render ctaSnippet()}
	{:else if ctaTitle}
		<CtaBanner title={ctaTitle} description={ctaDescription} {ctaLabel} {ctaHref} />
	{/if}

	{#if newsletterSnippet}
		{@render newsletterSnippet()}
	{:else if newsletter}
		<PageSection id="newsletter" size="lg" background="muted">
			<Newsletter title={newsletter.title ?? ""} description={newsletter.description} />
		</PageSection>
	{/if}

	{#if children}
		{@render children()}
	{/if}

	{#if footerSnippet}
		{@render footerSnippet()}
	{:else}
		<SiteFooter {logo} links={footerLinks} {copyright} {bottomLinks} />
	{/if}
</div>
