type WebSocketStatus = "connecting" | "connected" | "disconnected" | "reconnecting";

interface CreateWebSocketSessionOptions {
	url: string;
	protocols?: string | string[];
	reconnect?: boolean;
	reconnectDelay?: number;
	maxReconnectDelay?: number;
	maxRetries?: number;
	onMessage?: (data: unknown) => void;
	onOpen?: () => void;
	onClose?: () => void;
	onError?: (error: Event) => void;
}

export function createWebSocketSession(options: CreateWebSocketSessionOptions) {
	const {
		url,
		protocols,
		reconnect = true,
		reconnectDelay = 1000,
		maxReconnectDelay = 30_000,
		maxRetries = 10,
		onMessage,
		onOpen,
		onClose,
		onError,
	} = options;

	let status = $state<WebSocketStatus>("disconnected");
	let retryCount = $state(0);

	let ws: WebSocket | null = null;
	let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
	let messageQueue: unknown[] = [];

	const isConnected = $derived(status === "connected");

	function connect() {
		if (typeof window === "undefined") return;
		if (ws) disconnect();
		status = "connecting";

		try {
			ws = new WebSocket(url, protocols);

			ws.onopen = () => {
				status = "connected";
				retryCount = 0;
				onOpen?.();
				while (messageQueue.length > 0) {
					const msg = messageQueue.shift();
					ws?.send(JSON.stringify(msg));
				}
			};

			ws.onmessage = (event) => {
				try {
					const data = JSON.parse(event.data);
					onMessage?.(data);
				} catch {
					onMessage?.(event.data);
				}
			};

			ws.onclose = () => {
				status = "disconnected";
				onClose?.();
				if (reconnect && retryCount < maxRetries) {
					scheduleReconnect();
				}
			};

			ws.onerror = (error) => {
				onError?.(error);
			};
		} catch (error) {
			status = "disconnected";
			onError?.(error as Event);
		}
	}

	function scheduleReconnect() {
		if (reconnectTimer) clearTimeout(reconnectTimer);
		const delay = Math.min(reconnectDelay * 2 ** retryCount, maxReconnectDelay);
		retryCount++;
		status = "reconnecting";
		reconnectTimer = setTimeout(connect, delay);
	}

	function send(data: unknown) {
		if (ws?.readyState === WebSocket.OPEN) {
			ws.send(JSON.stringify(data));
		} else {
			messageQueue.push(data);
		}
	}

	function disconnect() {
		if (reconnectTimer) {
			clearTimeout(reconnectTimer);
			reconnectTimer = null;
		}
		if (ws) {
			ws.close();
			ws = null;
		}
		status = "disconnected";
		retryCount = 0;
		messageQueue = [];
	}

	function destroy() {
		disconnect();
	}

	return {
		get status() {
			return status;
		},
		get isConnected() {
			return isConnected;
		},
		get retryCount() {
			return retryCount;
		},
		connect,
		disconnect,
		send,
		destroy,
	};
}
