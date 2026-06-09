import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import MetaContainer from './MetaContainer.svelte';
import { expectNoAxeViolations } from '../helpers/axe';

describe('MetaContainer', () => {
  it('renders with default size="2xl" using container-2xl token', () => {
    const { container } = render(MetaContainer);
    const el = container.querySelector('[class*="container-2xl"]');
    expect(el).toBeTruthy();
  });

  it('renders prose size', () => {
    const { container } = render(MetaContainer, { props: { size: 'prose' } });
    const el = container.querySelector('[class*="container-prose"]');
    expect(el).toBeTruthy();
  });

  it('renders full width when size="full"', () => {
    const { container } = render(MetaContainer, { props: { size: 'full' } });
    const el = container.querySelector('.max-w-full');
    expect(el).toBeTruthy();
  });

  it('applies padding by default', () => {
    const { container } = render(MetaContainer);
    const el = container.querySelector('.px-6');
    expect(el).toBeTruthy();
  });

  it('removes padding when padding=false', () => {
    const { container } = render(MetaContainer, { props: { padding: false } });
    const el = container.querySelector('.px-6');
    expect(el).toBeNull();
  });

  it('has no a11y violations', async () => {
    const { container } = render(MetaContainer);
    await expectNoAxeViolations(container);
  });
});
