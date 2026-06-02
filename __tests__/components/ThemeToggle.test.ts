import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import ThemeToggle from '../../src/components/ThemeToggle.svelte';

describe('ThemeToggle', () => {
  it('renders a button', () => {
    const { container } = render(ThemeToggle);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    const { container } = render(ThemeToggle);
    expect(container).toBeInTheDocument();
  });
});
