import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Accordion from '../../src/components/Accordion.svelte';

describe('Accordion', () => {
  it('renders without crashing', () => {
    const { container } = render(Accordion);
    expect(container).toBeInTheDocument();
  });
});
