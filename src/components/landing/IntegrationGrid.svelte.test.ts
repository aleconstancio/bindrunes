import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import IntegrationGrid from './IntegrationGrid.svelte';
import type { Integration } from './landing-types';

const integrations: Integration[] = [
	{ icon: '🔗', title: 'Slack', description: 'Chat integration' },
	{ icon: '📊', title: 'GitHub', description: 'Code hosting', href: 'https://github.com' },
];

describe('IntegrationGrid', () => {
	it('renders section', () => {
		const { container } = render(IntegrationGrid, { integrations });
		expect(container.firstElementChild?.className).toContain('section-reveal');
	});

	it('renders title when provided', () => {
		render(IntegrationGrid, { integrations, title: 'Integrations' });
		expect(screen.getByText('Integrations')).toBeInTheDocument();
	});

	it('renders all integration titles', () => {
		render(IntegrationGrid, { integrations });
		expect(screen.getByText('Slack')).toBeInTheDocument();
		expect(screen.getByText('GitHub')).toBeInTheDocument();
	});

	it('renders all integration descriptions', () => {
		render(IntegrationGrid, { integrations });
		expect(screen.getByText('Chat integration')).toBeInTheDocument();
		expect(screen.getByText('Code hosting')).toBeInTheDocument();
	});

	it('renders link for integrations with href', () => {
		const { container } = render(IntegrationGrid, { integrations });
		const link = container.querySelector('a[href="https://github.com"]');
		expect(link).not.toBeNull();
	});

	it('renders div for integrations without href', () => {
		const { container } = render(IntegrationGrid, { integrations });
		const slackItem = Array.from(container.querySelectorAll('h3')).find((h) => h.textContent === 'Slack');
		expect(slackItem?.parentElement?.parentElement?.tagName).toBe('DIV');
	});

	it('applies class prop', () => {
		const { container } = render(IntegrationGrid, { integrations, class: 'custom' });
		expect(container.firstElementChild?.className).toContain('custom');
	});
});
