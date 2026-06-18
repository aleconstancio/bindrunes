import type { Component } from "svelte";

export interface CTA {
	label: string;
	href: string;
	variant?: "primary" | "outline";
	icon?: Component | string;
}

export interface Feature {
	icon: Component | string;
	title: string;
	description: string;
}

export interface Metric {
	value: string;
	label: string;
	description?: string;
	variant?: "default" | "success" | "warning";
}

export interface Step {
	icon: Component | string;
	title: string;
	description: string;
}

export interface Plan {
	name: string;
	monthly: number;
	annual: number;
	features: string[];
	cta: { label: string; href: string; variant?: "primary" | "outline" };
	highlight?: boolean;
	badge?: string;
}

export interface TeamMember {
	name: string;
	role: string;
	avatar?: string;
	avatarFallback?: string;
	bio?: string;
	social?: { icon: Component | string; href: string; label: string }[];
}

export interface Integration {
	icon: Component | string;
	title: string;
	description: string;
	href?: string;
}

export interface Testimonial {
	quote: string;
	author: string;
	role: string;
	avatar?: string;
	avatarFallback?: string;
}

export interface FAQItem {
	question: string;
	answer: string;
}

export interface FooterLink {
	label: string;
	href: string;
}
