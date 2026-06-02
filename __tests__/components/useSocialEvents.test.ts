import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

describe('useSocialEvents composable', () => {
  const composablePath = resolve(process.cwd(), '../../apps/thoth-web/src/lib/composables/useSocialEvents.svelte.ts');

  it('exists as a source file', () => {
    expect(existsSync(composablePath)).toBe(true);
  });

  it('exports useSocialEvents function', () => {
    const content = readFileSync(composablePath, 'utf-8');
    expect(content).toContain('export function useSocialEvents');
  });
});
