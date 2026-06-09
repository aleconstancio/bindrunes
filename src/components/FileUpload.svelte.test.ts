import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import FileUpload from '../../src/components/FileUpload.svelte';

describe('FileUpload', () => {
  it('renders dropzone text', () => {
    render(FileUpload);
    expect(screen.getByText(/Drag files here/)).toBeInTheDocument();
  });

  it('has hidden file input', () => {
    render(FileUpload);
    const input = document.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('class', 'hidden');
  });

  it('has correct role on dropzone', () => {
    render(FileUpload);
    const dropzone = screen.getByRole('button');
    expect(dropzone).toBeInTheDocument();
  });

  it('has tabindex on dropzone', () => {
    render(FileUpload);
    const dropzone = screen.getByRole('button');
    expect(dropzone).toHaveAttribute('tabindex', '0');
  });
});
