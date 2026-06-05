import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import RuleFootnote from '../../src/components/RuleFootnote.svelte';

describe('RuleFootnote', () => {
	it('renders default title', () => {
		render(RuleFootnote);
		expect(screen.getByText('Regra Crítica')).toBeInTheDocument();
	});

	it('renders custom title', () => {
		render(RuleFootnote, { title: 'Custom Rule' });
		expect(screen.getByText('Custom Rule')).toBeInTheDocument();
	});

	it('renders description', () => {
		render(RuleFootnote, { description: 'This rule applies to all cases.' });
		expect(screen.getByText('This rule applies to all cases.')).toBeInTheDocument();
	});

	it('renders without description when omitted', () => {
		render(RuleFootnote, { title: 'Rule' });
		expect(screen.getByText('Rule')).toBeInTheDocument();
	});
});
