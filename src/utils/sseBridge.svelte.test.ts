import { describe, it, expect, beforeEach, vi } from 'vitest';
import { handleSSEEvent, DEFAULT_SSE_ROUTES } from './sseBridge.svelte';

// Mock the query cache
vi.mock('./queryCache', () => ({
  invalidateQuery: vi.fn(),
}));

import { invalidateQuery } from './queryCache';

describe('handleSSEEvent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('invalidates correct cache key for event.created', () => {
    handleSSEEvent('event.created');
    expect(invalidateQuery).toHaveBeenCalledWith('/api/events');
  });

  it('invalidates correct cache key for event.promoted', () => {
    handleSSEEvent('event.promoted');
    expect(invalidateQuery).toHaveBeenCalledWith('/api/events');
  });

  it('invalidates correct cache key for dossier.updated', () => {
    handleSSEEvent('dossier.updated');
    expect(invalidateQuery).toHaveBeenCalledWith('/api/dossiers');
  });

  it('invalidates correct cache key for ingestion.update', () => {
    handleSSEEvent('ingestion.update');
    expect(invalidateQuery).toHaveBeenCalledWith('/api/ingestion');
  });

  it('invalidates correct cache key for audit.new', () => {
    handleSSEEvent('audit.new');
    expect(invalidateQuery).toHaveBeenCalledWith('/api/audit/logs');
  });

  it('does nothing for unknown event types', () => {
    handleSSEEvent('unknown.event');
    expect(invalidateQuery).not.toHaveBeenCalled();
  });

  it('uses custom routes when provided', () => {
    const customRoutes = { 'custom.event': '/api/custom' };
    handleSSEEvent('custom.event', customRoutes);
    expect(invalidateQuery).toHaveBeenCalledWith('/api/custom');
  });

  it('invalidates multiple keys for array routes', () => {
    const customRoutes = { 'multi.event': ['/api/a', '/api/b'] };
    handleSSEEvent('multi.event', customRoutes);
    expect(invalidateQuery).toHaveBeenCalledWith('/api/a');
    expect(invalidateQuery).toHaveBeenCalledWith('/api/b');
  });
});

describe('DEFAULT_SSE_ROUTES', () => {
  it('has all expected event type mappings', () => {
    expect(DEFAULT_SSE_ROUTES['event.created']).toBe('/api/events');
    expect(DEFAULT_SSE_ROUTES['event.promoted']).toBe('/api/events');
    expect(DEFAULT_SSE_ROUTES['dossier.updated']).toBe('/api/dossiers');
    expect(DEFAULT_SSE_ROUTES['ingestion.update']).toBe('/api/ingestion');
    expect(DEFAULT_SSE_ROUTES['audit.new']).toBe('/api/audit/logs');
  });
});
