import type { Component } from 'svelte';

export interface CTA {
  label: string;
  href: string;
  variant?: 'primary' | 'outline';
  icon?: Component;
}

export interface Feature {
  icon: Component;
  title: string;
  description: string;
}

export interface Metric {
  value: string;
  label: string;
  description?: string;
  variant?: 'default' | 'success' | 'warning';
}

export interface Step {
  icon: Component;
  title: string;
  description: string;
}

export interface Plan {
  name: string;
  monthly: number;
  annual: number;
  features: string[];
  cta: { label: string; href: string; variant?: 'primary' | 'outline' };
  highlight?: boolean;
  badge?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
  avatarFallback?: string;
  bio?: string;
  social?: { icon: Component; href: string; label: string }[];
}

export interface Integration {
  icon: Component;
  title: string;
  description: string;
  href?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FooterLink {
  label: string;
  href: string;
}
