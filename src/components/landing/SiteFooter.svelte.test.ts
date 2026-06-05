import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import SiteFooter from './SiteFooter.svelte';
import type { FooterLink } from './landing-types';

const links: FooterLink[] = [
	{ label: 'Privacy', href: '/privacy' },
	{ label: 'Terms', href: '/terms' },
];

describe('SiteFooter', () => {
	it('renders a footer element', () => {
		const { container } = render(SiteFooter, {});
		expect(container.querySelector('footer')).not.toBeNull();
	});

	it('renders default copyright with year', () => {
		const year = new Date().getFullYear();
		render(SiteFooter, {});
		expect(screen.getByText(new RegExp(`${year}`))).toBeInTheDocument();
	});

	it('renders custom copyright when provided', () => {
		render(SiteFooter, { copyright: '© 2025 MyCo' });
		expect(screen.getByText('© 2025 MyCo')).toBeInTheDocument();
	});

	it('renders logo label when provided', () => {
		render(SiteFooter, { logo: { label: 'Bindrunes' } });
		expect(screen.getByText('Bindrunes')).toBeInTheDocument();
	});

	it('renders logo icon as string when provided', () => {
		render(SiteFooter, { logo: { label: 'X', icon: '🌟' } });
		expect(screen.getByText('🌟')).toBeInTheDocument();
	});

	it('renders all link labels', () => {
		render(SiteFooter, { links });
		expect(screen.getByText('Privacy')).toBeInTheDocument();
		expect(screen.getByText('Terms')).toBeInTheDocument();
	});

	it('renders links with hrefs', () => {
		const { container } = render(SiteFooter, { links });
		expect(container.querySelector('a[href="/privacy"]')).not.toBeNull();
		expect(container.querySelector('a[href="/terms"]')).not.toBeNull();
	});

	it('renders bottomLinks when provided', () => {
		render(SiteFooter, { bottomLinks: [{ label: 'Cookies', href: '/cookies' }] });
		expect(screen.getByText('Cookies')).toBeInTheDocument();
	});

	it('applies class prop', () => {
		const { container } = render(SiteFooter, { class: 'my-footer' });
		expect(container.firstElementChild?.className).toContain('my-footer');
	});
});
