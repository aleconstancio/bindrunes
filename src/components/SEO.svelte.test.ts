import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/svelte';
import SEO from './SEO.svelte';

describe('SEO', () => {
	let originalTitle: string;

	beforeEach(() => {
		originalTitle = document.title;
		document.title = '';
		document.querySelectorAll('meta[name], meta[property]').forEach((m) => m.remove());
	});

	afterEach(() => {
		document.title = originalTitle;
		document.querySelectorAll('meta[name], meta[property]').forEach((m) => m.remove());
	});

	it('sets document.title when title prop is provided', async () => {
		render(SEO, { title: 'Page Title' });
		await new Promise((r) => setTimeout(r, 10));
		expect(document.title).toBe('Page Title');
	});

	it('sets description meta tag', async () => {
		render(SEO, { description: 'A description' });
		await new Promise((r) => setTimeout(r, 10));
		const meta = document.querySelector('meta[name="description"]');
		expect(meta?.getAttribute('content')).toBe('A description');
	});

	it('sets og:title meta tag', async () => {
		render(SEO, { ogTitle: 'OG Title' });
		await new Promise((r) => setTimeout(r, 10));
		const meta = document.querySelector('meta[property="og:title"]');
		expect(meta?.getAttribute('content')).toBe('OG Title');
	});

	it('falls back to title when ogTitle is missing', async () => {
		render(SEO, { title: 'Page', ogDescription: 'OG Desc' });
		await new Promise((r) => setTimeout(r, 10));
		const meta = document.querySelector('meta[property="og:title"]');
		expect(meta?.getAttribute('content')).toBe('Page');
	});

	it('falls back to description when ogDescription is missing', async () => {
		render(SEO, { description: 'Page desc', ogTitle: 'OG T' });
		await new Promise((r) => setTimeout(r, 10));
		const meta = document.querySelector('meta[property="og:description"]');
		expect(meta?.getAttribute('content')).toBe('Page desc');
	});

	it('sets og:image meta tag', async () => {
		render(SEO, { ogImage: '/og.png' });
		await new Promise((r) => setTimeout(r, 10));
		const meta = document.querySelector('meta[property="og:image"]');
		expect(meta?.getAttribute('content')).toBe('/og.png');
	});

	it('renders nothing in body (only affects head)', () => {
		const { container } = render(SEO, { title: 'X' });
		expect(container.children).toHaveLength(0);
	});
});
