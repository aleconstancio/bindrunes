import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import FeatureGrid from './FeatureGrid.svelte';
import type { Feature } from './landing-types';

const stringFeatures: Feature[] = [
	{ icon: '🚀', title: 'Fast', description: 'Quick to learn' },
	{ icon: '🔒', title: 'Secure', description: 'Bank-grade security' },
];

const SvelteIcon = () => '<svg data-testid="icon"></svg>';
const componentFeatures: Feature[] = [
	{ icon: SvelteIcon as never, title: 'Component', description: 'Has icon component' },
];

describe('FeatureGrid', () => {
	it('renders grid container', () => {
		const { container } = render(FeatureGrid, { features: stringFeatures });
		expect(container.querySelector('.grid')).not.toBeNull();
	});

	it('renders all feature titles', () => {
		render(FeatureGrid, { features: stringFeatures });
		expect(screen.getByText('Fast')).toBeInTheDocument();
		expect(screen.getByText('Secure')).toBeInTheDocument();
	});

	it('renders all feature descriptions', () => {
		render(FeatureGrid, { features: stringFeatures });
		expect(screen.getByText('Quick to learn')).toBeInTheDocument();
		expect(screen.getByText('Bank-grade security')).toBeInTheDocument();
	});

	it('renders nothing for empty features', () => {
		const { container } = render(FeatureGrid, { features: [] });
		expect(container.querySelectorAll('h3').length).toBe(0);
	});

	it('applies columns=1', () => {
		const { container } = render(FeatureGrid, { features: stringFeatures, columns: 1 });
		expect(container.querySelector('.grid')?.className).toMatch(/grid-cols-1/);
	});

	it('applies columns=2', () => {
		const { container } = render(FeatureGrid, { features: stringFeatures, columns: 2 });
		expect(container.querySelector('.grid')?.className).toMatch(/grid-cols-2/);
	});

	it('applies columns=3 (default)', () => {
		const { container } = render(FeatureGrid, { features: stringFeatures });
		expect(container.querySelector('.grid')?.className).toMatch(/grid-cols-3/);
	});

	it('applies class prop', () => {
		const { container } = render(FeatureGrid, { features: stringFeatures, class: 'custom' });
		expect(container.querySelector('.grid')?.className).toContain('custom');
	});

	it('minimal variant renders without Card wrapper', () => {
		const { container } = render(FeatureGrid, { features: stringFeatures, variant: 'minimal' });
		// Minimal variant uses a <div> with h3, not Card
		expect(container.querySelectorAll('h3').length).toBe(2);
	});

	it('component icon renders in card variant', () => {
		render(FeatureGrid, { features: componentFeatures, variant: 'card' });
		// SvelteIcon is a stub function, not a real Svelte component
		// This is mostly a smoke test for the typeof branch
		expect(screen.getByText('Component')).toBeInTheDocument();
	});

	it('component icon renders in minimal variant', () => {
		render(FeatureGrid, { features: componentFeatures, variant: 'minimal' });
		expect(screen.getByText('Component')).toBeInTheDocument();
	});
});
