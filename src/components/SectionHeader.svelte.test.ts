import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import SectionHeader from '../../src/components/SectionHeader.svelte';

describe('SectionHeader', () => {
	it('renders the label text', () => {
		render(SectionHeader, { label: 'Settings' });
		expect(screen.getByText('Settings')).toBeInTheDocument();
	});

	it('renders with empty label', () => {
		render(SectionHeader);
		const span = document.querySelector('span');
		expect(span).toBeInTheDocument();
	});
});
