import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import DashboardShell from '../../src/components/dashboard/DashboardShell.svelte';

describe('DashboardShell', () => {
  it('renders with children', () => {
    const { container } = render(DashboardShell, {
      slots: { children: 'Dashboard content' },
    });
    expect(container).toBeInTheDocument();
  });

  it('renders main element', () => {
    const { container } = render(DashboardShell, {
      slots: { children: 'Content' },
    });
    expect(container.querySelector('main')).toBeInTheDocument();
  });
});
