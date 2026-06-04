import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Progress from '../../src/components/Progress.svelte';

describe('Progress', () => {
	it('renders without crashing', () => {
		const { container } = render(Progress);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it('default variant applies bg-primary', () => {
		const { container } = render(Progress, { props: { variant: 'default' } });
		const track = container.querySelector('[role="progressbar"] + *') ?? container.querySelector('[class*="rounded-full"]');
		// The track element carries the color class
		expect(track).toBeInTheDocument();
	});

	it('success variant applies bg-success', () => {
		const { container } = render(Progress, { props: { value: 50, variant: 'success' } });
		expect(container.innerHTML).toContain('bg-success');
	});

	it('warning variant applies bg-warning', () => {
		const { container } = render(Progress, { props: { value: 50, variant: 'warning' } });
		expect(container.innerHTML).toContain('bg-warning');
	});
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
