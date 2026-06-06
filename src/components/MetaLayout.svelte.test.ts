import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import MetaLayout from './MetaLayout.svelte';
import { expectNoAxeViolations } from '../helpers/axe';

describe('MetaLayout', () => {
  it('renders content position by default', () => {
    const { container } = render(MetaLayout);
    const el = container.querySelector('.flex-1');
    expect(el).toBeTruthy();
  });

  it('renders header position with flex-shrink-0', () => {
    const { container } = render(MetaLayout, { props: { position: 'header' } });
    const el = container.querySelector('.flex-shrink-0');
    expect(el).toBeTruthy();
  });

  it('renders footer position with border-t', () => {
    const { container } = render(MetaLayout, { props: { position: 'footer' } });
    const el = container.querySelector('.border-t');
    expect(el).toBeTruthy();
  });

  it('renders separator position with role separator', () => {
    const { container } = render(MetaLayout, { props: { position: 'separator' } });
    const el = container.querySelector('[role="separator"]');
    expect(el).toBeTruthy();
  });

  it('has no a11y violations', async () => {
    const { container } = render(MetaLayout);
    await expectNoAxeViolations(container);
  });
});
