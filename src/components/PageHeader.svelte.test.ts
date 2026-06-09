import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import PageHeader from './PageHeader.svelte';

describe('PageHeader', () => {
	it('renders the title', () => {
		render(PageHeader, { title: 'My Page' });
		expect(screen.getByText('My Page')).toBeInTheDocument();
	});

	it('renders the title inside h1', () => {
		const { container } = render(PageHeader, { title: 'My Page' });
		const h1 = container.querySelector('h1');
		expect(h1).not.toBeNull();
		expect(h1?.textContent).toBe('My Page');
	});

	it('renders description when provided', () => {
		render(PageHeader, { title: 'X', description: 'A page description' });
		expect(screen.getByText('A page description')).toBeInTheDocument();
	});

	it('does not render description when not provided', () => {
		const { container } = render(PageHeader, { title: 'X' });
		const p = container.querySelector('p');
		expect(p).toBeNull();
	});

	it('renders breadcrumbs when provided', () => {
		const { container } = render(PageHeader, {
			title: 'X',
			breadcrumbs: [
				{ label: 'Home', href: '/' },
				{ label: 'Current' },
			],
		});
		expect(container.querySelector('nav')).not.toBeNull();
	});

	it('renders back link when backHref is provided', () => {
		const { container } = render(PageHeader, { title: 'X', backHref: '/back' });
		const backLink = container.querySelector('a[href="/back"]');
		expect(backLink).not.toBeNull();
		expect(backLink?.getAttribute('aria-label')).toBe('Go back');
	});

	it('does not render back link when backHref is not provided', () => {
		const { container } = render(PageHeader, { title: 'X' });
		expect(container.querySelector('a[aria-label="Go back"]')).toBeNull();
	});

	it('applies class prop to root', () => {
		const { container } = render(PageHeader, { title: 'X', class: 'custom-class' });
		expect(container.firstElementChild?.className).toContain('custom-class');
	});
});
