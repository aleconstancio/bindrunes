import type { CreateSSEClientOptions } from "bindrunes-kit/client";
import { createSSEClient } from "bindrunes-kit/client";

type EventCallback<T = unknown> = (data: T) => void;

interface RealtimeChannel {
	subscribe: <T = unknown>(event: string, callback: EventCallback<T>) => () => void;
	unsubscribe: (event: string) => void;
	close: () => void;
	reconnect: () => void;
	status: ReturnType<typeof createSSEClient>["status"];
}

export function createRealtime(url: string, options?: Partial<CreateSSEClientOptions>): RealtimeChannel {
	const listeners = new Map<string, Set<EventCallback>>();
	const unsubscribers = new Map<string, () => void>();

	const sse = createSSEClient({
		url,
		reconnect: true,
		reconnectDelay: 1000,
		maxReconnectDelay: 30_000,
		gapDetection: true,
		...options,
		onMessage(event) {
			const eventType = event.type || "message";
			const callbacks = listeners.get(eventType);
			if (callbacks) {
				let data: unknown;
				try {
					data = JSON.parse(event.data);
				} catch {
					data = event.data;
				}
				callbacks.forEach((cb) => cb(data));
			}

			const allCallbacks = listeners.get("*");
			if (allCallbacks) {
				allCallbacks.forEach((cb) => cb({ type: eventType, data: event.data }));
			}
		},
	});

	function subscribe<T = unknown>(event: string, callback: EventCallback<T>): () => void {
		if (!listeners.has(event)) {
			listeners.set(event, new Set());
		}
		listeners.get(event)!.add(callback as EventCallback);

		if (sse.status === "disconnected") {
			sse.connect();
		}

		return () => {
			listeners.get(event)?.delete(callback as EventCallback);
			if (listeners.get(event)?.size === 0) {
				listeners.delete(event);
			}
		};
	}

	function unsubscribe(event: string) {
		listeners.delete(event);
	}

	function close() {
		listeners.clear();
		unsubscribers.forEach((unsub) => unsub());
		unsubscribers.clear();
		sse.disconnect();
	}

	function reconnect() {
		sse.connect();
	}

	return {
		subscribe,
		unsubscribe,
		close,
		reconnect,
		status: sse.status,
	};
}
