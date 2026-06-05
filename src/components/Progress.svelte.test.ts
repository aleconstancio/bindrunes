import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Progress from '../../src/components/Progress.svelte';

describe('Progress', () => {
	it('renders without crashing', () => {
		const { container } = render(Progress);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it('renders with a given value', () => {
		const { container } = render(Progress, { props: { value: 50 } });
		const root = container.querySelector('[role="progressbar"]');
		expect(root).toBeInTheDocument();
	});

	it('default variant renders', () => {
		const { container } = render(Progress, { props: { variant: 'default' } });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it('success variant renders', () => {
		const { container } = render(Progress, { props: { value: 50, variant: 'success' } });
		expect(container.querySelector('[role="progressbar"]')).toBeInTheDocument();
	});

	it('warning variant renders', () => {
		const { container } = render(Progress, { props: { value: 50, variant: 'warning' } });
		expect(container.querySelector('[role="progressbar"]')).toBeInTheDocument();
	});

	it('size sm applies small height', () => {
		const { container } = render(Progress, { props: { size: 'sm' } });
		const root = container.querySelector('[role="progressbar"]')!;
		expect(root.className).toContain('h-1');
	});

	it('size lg applies large height', () => {
		const { container } = render(Progress, { props: { size: 'lg' } });
		const root = container.querySelector('[role="progressbar"]')!;
		expect(root.className).toContain('h-3');
	});
});
