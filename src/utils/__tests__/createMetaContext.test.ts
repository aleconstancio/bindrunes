import { describe, it, expect } from 'vitest';
import { createMetaContext, useMetaContext } from '../createMetaContext.svelte';

describe('createMetaContext', () => {
  it('exports createMetaContext function', () => {
    expect(typeof createMetaContext).toBe('function');
  });

  it('exports useMetaContext function', () => {
    expect(typeof useMetaContext).toBe('function');
  });
});
