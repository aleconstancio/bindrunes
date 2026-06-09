import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import ThemeBuilder from './ThemeBuilder.svelte';

describe('ThemeBuilder', () => {
	it('renders without crashing', () => {
		const { container } = render(ThemeBuilder);
		expect(container).toBeInTheDocument();
	});

	it('renders the Theme studio tab buttons', () => {
		render(ThemeBuilder);
		expect(screen.getByText('Theme')).toBeInTheDocument();
		expect(screen.getByText('Aesthetic')).toBeInTheDocument();
		expect(screen.getByText('Density')).toBeInTheDocument();
		expect(screen.getByText('Export')).toBeInTheDocument();
	});
});
