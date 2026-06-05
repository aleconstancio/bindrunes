import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import StatsCounter from './StatsCounter.svelte';

const stats = [
	{ value: 100, label: 'Projects' },
	{ value: 50, label: 'Clients', prefix: '$', suffix: 'M' },
];

describe('StatsCounter', () => {
	it('renders grid container', () => {
		const { container } = render(StatsCounter, { stats });
		expect(container.firstElementChild?.className).toContain('grid');
	});

	it('renders all stat labels', () => {
		render(StatsCounter, { stats });
		expect(screen.getByText('Projects')).toBeInTheDocument();
		expect(screen.getByText('Clients')).toBeInTheDocument();
	});

	it('renders prefix and suffix', () => {
		const { container } = render(StatsCounter, { stats });
		expect(container.textContent).toContain('$');
		expect(container.textContent).toContain('M');
	});

	it('renders nothing for empty stats', () => {
		const { container } = render(StatsCounter, { stats: [] });
		expect(container.textContent?.trim()).toBe('');
	});

	it('applies columns prop (default 4)', () => {
		const { container } = render(StatsCounter, { stats });
		expect(container.firstElementChild?.className).toMatch(/grid-cols-4/);
	});

	it('applies columns prop (2)', () => {
		const { container } = render(StatsCounter, { stats, columns: 2 });
		expect(container.firstElementChild?.className).toMatch(/grid-cols-2/);
	});

	it('applies class prop', () => {
		const { container } = render(StatsCounter, { stats, class: 'custom' });
		expect(container.firstElementChild?.className).toContain('custom');
	});
});
