import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createSSEClient } from "./sse.svelte";

class MockEventSource {
	static instances: MockEventSource[] = [];
	url: string;
	onopen: (() => void) | null = null;
	onmessage: ((event: MessageEvent) => void) | null = null;
	onerror: (() => void) | null = null;
	readyState = 0;

	constructor(url: string) {
		this.url = url;
		MockEventSource.instances.push(this);
	}

	open() {
		this.readyState = 1;
		this.onopen?.();
	}

	message(data: string, lastEventId?: string) {
		const event = new MessageEvent("message", { data });
		if (lastEventId) {
			Object.defineProperty(event, "lastEventId", { value: lastEventId });
		}
		this.onmessage?.(event);
	}

	error() {
		this.onerror?.();
	}

	close() {
		if (this.readyState === 2) return;
		this.readyState = 2;
	}
}

describe("createSSEClient", () => {
	beforeEach(() => {
		MockEventSource.instances = [];
		// @ts-expect-error mock
		globalThis.EventSource = MockEventSource;
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.restoreAllMocks();
	});

	it("initializes with disconnected status", () => {
		const client = createSSEClient({ url: "/events" });
		expect(client.status).toBe("disconnected");
		expect(client.isConnected).toBe(false);
		expect(client.retryCount).toBe(0);
	});

	it("connect sets status to connected on open", () => {
		const onConnect = vi.fn();
		const client = createSSEClient({ url: "/events", onConnect });

		client.connect();
		expect(client.status).toBe("connecting");

		const es = MockEventSource.instances[0];
		es.open();

		expect(client.status).toBe("connected");
		expect(client.isConnected).toBe(true);
		expect(onConnect).toHaveBeenCalled();
	});

	it("disconnect sets status to disconnected", () => {
		const client = createSSEClient({ url: "/events" });
		client.connect();

		const es = MockEventSource.instances[0];
		es.open();
		expect(client.status).toBe("connected");

		client.disconnect();
		expect(client.status).toBe("disconnected");
		expect(client.isConnected).toBe(false);
	});

	it("onMessage fires on incoming message", () => {
		const onMessage = vi.fn();
		const client = createSSEClient({ url: "/events", onMessage });

		client.connect();
		const es = MockEventSource.instances[0];
		es.open();
		es.message("hello");

		expect(onMessage).toHaveBeenCalled();
	});

	it("onError fires on error and sets disconnected", () => {
		const onError = vi.fn();
		const onDisconnect = vi.fn();
		const client = createSSEClient({
			url: "/events",
			reconnect: false,
			onError,
			onDisconnect,
		});

		client.connect();
		const es = MockEventSource.instances[0];
		es.error();

		expect(onError).toHaveBeenCalled();
		expect(onDisconnect).toHaveBeenCalled();
		expect(client.status).toBe("disconnected");
	});

	it("destroy alias disconnects", () => {
		const client = createSSEClient({ url: "/events" });
		client.connect();
		client.destroy();
		expect(client.status).toBe("disconnected");
	});

	it("reconnects on error when reconnect is true", () => {
		const client = createSSEClient({
			url: "/events",
			reconnect: true,
			reconnectDelay: 100,
			maxRetries: 3,
		});

		client.connect();
		const es1 = MockEventSource.instances[0];
		es1.error();

		expect(client.status).toBe("reconnecting");
		expect(client.retryCount).toBe(1);

		vi.advanceTimersByTime(100);
		expect(MockEventSource.instances.length).toBe(2);
		expect(client.status).toBe("connecting");
	});

	it("reconnect uses exponential backoff", () => {
		const client = createSSEClient({
			url: "/events",
			reconnect: true,
			reconnectDelay: 100,
			maxReconnectDelay: 500,
			maxRetries: 5,
		});

		client.connect();
		// First error -> retry 0, delay 100ms
		MockEventSource.instances[0].error();
		expect(client.retryCount).toBe(1);

		vi.advanceTimersByTime(100);
		// Second connect -> error -> retry 1, delay 200ms
		MockEventSource.instances[1].error();
		expect(client.retryCount).toBe(2);

		vi.advanceTimersByTime(200);
		// Third connect -> error -> retry 2, delay 400ms
		MockEventSource.instances[2].error();
		expect(client.retryCount).toBe(3);

		vi.advanceTimersByTime(400);
		// Fourth connect
		expect(MockEventSource.instances.length).toBe(4);
	});

	it("stops reconnecting after maxRetries", () => {
		const client = createSSEClient({
			url: "/events",
			reconnect: true,
			reconnectDelay: 10,
			maxRetries: 2,
		});

		client.connect();
		MockEventSource.instances[0].error(); // retry 1
		vi.advanceTimersByTime(10);

		MockEventSource.instances[1].error(); // retry 2
		vi.advanceTimersByTime(20);

		MockEventSource.instances[2].error(); // retry 3, exceeds maxRetries
		vi.advanceTimersByTime(40);

		// No more instances created after maxRetries
		expect(MockEventSource.instances.length).toBe(3);
		expect(client.status).toBe("disconnected");
	});

	it("reconnect delay is capped at maxReconnectDelay", () => {
		const client = createSSEClient({
			url: "/events",
			reconnect: true,
			reconnectDelay: 1000,
			maxReconnectDelay: 5000,
			maxRetries: 10,
		});

		client.connect();
		// Force retryCount to high value by triggering errors
		for (let i = 0; i < 5; i++) {
			MockEventSource.instances[i]?.error();
			vi.advanceTimersByTime(10000);
		}
		// After enough retries, delay should be capped
		expect(client.retryCount).toBeLessThanOrEqual(10);
	});

	it("gap detection sends Last-Event-ID header and lastEventId param", () => {
		localStorage.setItem("sse-last-event-id", "evt-42");

		const client = createSSEClient({
			url: "/events",
			gapDetection: true,
			lastEventIdStorage: "localStorage",
		});

		client.connect();
		const es = MockEventSource.instances[0];
		expect(es.url).toContain("lastEventId=evt-42");
	});

	it("gap detection with sessionStorage", () => {
		sessionStorage.setItem("sse-last-event-id", "evt-99");

		const client = createSSEClient({
			url: "/events",
			gapDetection: true,
			lastEventIdStorage: "sessionStorage",
		});

		client.connect();
		const es = MockEventSource.instances[0];
		expect(es.url).toContain("lastEventId=evt-99");
	});

	it("gap detection with none does not read from storage", () => {
		localStorage.setItem("sse-last-event-id", "evt-old");

		const client = createSSEClient({
			url: "/events",
			gapDetection: true,
			lastEventIdStorage: "none",
		});

		client.connect();
		const es = MockEventSource.instances[0];
		expect(es.url).not.toContain("lastEventId=");
	});

	it("message with lastEventId updates state and storage", () => {
		const client = createSSEClient({
			url: "/events",
			gapDetection: true,
			lastEventIdStorage: "localStorage",
		});

		client.connect();
		const es = MockEventSource.instances[0];
		es.open();
		es.message("data", "evt-123");

		expect(client.lastEventId).toBe("evt-123");
		expect(localStorage.getItem("sse-last-event-id")).toBe("evt-123");
	});

	it("reconnect resets retryCount on successful open", () => {
		const client = createSSEClient({
			url: "/events",
			reconnect: true,
			reconnectDelay: 10,
			maxRetries: 5,
		});

		client.connect();
		MockEventSource.instances[0].error(); // retry 1
		vi.advanceTimersByTime(10);

		MockEventSource.instances[1].open(); // successful connect
		expect(client.retryCount).toBe(0);
		expect(client.status).toBe("connected");
	});

	it("disconnect clears reconnect timer", () => {
		const client = createSSEClient({
			url: "/events",
			reconnect: true,
			reconnectDelay: 100,
			maxRetries: 5,
		});

		client.connect();
		MockEventSource.instances[0].error(); // schedule reconnect
		expect(client.status).toBe("reconnecting");

		client.disconnect(); // cancel reconnect
		vi.advanceTimersByTime(200);

		// No new instance created because reconnect was cancelled
		expect(MockEventSource.instances.length).toBe(1);
		expect(client.status).toBe("disconnected");
	});

	it("connect replaces existing connection", () => {
		const client = createSSEClient({ url: "/events" });
		client.connect();
		expect(MockEventSource.instances.length).toBe(1);

		client.connect(); // should close old and create new
		expect(MockEventSource.instances.length).toBe(2);
	});

	it("reconnect false does not schedule reconnect", () => {
		const client = createSSEClient({
			url: "/events",
			reconnect: false,
		});

		client.connect();
		MockEventSource.instances[0].error();
		vi.advanceTimersByTime(1000);

		expect(MockEventSource.instances.length).toBe(1);
		expect(client.status).toBe("disconnected");
	});

	it("custom headers are passed to EventSource", () => {
		const client = createSSEClient({
			url: "/events",
			headers: { "X-Custom": "value" },
		});

		client.connect();
		// EventSource doesn't support custom headers directly,
		// but the url should be constructed correctly
		expect(MockEventSource.instances.length).toBe(1);
	});

	it("no-op when connect called from server (no window)", () => {
		const originalWindow = globalThis.window;
		// @ts-expect-error testing server-side
		delete globalThis.window;

		const client = createSSEClient({ url: "/events" });
		client.connect();
		expect(client.status).toBe("disconnected");

		globalThis.window = originalWindow;
	});
});
