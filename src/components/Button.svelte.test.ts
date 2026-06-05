import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Button from '../../src/components/Button.svelte';

describe('Button', () => {
	it('renders a button element by default', () => {
		const { container } = render(Button);
		const btn = container.querySelector('button');
		expect(btn).toBeInTheDocument();
	});

	it('renders as anchor when href is given', () => {
		const { container } = render(Button, { props: { href: '/test' } });
		const link = container.querySelector('a');
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', '/test');
	});

	it('fires onclick handler on button', async () => {
		const fn = vi.fn();
		const { container } = render(Button, { props: { onclick: fn } });
		await userEvent.click(container.querySelector('button')!);
		expect(fn).toHaveBeenCalledOnce();
	});

	it('disabled prevents click', async () => {
		const fn = vi.fn();
		const { container } = render(Button, { props: { disabled: true, onclick: fn } });
		await userEvent.click(container.querySelector('button')!);
		expect(fn).not.toHaveBeenCalled();
	});

	it('loading shows spinner', () => {
		const { container } = render(Button, { props: { loading: true } });
		expect(container.querySelector('.animate-spin')).toBeInTheDocument();
	});

	it('variant applies correct classes', () => {
		const { container } = render(Button, { props: { variant: 'outline' } });
		const btn = container.querySelector('button')!;
		expect(btn.className).toContain('bg-transparent');
	});

	it('fullWidth adds w-full class', () => {
		const { container } = render(Button, { props: { fullWidth: true } });
		const btn = container.querySelector('button')!;
		expect(btn.className).toContain('w-full');
	});

	it('renders with data-loading attribute when loading', () => {
		const { container } = render(Button, { props: { loading: true } });
		const btn = container.querySelector('button')!;
		expect(btn.getAttribute('data-loading')).toBe('true');
	});
});
