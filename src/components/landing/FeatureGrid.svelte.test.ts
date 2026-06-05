import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import FeatureGrid from './FeatureGrid.svelte';
import type { Feature } from './landing-types';

const features: Feature[] = [
	{ icon: '🚀', title: 'Fast', description: 'Quick to learn' },
	{ icon: '🔒', title: 'Secure', description: 'Bank-grade security' },
];

describe('FeatureGrid', () => {
	it('renders grid container', () => {
		const { container } = render(FeatureGrid, { features });
		expect(container.querySelector('div')?.className).toContain('grid');
	});

	it('renders all feature titles', () => {
		render(FeatureGrid, { features });
		expect(screen.getByText('Fast')).toBeInTheDocument();
		expect(screen.getByText('Secure')).toBeInTheDocument();
	});

	it('renders all feature descriptions', () => {
		render(FeatureGrid, { features });
		expect(screen.getByText('Quick to learn')).toBeInTheDocument();
		expect(screen.getByText('Bank-grade security')).toBeInTheDocument();
	});

	it('renders nothing for empty features', () => {
		const { container } = render(FeatureGrid, { features: [] });
		expect(container.querySelectorAll('h3').length).toBe(0);
	});

	it('applies columns prop', () => {
		const { container } = render(FeatureGrid, { features, columns: 2 });
		expect(container.querySelector('div')?.className).toMatch(/grid-cols-2/);
	});

	it('applies class prop', () => {
		const { container } = render(FeatureGrid, { features, class: 'custom' });
		expect(container.firstElementChild?.className).toContain('custom');
	});
});
