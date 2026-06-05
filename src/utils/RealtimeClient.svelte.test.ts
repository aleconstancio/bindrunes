import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { RealtimeClient } from './RealtimeClient.svelte';

vi.mock('@microsoft/fetch-event-source', () => ({
  fetchEventSource: vi.fn(),
}));

describe('RealtimeClient', () => {
  let client: RealtimeClient;
  let onEvent: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    onEvent = vi.fn();
    client = new RealtimeClient({ url: '/test', onEvent });
  });

  afterEach(() => {
    client.disconnect();
  });

  it('initializes with disconnected status and no gap', () => {
    expect(client.status).toBe('disconnected');
    expect(client.hasGap).toBe(false);
  });

  describe('connect/disconnect', () => {
    it('transitions to reconnecting on connect, then connected on success', async () => {
      const { fetchEventSource } = await import('@microsoft/fetch-event-source');
      const mockFetch = vi.mocked(fetchEventSource);

      mockFetch.mockImplementationOnce((_url, opts) => {
        opts.onopen?.({ ok: true } as Response);
        return Promise.resolve();
      });

      expect(client.status).toBe('disconnected');
      await client.connect();
      expect(client.status).toBe('connected');
    });

    it('disconnect sets status to disconnected', async () => {
      const { fetchEventSource } = await import('@microsoft/fetch-event-source');
      const mockFetch = vi.mocked(fetchEventSource);

      mockFetch.mockImplementationOnce((_url, opts) => {
        opts.onopen?.({ ok: true } as Response);
        return Promise.resolve();
      });

      await client.connect();
      expect(client.status).toBe('connected');

      client.disconnect();
      expect(client.status).toBe('disconnected');
    });
  });

  describe('status transitions', () => {
    it('sets status to disconnected on 401 response', async () => {
      const { fetchEventSource } = await import('@microsoft/fetch-event-source');
      const mockFetch = vi.mocked(fetchEventSource);

      mockFetch.mockImplementationOnce(async (_url, opts) => {
        try {
          await opts.onopen?.({ ok: false, status: 401 } as Response);
        } catch {}
      });

      await client.connect();
      expect(client.status).toBe('disconnected');
    });

    it('sets status to disconnected on 403 response', async () => {
      const { fetchEventSource } = await import('@microsoft/fetch-event-source');
      const mockFetch = vi.mocked(fetchEventSource);

      mockFetch.mockImplementationOnce(async (_url, opts) => {
        try {
          await opts.onopen?.({ ok: false, status: 403 } as Response);
        } catch {}
      });

      await client.connect();
      expect(client.status).toBe('disconnected');
    });

    it('sets status to degraded on non-401 error response', async () => {
      const { fetchEventSource } = await import('@microsoft/fetch-event-source');
      const mockFetch = vi.mocked(fetchEventSource);

      mockFetch.mockImplementationOnce((_url, opts) => {
        opts.onopen?.({ ok: false, status: 500 } as Response);
        return Promise.resolve();
      });

      await client.connect();
      expect(client.status).toBe('degraded');
    });

    it('sets status to degraded on error callback', async () => {
      const { fetchEventSource } = await import('@microsoft/fetch-event-source');
      const mockFetch = vi.mocked(fetchEventSource);
      const onError = vi.fn();

      client = new RealtimeClient({ url: '/test', onEvent, onError });

      mockFetch.mockImplementationOnce((_url, opts) => {
        opts.onerror?.(new Error('stream error'));
        return Promise.resolve();
      });

      await client.connect();
      expect(client.status).toBe('degraded');
      expect(onError).toHaveBeenCalledWith(new Error('stream error'));
    });
  });

  describe('gap detection', () => {
    it('detects gap when seq jumps', async () => {
      const { fetchEventSource } = await import('@microsoft/fetch-event-source');
      const mockFetch = vi.mocked(fetchEventSource);

      mockFetch.mockImplementationOnce((_url, opts) => {
        opts.onopen?.({ ok: true } as Response);
        opts.onmessage?.({ id: '1', event: 'message', data: JSON.stringify({ seq: 1 }) } as any);
        opts.onmessage?.({ id: '3', event: 'message', data: JSON.stringify({ seq: 3 }) } as any);
        return Promise.resolve();
      });

      await client.connect();
      expect(client.hasGap).toBe(true);
    });

    it('does not detect gap when seq is sequential', async () => {
      const { fetchEventSource } = await import('@microsoft/fetch-event-source');
      const mockFetch = vi.mocked(fetchEventSource);

      mockFetch.mockImplementationOnce((_url, opts) => {
        opts.onopen?.({ ok: true } as Response);
        opts.onmessage?.({ id: '1', event: 'message', data: JSON.stringify({ seq: 1 }) } as any);
        opts.onmessage?.({ id: '2', event: 'message', data: JSON.stringify({ seq: 2 }) } as any);
        return Promise.resolve();
      });

      await client.connect();
      expect(client.hasGap).toBe(false);
    });

    it('detects gap on SYNC_GAP event type', async () => {
      const { fetchEventSource } = await import('@microsoft/fetch-event-source');
      const mockFetch = vi.mocked(fetchEventSource);

      mockFetch.mockImplementationOnce((_url, opts) => {
        opts.onopen?.({ ok: true } as Response);
        opts.onmessage?.({ id: '1', event: 'SYNC_GAP', data: JSON.stringify({}) } as any);
        return Promise.resolve();
      });

      await client.connect();
      expect(client.hasGap).toBe(true);
    });

    it('dismissGap resets hasGap to false', async () => {
      const { fetchEventSource } = await import('@microsoft/fetch-event-source');
      const mockFetch = vi.mocked(fetchEventSource);

      mockFetch.mockImplementationOnce((_url, opts) => {
        opts.onopen?.({ ok: true } as Response);
        opts.onmessage?.({ id: '1', event: 'message', data: JSON.stringify({ seq: 1 }) } as any);
        opts.onmessage?.({ id: '3', event: 'message', data: JSON.stringify({ seq: 3 }) } as any);
        return Promise.resolve();
      });

      await client.connect();
      expect(client.hasGap).toBe(true);

      client.dismissGap();
      expect(client.hasGap).toBe(false);
    });

    it('auto-clears gap after 5 seconds', async () => {
      vi.useFakeTimers();

      const { fetchEventSource } = await import('@microsoft/fetch-event-source');
      const mockFetch = vi.mocked(fetchEventSource);

      mockFetch.mockImplementationOnce((_url, opts) => {
        opts.onopen?.({ ok: true } as Response);
        opts.onmessage?.({ id: '1', event: 'message', data: JSON.stringify({ seq: 1 }) } as any);
        opts.onmessage?.({ id: '3', event: 'message', data: JSON.stringify({ seq: 3 }) } as any);
        return Promise.resolve();
      });

      await client.connect();
      expect(client.hasGap).toBe(true);

      vi.advanceTimersByTime(5000);
      expect(client.hasGap).toBe(false);

      vi.useRealTimers();
    });
  });

  describe('backoff reconnection', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('schedules reconnect on close with delay starting at 1s', async () => {
      const { fetchEventSource } = await import('@microsoft/fetch-event-source');
      const mockFetch = vi.mocked(fetchEventSource);
      const connectSpy = vi.spyOn(client, 'connect');

      mockFetch.mockImplementation((_url, opts) => {
        opts.onclose?.();
        return Promise.resolve();
      });

      await client.connect();
      expect(connectSpy).toHaveBeenCalledTimes(1);

      await vi.advanceTimersByTimeAsync(1999);
      expect(connectSpy).toHaveBeenCalledTimes(1);

      await vi.advanceTimersByTimeAsync(1);
      expect(connectSpy).toHaveBeenCalledTimes(2);
    });

    it('doubles retry delay up to max 30s', async () => {
      const { fetchEventSource } = await import('@microsoft/fetch-event-source');
      const mockFetch = vi.mocked(fetchEventSource);
      const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout');

      mockFetch.mockImplementation((_url, opts) => {
        opts.onclose?.();
        return Promise.resolve();
      });

      await client.connect();

      await vi.advanceTimersByTimeAsync(2000);
      await vi.advanceTimersByTimeAsync(4000);
      await vi.advanceTimersByTimeAsync(8000);
      await vi.advanceTimersByTimeAsync(16000);
      await vi.advanceTimersByTimeAsync(30000);
      await vi.advanceTimersByTimeAsync(30000);

      const calls = setTimeoutSpy.mock.calls.map(c => c[1] as number);
      expect(calls[0]).toBe(2000);
      expect(calls[1]).toBe(4000);
      expect(calls[2]).toBe(8000);
      expect(calls[3]).toBe(16000);
      expect(calls[4]).toBe(30000);
      expect(calls[5]).toBe(30000);
    });

    it('disconnect prevents reconnects after close', async () => {
      const { fetchEventSource } = await import('@microsoft/fetch-event-source');
      const mockFetch = vi.mocked(fetchEventSource);

      mockFetch.mockImplementation((_url, opts) => {
        opts.onclose?.();
        return Promise.resolve();
      });

      await client.connect();
      client.disconnect();

      await vi.advanceTimersByTimeAsync(100000);
      expect(client.status).toBe('disconnected');
    });
  });
});
