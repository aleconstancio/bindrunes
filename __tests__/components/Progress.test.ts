import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Progress from '../../src/components/Progress.svelte';

describe('Progress', () => {
	it('renders with default value 0', () => {
		const { container } = render(Progress);
		const root = container.querySelector('[role="progressbar"]');
		expect(root).toBeInTheDocument();
	});

	it('renders with a given value', () => {
		const { container } = render(Progress, { props: { value: 50 } });
		const track = container.querySelector('[role="progressbar"]');
		expect(track).toBeInTheDocument();
	});

	it('default variant renders without crashing', () => {
		const { container } = render(Progress, { props: { value: 30 } });
		expect(container.querySelector('[role="progressbar"]')).toBeInTheDocument();
	});

	it('success variant renders without crashing', () => {
		const { container } = render(Progress, { props: { value: 30, variant: 'success' } });
		expect(container.querySelector('[role="progressbar"]')).toBeInTheDocument();
	});

	it('size sm applies small height', () => {
		const { container } = render(Progress, { props: { size: 'sm' } });
		const root = container.querySelector('[role="progressbar"]')!;
		expect(root.className).toContain('h-1');
	});
});
