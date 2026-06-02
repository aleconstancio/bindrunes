import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Suspense from '../../src/components/Suspense.svelte';

describe('Suspense', () => {
	it('shows loading state by default', () => {
		render(Suspense, {
			state: { status: 'loading' },
		});
		const spinner = document.querySelector('.animate-spin');
		expect(spinner).toBeInTheDocument();
	});

	it('shows empty state with reload button', () => {
		render(Suspense, {
			state: { status: 'empty' },
		});
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('shows error state with reload button', () => {
		render(Suspense, {
			state: { status: 'error', error: new Error('Oops') },
		});
		expect(screen.getByRole('button')).toBeInTheDocument();
	});
});
