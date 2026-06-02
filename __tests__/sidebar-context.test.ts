import { describe, it, expect, beforeEach } from 'vitest';

// Sidebar context must be tested within a Svelte component using the context
// These tests verify the module can be imported and the factory functions exist

describe('sidebar-context', () => {
  it('can be imported without error', async () => {
    const mod = await import('../src/components/sidebar/sidebar-context.svelte.ts');
    expect(mod.createSidebarState).toBeDefined();
    expect(mod.setSidebarContext).toBeDefined();
    expect(mod.getSidebarContext).toBeDefined();
  });
});
