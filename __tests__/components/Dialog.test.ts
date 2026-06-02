import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Dialog from '../../src/components/Dialog.svelte';

describe('Dialog', () => {
	it('renders title when open', () => {
		render(Dialog, { props: { open: true, title: 'Confirm' } });
		expect(screen.getByText('Confirm')).toBeInTheDocument();
	});

	it('renders dialog role element when open (in portal)', () => {
		render(Dialog, { props: { open: true } });
		// bits-ui uses portal, so dialog is in document body
		expect(document.querySelector('[role="dialog"]')).toBeInTheDocument();
	});

	it('does not render title when closed', () => {
		render(Dialog, { props: { open: false, title: 'Hidden' } });
		expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
	});
});
