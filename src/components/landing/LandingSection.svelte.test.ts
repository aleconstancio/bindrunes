import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import LandingSection from './LandingSection.svelte';

describe('LandingSection', () => {
	it('renders a section element', () => {
		const { container } = render(LandingSection, {});
		expect(container.querySelector('section')).not.toBeNull();
	});

	it('applies id when provided', () => {
		const { container } = render(LandingSection, { id: 'features' });
		expect(container.querySelector('section')?.id).toBe('features');
	});

	it('applies class prop', () => {
		const { container } = render(LandingSection, { class: 'custom' });
		expect(container.firstElementChild?.className).toContain('custom');
	});

	it('applies max-width classes via MetaContainer', () => {
		const { container } = render(LandingSection, { maxWidth: '4xl' });
		expect(container.querySelector('section')?.innerHTML).toContain('max-w-[var(--container-lg)]');
	});

	it('uses 7xl max width via MetaContainer', () => {
		const { container } = render(LandingSection, { maxWidth: '7xl' });
		expect(container.querySelector('section')?.innerHTML).toContain('max-w-[var(--container-2xl)]');
	});

	it('uses full max width via MetaContainer', () => {
		const { container } = render(LandingSection, { maxWidth: 'full' });
		expect(container.querySelector('section')?.innerHTML).toContain('max-w-full');
	});

	it('uses default 6xl max width via MetaContainer', () => {
		const { container } = render(LandingSection, {});
		expect(container.querySelector('section')?.innerHTML).toContain('max-w-[var(--container-xl)]');
	});
});
