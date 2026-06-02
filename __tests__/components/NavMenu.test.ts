import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import NavMenu from '../../src/components/dashboard/NavMenu.svelte';

describe('NavMenu', () => {
	const groups = [
		{
			label: 'Main',
			items: [
				{ title: 'Home', to: '/home', description: 'Go home', icon: '🏠' },
			],
		},
	];

	it('renders group labels', () => {
		render(NavMenu, { props: { groups } });
		expect(screen.getByText('Main')).toBeInTheDocument();
	});

	it('renders navigation items', () => {
		render(NavMenu, { props: { groups } });
		expect(screen.getByText('Home')).toBeInTheDocument();
	});
});
