import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Alert from '../../src/components/Alert.svelte';

describe('Alert', () => {
	it('renders title and description', () => {
		render(Alert, { props: { title: 'Warning!', description: 'Something went wrong' } });
		expect(screen.getByText('Warning!')).toBeInTheDocument();
		expect(screen.getByText('Something went wrong')).toBeInTheDocument();
	});

	it('info variant applies border-l-primary', () => {
		const { container } = render(Alert, { props: { title: 'Info', variant: 'info' } });
		const div = container.querySelector('[class*="border-l-4"]');
		expect(div?.className).toContain('border-l-primary');
	});

	it('warning variant applies border-l-warning', () => {
		const { container } = render(Alert, { props: { title: 'Warning', variant: 'warning' } });
		const div = container.querySelector('[class*="border-l-4"]');
		expect(div?.className).toContain('border-l-[--warning]');
	});

	it('destructive variant applies border-l-destructive', () => {
		const { container } = render(Alert, { props: { title: 'Error', variant: 'destructive' } });
		const div = container.querySelector('[class*="border-l-4"]');
		expect(div?.className).toContain('border-l-destructive');
	});
});
