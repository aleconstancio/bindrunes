import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import TeamSection from './TeamSection.svelte';
import type { TeamMember } from './landing-types';

const members: TeamMember[] = [
	{ name: 'Alice', role: 'CEO', bio: 'Founder' },
	{ name: 'Bob', role: 'CTO' },
];

describe('TeamSection', () => {
	it('renders the section', () => {
		const { container } = render(TeamSection, { members });
		expect(container.firstElementChild?.className).toContain('section-reveal');
	});

	it('renders title when provided', () => {
		render(TeamSection, { members, title: 'Our Team' });
		expect(screen.getByText('Our Team')).toBeInTheDocument();
	});

	it('renders each member name', () => {
		render(TeamSection, { members });
		expect(screen.getByText('Alice')).toBeInTheDocument();
		expect(screen.getByText('Bob')).toBeInTheDocument();
	});

	it('renders each member role', () => {
		render(TeamSection, { members });
		expect(screen.getByText('CEO')).toBeInTheDocument();
		expect(screen.getByText('CTO')).toBeInTheDocument();
	});

	it('renders bio when provided', () => {
		render(TeamSection, { members });
		expect(screen.getByText('Founder')).toBeInTheDocument();
	});

	it('renders social links with aria-labels', () => {
		const { container } = render(TeamSection, {
			members: [
				{
					name: 'A',
					role: 'B',
					social: [
						{ icon: 'twitter', href: '/tw', label: 'Twitter' },
						{ icon: 'gh', href: '/gh', label: 'GitHub' },
					],
				},
			],
		});
		expect(container.querySelector('a[aria-label="Twitter"]')).not.toBeNull();
		expect(container.querySelector('a[aria-label="GitHub"]')).not.toBeNull();
	});

	it('applies class prop', () => {
		const { container } = render(TeamSection, { members, class: 'custom' });
		expect(container.firstElementChild?.className).toContain('custom');
	});
});
