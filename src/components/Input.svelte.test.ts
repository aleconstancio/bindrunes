import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Input from '../../src/components/Input.svelte';

describe('Input', () => {
	it('renders with label', () => {
		render(Input, { props: { label: 'Name' } });
		expect(screen.getByText('Name')).toBeInTheDocument();
	});

	it('shows placeholder', () => {
		render(Input, { props: { placeholder: 'Enter name' } });
		expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
	});

	it('shows error message', () => {
		render(Input, { props: { error: 'Required field' } });
		expect(screen.getByText('Required field')).toBeInTheDocument();
	});

	it('hides helper when error is present', () => {
		render(Input, { props: { helper: 'Helper text', error: 'Error text' } });
		expect(screen.getByText('Error text')).toBeInTheDocument();
		expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
	});

	it('renders textarea when type is textarea', () => {
		render(Input, { props: { type: 'textarea', placeholder: 'Bio' } });
		const textarea = screen.getByPlaceholderText('Bio');
		expect(textarea.tagName).toBe('TEXTAREA');
	});

	it('disables input', () => {
		render(Input, { props: { disabled: true, placeholder: 'Disabled' } });
		expect(screen.getByPlaceholderText('Disabled')).toBeDisabled();
	});

	it('required shows asterisk on label', () => {
		render(Input, { props: { label: 'Email', required: true } });
		expect(screen.getByText('*')).toBeInTheDocument();
	});
});
