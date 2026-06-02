import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Card from '../../src/components/Card.svelte';

describe('Card', () => {
	it('renders without crashing', () => {
		const { container } = render(Card);
		const el = container.firstElementChild!;
		expect(el).toBeInTheDocument();
	});

	it('surface variant applies correct classes', () => {
		const { container } = render(Card, { props: { variant: 'surface' } });
		const el = container.firstElementChild!;
		expect(el.className).toContain('bg-card');
		expect(el.className).toContain('shadow-sm');
	});

	it('glass variant applies backdrop-blur', () => {
		const { container } = render(Card, { props: { variant: 'glass' } });
		expect(container.firstElementChild!.className).toContain('backdrop-blur');
	});

	it('outlined variant applies bg-transparent', () => {
		const { container } = render(Card, { props: { variant: 'outlined' } });
		expect(container.firstElementChild!.className).toContain('bg-transparent');
	});

	it('ghost variant applies bg-transparent', () => {
		const { container } = render(Card, { props: { variant: 'ghost' } });
		expect(container.firstElementChild!.className).toContain('bg-transparent');
	});

	it('custom class is merged', () => {
		const { container } = render(Card, { props: { class: 'my-custom-class' } });
		expect(container.firstElementChild!.className).toContain('my-custom-class');
	});
});
