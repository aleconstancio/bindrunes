import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import ThemePreview from './ThemePreview.svelte';

describe('ThemePreview', () => {
	it('renders the Preview heading', () => {
		render(ThemePreview);
		expect(screen.getByText('Preview')).toBeInTheDocument();
	});

	it('renders all four button variants', () => {
		render(ThemePreview);
		expect(screen.getAllByText('Primary').length).toBeGreaterThan(0);
		expect(screen.getByText('Secondary')).toBeInTheDocument();
		expect(screen.getByText('Outline')).toBeInTheDocument();
		expect(screen.getByText('Destructive')).toBeInTheDocument();
	});

	it('renders the sample input', () => {
		render(ThemePreview);
		const input = screen.getByPlaceholderText('Type here...');
		expect(input).toBeInTheDocument();
	});

	it('renders all badge variants', () => {
		render(ThemePreview);
		expect(screen.getByText('Default')).toBeInTheDocument();
		expect(screen.getAllByText('Primary').length).toBeGreaterThan(0);
		expect(screen.getByText('Success')).toBeInTheDocument();
		expect(screen.getByText('Warning')).toBeInTheDocument();
	});

	it('renders the alert title and description', () => {
		render(ThemePreview);
		expect(screen.getByText('Alert Title')).toBeInTheDocument();
		expect(screen.getByText('This is a sample alert with the generated theme.')).toBeInTheDocument();
	});

	it('uses foreground color for the heading', () => {
		const { container } = render(ThemePreview);
		const heading = container.querySelector('h3');
		expect(heading?.getAttribute('style')).toContain('--foreground');
	});
});
