import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createWebSocketSession } from "./websocket.svelte";

class MockWebSocket {
	static instances: MockWebSocket[] = [];
	static OPEN = 1;
	static CLOSED = 3;
	url: string;
	onopen: (() => void) | null = null;
	onmessage: ((event: { data: string }) => void) | null = null;
	onclose: (() => void) | null = null;
	onerror: ((error: Event) => void) | null = null;
	readyState = 0;
	sent: string[] = [];

	constructor(url: string) {
		this.url = url;
		MockWebSocket.instances.push(this);
	}

	open() {
		this.readyState = MockWebSocket.OPEN;
		this.onopen?.();
	}

	message(data: string) {
		this.onmessage?.({ data });
	}

	close() {
		this.readyState = MockWebSocket.CLOSED;
		this.onclose?.();
	}

	error() {
		this.onerror?.(new Event("error"));
	}

	send(data: string) {
		this.sent.push(data);
	}
}

describe("createWebSocketSession", () => {
	beforeEach(() => {
		MockWebSocket.instances = [];
		// @ts-expect-error mock
		globalThis.WebSocket = MockWebSocket;
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("initializes with disconnected status", () => {
		const session = createWebSocketSession({ url: "ws://localhost" });
		expect(session.status).toBe("disconnected");
		expect(session.isConnected).toBe(false);
		expect(session.retryCount).toBe(0);
	});

	it("connect sets status to connected on open", () => {
		const onOpen = vi.fn();
		const session = createWebSocketSession({
			url: "ws://localhost",
			onOpen,
		});

		session.connect();
		expect(session.status).toBe("connecting");

		const ws = MockWebSocket.instances[0];
		ws.open();

		expect(session.status).toBe("connected");
		expect(session.isConnected).toBe(true);
		expect(onOpen).toHaveBeenCalled();
	});

	it("disconnect sets status to disconnected", () => {
		const session = createWebSocketSession({ url: "ws://localhost" });
		session.connect();

		const ws = MockWebSocket.instances[0];
		ws.open();
		expect(session.status).toBe("connected");

		session.disconnect();
		expect(session.status).toBe("disconnected");
	});

	it("send delivers data when connected", () => {
		const session = createWebSocketSession({ url: "ws://localhost" });
		session.connect();

		const ws = MockWebSocket.instances[0];
		ws.open();
		session.send({ type: "ping" });

		expect(ws.sent).toEqual([JSON.stringify({ type: "ping" })]);
	});

	it("send queues data when not connected", () => {
		const session = createWebSocketSession({ url: "ws://localhost" });
		session.send({ type: "queued" });
		session.connect();

		const ws = MockWebSocket.instances[0];
		ws.open();

		expect(ws.sent).toEqual([JSON.stringify({ type: "queued" })]);
	});

	it("onMessage fires on incoming message", () => {
		const onMessage = vi.fn();
		const session = createWebSocketSession({
			url: "ws://localhost",
			onMessage,
		});

		session.connect();
		const ws = MockWebSocket.instances[0];
		ws.open();
		ws.message(JSON.stringify({ type: "event" }));

		expect(onMessage).toHaveBeenCalledWith({ type: "event" });
	});

	it("onClose fires on close", () => {
		const onClose = vi.fn();
		const session = createWebSocketSession({
			url: "ws://localhost",
			reconnect: false,
			onClose,
		});

		session.connect();
		const ws = MockWebSocket.instances[0];
		ws.open();
		ws.close();

		expect(onClose).toHaveBeenCalled();
		expect(session.status).toBe("disconnected");
	});

	it("destroy alias disconnects", () => {
		const session = createWebSocketSession({ url: "ws://localhost" });
		session.connect();
		session.destroy();
		expect(session.status).toBe("disconnected");
	});
});
