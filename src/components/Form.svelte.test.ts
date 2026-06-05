import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Form from '../../src/components/Form.svelte';

describe('Form', () => {
  it('renders a form element', () => {
    const { container } = render(Form, {
      t: (k: string) => k,
      slots: { children: 'Form fields' },
    });
    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();
  });

  it('renders submit button with label', () => {
    render(Form, {
      t: (k: string) => k,
      submitLabel: 'Enviar',
      slots: { children: 'Form fields' },
    });
    expect(screen.getByText('Enviar')).toBeInTheDocument();
  });
});
