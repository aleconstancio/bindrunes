import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Badge from '../../src/components/Badge.svelte';

describe('Badge', () => {
	it('renders without crashing', () => {
		const { container } = render(Badge);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it('default variant applies bg-muted', () => {
		const { container } = render(Badge);
		expect(container.firstElementChild!.className).toContain('bg-muted');
	});

	it('primary variant applies bg-primary', () => {
		const { container } = render(Badge, { props: { variant: 'primary' } });
		expect(container.firstElementChild!.className).toContain('bg-primary');
	});

	it('secondary variant applies bg-secondary', () => {
		const { container } = render(Badge, { props: { variant: 'secondary' } });
		expect(container.firstElementChild!.className).toContain('bg-secondary');
	});

	it('success variant applies emerald classes', () => {
		const { container } = render(Badge, { props: { variant: 'success' } });
		expect(container.firstElementChild!.className).toContain('emerald');
	});

	it('warning variant applies amber classes', () => {
		const { container } = render(Badge, { props: { variant: 'warning' } });
		expect(container.firstElementChild!.className).toContain('amber');
	});

	it('destructive variant applies destructive classes', () => {
		const { container } = render(Badge, { props: { variant: 'destructive' } });
		expect(container.firstElementChild!.className).toContain('destructive');
	});
});
