export type SSEStatus = "connecting" | "connected" | "disconnected" | "reconnecting";

export interface CreateSSEClientOptions {
	url: string;
	headers?: Record<string, string>;
	reconnect?: boolean;
	reconnectDelay?: number;
	maxReconnectDelay?: number;
	maxRetries?: number;
	gapDetection?: boolean;
	lastEventIdStorage?: "localStorage" | "sessionStorage" | "none";
	onMessage?: (event: MessageEvent) => void;
	onConnect?: () => void;
	onDisconnect?: () => void;
	onError?: (error: Event) => void;
}

export function createSSEClient(options: CreateSSEClientOptions) {
	const {
		url,
		headers = {},
		reconnect = true,
		reconnectDelay = 1000,
		maxReconnectDelay = 30_000,
		maxRetries = 10,
		gapDetection = false,
		lastEventIdStorage = "localStorage",
		onMessage,
		onConnect,
		onDisconnect,
		onError,
	} = options;

	let status = $state<SSEStatus>("disconnected");
	let lastEventId = $state<string | null>(null);
	let retryCount = $state(0);

	let eventSource: EventSource | null = null;
	let abortController: AbortController | null = null;
	let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

	const isConnected = $derived(status === "connected");

	function getLastEventId(): string | null {
		if (typeof window === "undefined") return null;
		if (lastEventIdStorage === "none") return null;
		const storage = lastEventIdStorage === "sessionStorage" ? sessionStorage : localStorage;
		return storage.getItem("sse-last-event-id");
	}

	function setLastEventId(id: string) {
		if (typeof window === "undefined") return;
		if (lastEventIdStorage === "none") return;
		const storage = lastEventIdStorage === "sessionStorage" ? sessionStorage : localStorage;
		storage.setItem("sse-last-event-id", id);
	}

	function connect() {
		if (typeof window === "undefined") return;
		if (eventSource) disconnect();

		status = "connecting";
		abortController = new AbortController();

		const requestHeaders: Record<string, string> = { ...headers };
		const storedId = getLastEventId();
		if (gapDetection && storedId) {
			requestHeaders["Last-Event-ID"] = storedId;
		}

		const urlObj = new URL(url, window.location.origin);
		if (storedId && gapDetection) {
			urlObj.searchParams.set("lastEventId", storedId);
		}

		eventSource = new EventSource(urlObj.toString());

		eventSource.onopen = () => {
			status = "connected";
			retryCount = 0;
			onConnect?.();
		};

		eventSource.onmessage = (event) => {
			if (event.lastEventId) {
				lastEventId = event.lastEventId;
				setLastEventId(event.lastEventId);
			}
			onMessage?.(event);
		};

		eventSource.onerror = (error) => {
			onError?.(error);
			eventSource?.close();
			eventSource = null;
			status = "disconnected";
			onDisconnect?.();

			if (reconnect && retryCount < maxRetries) {
				scheduleReconnect();
			}
		};
	}

	function scheduleReconnect() {
		if (reconnectTimer) clearTimeout(reconnectTimer);

		const delay = Math.min(reconnectDelay * 2 ** retryCount, maxReconnectDelay);
		retryCount++;

		status = "reconnecting";

		reconnectTimer = setTimeout(() => {
			connect();
		}, delay);
	}

	function disconnect() {
		if (reconnectTimer) {
			clearTimeout(reconnectTimer);
			reconnectTimer = null;
		}
		if (eventSource) {
			eventSource.close();
			eventSource = null;
		}
		if (abortController) {
			abortController.abort();
			abortController = null;
		}
		status = "disconnected";
		retryCount = 0;
	}

	return {
		get status() {
			return status;
		},
		get isConnected() {
			return isConnected;
		},
		get lastEventId() {
			return lastEventId;
		},
		get retryCount() {
			return retryCount;
		},
		connect,
		disconnect,
		destroy: disconnect,
	};
}
