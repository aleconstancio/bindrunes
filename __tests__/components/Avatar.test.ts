import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Avatar from '../../src/components/Avatar.svelte';

describe('Avatar', () => {
	it('renders fallback initials when no src', () => {
		const { container } = render(Avatar, { props: { fallback: 'JD', size: 'md' } });
		expect(container.textContent).toContain('JD');
	});

	it('renders with default md size', () => {
		const { container } = render(Avatar, { props: { fallback: 'A' } });
		const root = container.querySelector('[class*="inline-flex"]');
		expect(root).toBeInTheDocument();
	});

	it('applies custom class', () => {
		const { container } = render(Avatar, { props: { fallback: 'A', class: 'custom' } });
		expect(container.querySelector('.custom')).toBeInTheDocument();
	});
});
