import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import ErrorBoundary from '../../src/components/ErrorBoundary.svelte';

describe('ErrorBoundary', () => {
  it('renders slot content when no error', () => {
    const { container } = render(ErrorBoundary, {
      slots: { children: 'Content' },
    });
    expect(container).toBeInTheDocument();
  });

  it('renders fallback UI when error event fires', async () => {
    const { container } = render(ErrorBoundary, {
      slots: { children: 'Content' },
    });
    window.dispatchEvent(new ErrorEvent('error', { message: 'Test error' }));
    await vi.waitFor(() => {
      expect(container.querySelector('h2')).toBeInTheDocument();
    });
  });
});
