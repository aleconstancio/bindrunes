import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Newsletter from './Newsletter.svelte';

describe('Newsletter', () => {
	it('exports a Svelte component', () => {
		expect(Newsletter).toBeDefined();
	});

	it('is a function', () => {
		expect(typeof Newsletter).toBe('function');
	});

	it('renders title', () => {
		const { container } = render(Newsletter, { title: 'Subscribe' });
		expect(container.textContent).toContain('Subscribe');
	});

	it('renders default button text', () => {
		const { container } = render(Newsletter, { title: 'X' });
		expect(container.textContent).toContain('Inscrever');
	});

	it('renders custom button text', () => {
		const { container } = render(Newsletter, { title: 'X', buttonText: 'Join' });
		expect(container.textContent).toContain('Join');
	});

	it('renders description when provided', () => {
		const { container } = render(Newsletter, { title: 'X', description: 'Stay updated' });
		expect(container.textContent).toContain('Stay updated');
	});
});
