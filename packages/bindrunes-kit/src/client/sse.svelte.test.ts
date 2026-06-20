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
		this.readyState = 2;
	}
}

describe("createSSEClient", () => {
	beforeEach(() => {
		MockEventSource.instances = [];
		// @ts-expect-error mock
		globalThis.EventSource = MockEventSource;
	});

	afterEach(() => {
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
});
