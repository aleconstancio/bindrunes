import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useHead } from './useHead.svelte';

describe('useHead', () => {
	let originalTitle: string;

	beforeEach(() => {
		originalTitle = document.title;
		// Clean meta tags from previous tests
		document.querySelectorAll('meta[name], meta[property]').forEach((m) => m.remove());
	});

	afterEach(() => {
		document.title = originalTitle;
		document.querySelectorAll('meta[name], meta[property]').forEach((m) => m.remove());
	});

	it('sets document.title when title is provided', () => {
		useHead({ title: 'My Page' });
		expect(document.title).toBe('My Page');
	});

	it('handles options with only description', () => {
		useHead({ description: 'Just a description' });
		const meta = document.querySelector('meta[name="description"]');
		expect(meta?.getAttribute('content')).toBe('Just a description');
	});

	it('handles options with only og metadata', () => {
		useHead({
			og: { title: 'OG Title', description: 'OG Desc', image: '/img.png' },
		});
		expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe('OG Title');
		expect(document.querySelector('meta[property="og:description"]')?.getAttribute('content')).toBe('OG Desc');
		expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe('/img.png');
	});

	it('handles options with all fields', () => {
		useHead({
			title: 'Page',
			description: 'Desc',
			og: { title: 'OG', description: 'OG D', image: '/og.png' },
		});
		expect(document.title).toBe('Page');
		expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe('Desc');
	});

	it('updates existing meta tag instead of creating duplicate', () => {
		useHead({ description: 'First' });
		useHead({ description: 'Second' });
		const metas = document.querySelectorAll('meta[name="description"]');
		expect(metas).toHaveLength(1);
		expect(metas[0].getAttribute('content')).toBe('Second');
	});

	it('does not set title when title is empty string', () => {
		document.title = 'Previous';
		useHead({ title: '' });
		expect(document.title).toBe('Previous');
	});

	it('skips empty og subfields', () => {
		useHead({ og: { title: 'OG Title' } });
		expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe('OG Title');
		expect(document.querySelector('meta[property="og:description"]')).toBeNull();
		expect(document.querySelector('meta[property="og:image"]')).toBeNull();
	});

	it('handles empty options object', () => {
		expect(() => useHead({})).not.toThrow();
	});
});
