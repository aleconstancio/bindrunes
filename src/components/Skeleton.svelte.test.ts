import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Skeleton from '../../src/components/Skeleton.svelte';

describe('Skeleton', () => {
	it('renders default 3 lines', () => {
		const { container } = render(Skeleton);
		const divs = container.querySelectorAll('[class*="bg-muted"]');
		expect(divs.length).toBe(3);
	});

	it('renders custom line count', () => {
		const { container } = render(Skeleton, { props: { lines: 5 } });
		const divs = container.querySelectorAll('[class*="bg-muted"]');
		expect(divs.length).toBe(5);
	});

	it('applies width prop', () => {
		const { container } = render(Skeleton, { props: { width: '50%' } });
		const div = container.querySelector('[style*="width:"]');
		expect(div?.getAttribute('style')).toContain('50%');
	});
});
