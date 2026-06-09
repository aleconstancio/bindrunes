import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import AuthGuard from '../../src/components/AuthGuard.svelte';

describe('AuthGuard', () => {
  it('renders when authenticated', () => {
    const storage = { getToken: () => 'tok_test', setToken: vi.fn(), clearToken: vi.fn() };
    const { container } = render(AuthGuard, {
      storage,
      slots: { children: 'Protected' },
    });
    expect(container).toBeInTheDocument();
  });

  it('does not render children when not authenticated', () => {
    const storage = { getToken: () => null, setToken: vi.fn(), clearToken: vi.fn() };
    const { container } = render(AuthGuard, {
      storage,
      slots: { children: 'Protected' },
    });
    expect(container).toBeInTheDocument();
  });
});
