import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import MetricCard from '../../src/components/MetricCard.svelte';

describe('MetricCard', () => {
	it('renders label, value, and detail', () => {
		render(MetricCard, { props: { label: 'Revenue', value: '$10k', detail: 'This month' } });
		expect(screen.getByText('Revenue')).toBeInTheDocument();
		expect(screen.getByText('$10k')).toBeInTheDocument();
		expect(screen.getByText('This month')).toBeInTheDocument();
	});

	it('renders progress bar when progress is provided', () => {
		const { container } = render(MetricCard, { props: { label: 'Usage', value: '75%', progress: 75 } });
		const bar = container.querySelector('[style*="width:"]');
		expect(bar).toBeInTheDocument();
		expect(bar?.getAttribute('style')).toContain('75%');
	});
});
