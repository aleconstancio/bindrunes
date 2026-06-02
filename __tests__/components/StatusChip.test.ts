import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import StatusChip from '../../src/components/StatusChip.svelte';

describe('StatusChip', () => {
	it('renders label text', () => {
		render(StatusChip, { props: { label: 'Active' } });
		expect(screen.getByText('Active')).toBeInTheDocument();
	});

	it('success variant applies CSS custom property styles', () => {
		render(StatusChip, { props: { label: 'Online', variant: 'success' } });
		const el = screen.getByText('Online');
		expect(el.className).toContain('bg-[--success]');
	});

	it('danger variant applies destructive styles', () => {
		render(StatusChip, { props: { label: 'Offline', variant: 'danger' } });
		const el = screen.getByText('Offline');
		expect(el.className).toContain('destructive');
	});

	it('info variant applies primary styles', () => {
		render(StatusChip, { props: { label: 'Info', variant: 'info' } });
		const el = screen.getByText('Info');
		expect(el.className).toContain('bg-primary');
	});

	it('renders dot when dot prop is true', () => {
		const { container } = render(StatusChip, { props: { label: 'Live', dot: true } });
		const dot = container.querySelector('.rounded-full');
		expect(dot).toBeInTheDocument();
	});

	it('adds animate-pulse when animate is true', () => {
		const { container } = render(StatusChip, { props: { label: 'Live', dot: true, animate: true } });
		expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
	});
});
