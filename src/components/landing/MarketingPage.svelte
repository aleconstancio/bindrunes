<script lang="ts">
import type { Component, Snippet } from "svelte";
import type { NavLink } from "../../shared-types";
import PageSection from "../PageSection.svelte";
import PageShell from "../PageShell.svelte";
import CtaBanner from "./CtaBanner.svelte";
import FAQ from "./FAQ.svelte";
import FeatureGrid from "./FeatureGrid.svelte";
import HeroBanner from "./HeroBanner.svelte";
import HowItWorks from "./HowItWorks.svelte";
import LandingNav from "./LandingNav.svelte";
import { createLandingState } from "./landing-context.svelte";
import type { CTA, FAQItem, Feature, FooterLink, Metric, Plan, Step } from "./landing-types";
import MetricsBar from "./MetricsBar.svelte";
import PricingTable from "./PricingTable.svelte";
import SiteFooter from "./SiteFooter.svelte";
import StatsCounter from "./StatsCounter.svelte";
import TestimonialGrid from "./TestimonialGrid.svelte";

interface NavLogo {
	href: string;
	label: string;
	icon?: Component | string;
}

interface NavCTA {
	label: string;
	href: string;
	variant?: "primary" | "outline";
}

interface TestimonialData {
	quote: string;
	author: string;
	role: string;
	avatar?: string;
	avatarFallback?: string;
}

interface StatData {
	value: number;
	label: string;
	suffix?: string;
	prefix?: string;
}

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
	heroSnippet,
	navSnippet,
	featuresSnippet,
	pricingSnippet,
	faqSnippet,
	footerSnippet,
	children,
}: {
	logo?: NavLogo;
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
	testimonials?: TestimonialData[];
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
	heroSnippet?: Snippet;
	navSnippet?: Snippet;
	featuresSnippet?: Snippet;
	pricingSnippet?: Snippet;
	faqSnippet?: Snippet;
	footerSnippet?: Snippet;
	children?: Snippet;
} = $props();

createLandingState();

const sectionIds = $derived(
	[
		metrics?.length ? "metrics" : null,
		features?.length ? "features" : null,
		steps?.length ? "how-it-works" : null,
		plans?.length ? "pricing" : null,
		testimonials?.length ? "testimonials" : null,
		stats?.length ? "stats" : null,
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

	{#if metrics?.length}
		<PageSection id="metrics" size="xl">
			<MetricsBar {metrics} />
		</PageSection>
	{/if}

	{#if features?.length}
		{#if featuresSnippet}
			{@render featuresSnippet()}
		{:else}
			<PageSection id="features" size="xl">
				<h2 class="text-center text-display-3 text-foreground">Features</h2>
				<div class="mt-10">
					<FeatureGrid {features} columns={featureColumns} variant={featureVariant} />
				</div>
			</PageSection>
		{/if}
	{/if}

	{#if steps?.length}
		<PageSection id="how-it-works" size="xl">
			<h2 class="text-center text-display-3 text-foreground">How it works</h2>
			<div class="mt-10">
				<HowItWorks {steps} showConnector />
			</div>
		</PageSection>
	{/if}

	{#if plans?.length}
		{#if pricingSnippet}
			{@render pricingSnippet()}
		{:else}
			<PageSection id="pricing" size="xl" background="muted">
				<h2 class="text-center text-display-3 text-foreground">Pricing</h2>
				<div class="mt-10">
					<PricingTable {plans} />
				</div>
			</PageSection>
		{/if}
	{/if}

	{#if testimonials?.length}
		<PageSection id="testimonials" size="xl">
			<h2 class="text-center text-display-3 text-foreground">What our customers say</h2>
			<div class="mt-10">
				<TestimonialGrid {testimonials} />
			</div>
		</PageSection>
	{/if}

	{#if stats?.length}
		<PageSection id="stats" size="xl">
			<StatsCounter {stats} />
		</PageSection>
	{/if}

	{#if faqItems?.length}
		{#if faqSnippet}
			{@render faqSnippet()}
		{:else}
			<PageSection id="faq" size="lg">
				<h2 class="text-center text-display-3 text-foreground">Frequently asked questions</h2>
				<div class="mt-10">
					<FAQ items={faqItems} />
				</div>
			</PageSection>
		{/if}
	{/if}

	{#if ctaTitle}
		<CtaBanner title={ctaTitle} description={ctaDescription} {ctaLabel} {ctaHref} />
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
